import Head from 'next/head';
import { Container, Row, Col, Card, Form, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import config from 'next/config';

import Big from 'big.js';

import _ from 'lodash'
import { useRouter } from 'next/router';
import api from '../../api/Market';
import Event from "../../api/Event";
import Api from '../../api/Market';
import basepath, { navigate } from '../../components/basepath';

export default function cart() {
    const router = useRouter()
    const [cart, setCart] = useState({ results: [] })
    const [quantity, setQuantity] = useState(0);
    const [inventory_id, setInventory] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [coupon_name, setCouponName] = useState("");
    const [coupon, setCoupon] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState("0.00");
    const [breakdown, setBreakdown] = useState({ subtotal: "0.00", discount: "0.00", coupon_discount: "0.00", grandtotal: "0.00" })
    const [MOQ, setMOQ] = useState(-1)

    useEffect(() => {
        getCart({ _page: 1 });
    }, []);

    useEffect(() => {
        validateCoupon();
        calculate(cart);
    }, [coupon, couponDiscount]);

    const getCart = async ({ _page = 1, _pagesize = 20 }) => {
        try {
            const res = await api.getCart({ is_business: true, _page, _pagesize });
            setBreakdown({ subtotal: "0.00", discount: "0.00", coupon_discount: "0.00", grandtotal: "0.00" });
            setCart(res);
            setCoupon(null);
            setCouponName("")
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const addCart = async () => {
        try {
            // MOQ Validation
            if (MOQ != -1 && quantity < MOQ) {
                toast.warning("Quantity must be higher than Minimum Order Quantity", {
                    autoClose: 1000,
                });
                return
            }

            // Negative and Empty Number Validation
            if (quantity < 1) {
                toast.warning("Quantity must not empty or negative value", {
                    autoClose: 1000,
                });
                return
            }

            await api.addCart({ inventory_id, quantity });

            toast.success("Quantity changed", {
                autoClose: 1000,
            });

            Event.emit("update_cart");
            setIsShow(false);
            getCart({ _page: 1 });
            setCoupon({});
        } catch (ex) {
            toast.warning(ex.message)
        }
    };

    const checkItem = (id) => {
        let item = cart.results.find(a => a.id == id);
        item.selected = !item.selected;

        validateCoupon();
        setCart({ ...cart });
        calculate(cart);
    }

    const calculate = (cart) => {
        const items = cart.results.filter(a => a.selected);

        let coupon_discount = Big(0)
        let subtotal = Big(0);
        let discount = Big(0);
        for (const item of items) {
            subtotal = subtotal.add(item.subtotal);
            discount = discount.add(item.discount);
        }

        let grandtotal = subtotal.minus(discount);

        if(coupon){
            coupon_discount = coupon_discount.add(couponDiscount)
            grandtotal = grandtotal.minus(coupon_discount)
        }

        setBreakdown({
            subtotal: subtotal.toFixed(2),
            grandtotal: grandtotal.toFixed(2),
            discount: discount.toFixed(2),
            coupon_discount: coupon_discount.toFixed(2)
        });
    }

    const checkout = async (address_id = 1) => {
        try {
            let formData = new FormData();
            let cartArray = cart.results.filter(o => o.selected).map((o) => o.id);

            if (cartArray.length == 0) {

                toast.warning("No items selected", {
                    autoClose: 1000,
                });
                return;
            }
            formData.append("data", JSON.stringify({ coupon, cart_items: cartArray, is_business: true }))

            const { transaction: { ref_id } } = await api.createTransaction(formData);

            toast.success("Moving to checkout", {
                autoClose: 1000,
                onClose: navigate.push(`/marketplace/checkout/${ref_id}`)
            });

        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const deleteItem = async (id) => {
        try {
            const res = await api.deleteCart(id);

            getCart({});

            toast.success("Item Removed", {
                autoClose: 1000,
            });

        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const hideModal = () => {
        setCart({ ...cart });
        calculate(cart);

        setIsShow(false)
    }

    const getCoupon = async () => {
        try {
            // Make sure at least one item selected
            let cartArray = cart.results.filter(o => o.selected).map((o) => o.id);

            if (cartArray.length == 0) {
                toast.warning("No items selected", {
                    autoClose: 1000,
                });
                return;
            }

            let res = await api.getCoupon({ coupon_name });
            setCoupon(res);
        } catch (ex) {
            toast.warning(ex.message)
        }
    };

    const validateCoupon = async () => {
        try {
            let itemArray = []
            if (!coupon) {
                return
            }

            // Validate coupon type (0 = Platformwide, 1 = Storewide)
            if (coupon.coupon_type == 1) {
                // console.log("Store wide")
                itemArray = cart.results.filter(o => o.selected && o.store_id == coupon.store_id);

                // If there is no item from coupon's store
                if (itemArray.length == 0) {
                    toast.warning("This coupon is not valid for item from different store", {
                        autoClose: 1000,
                    });
                    setCoupon(null);
                }
            } else {
                // console.log("Platform wide")
                itemArray = cart.results.filter(o => o.selected);
            }

            let amount = 0;
            for (let item of itemArray) {
                amount = amount + (parseFloat(item.subtotal) - parseFloat(item.discount))
            }

            // Validate coupon minimum amount
            if (amount < coupon.min_amount) {
                toast.warning("Your items did not reach minimum amount to use this coupon", {
                    autoClose: 1000,
                });
                setCoupon(null);
            }

            const coupon_rate = Big(coupon.discount_rate || 0).div(100).times(amount || 0);
            const coupon_amount = Big(coupon.discount_amount || 0);

            // compare lower rate or amount to assign as coupon discount, max rule
            if (coupon_rate.lt(coupon_amount))
                setCouponDiscount(coupon_rate.toFixed(2))
            else
                setCouponDiscount(coupon_amount.toFixed(2))
        } catch (ex) {
            toast.warning(ex.message)
        }
    };

    const { results, _page, _pagesize } = cart;
    return <>
        <Head>
            <title>Marketplace | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>
        <div className="container-md container-fluid mt-5">
            <div className="row">
                <div className="col-md-8 col-12 mb-md-0 mb-4">
                    <div className="right-sidebar">
                        <h2 className="title text-left mb-0 ms-0" style={{ color: 'black' }}>View Cart</h2>
                        <p className="mb-0 text-muted">Please select item(s) to checkout</p>
                        {results.length > 0 ?
                            results.map((o, i) => {
                                return (
                                    <Row key={i} style={{ marginBottom: 20, marginTop: 10 }} className={`${i != 0 ? 'border-top  pt-3' : ''}`} >
                                        <Col xs={4} md={1} className="d-flex align-items-center">
                                            <input type="checkbox" className="_checkbox" id={o.id} checked={o.selected} onClick={() => checkItem(o.id)} disabled={o.product.stock == 0} />
                                            <label for={o.id} className="_label">
                                                <div id="tick_mark"></div>
                                            </label>
                                        </Col>
                                        <Col xs={8} md={2} className="align-items-md-center" style={{ display: 'flex', justifyContent: 'center' }}>

                                            <img
                                                className="img-fluid"
                                                style={{ height: 100, objectFit: 'contain' }}
                                                src={Api.getImage(o.image_id)}
                                                alt="cart" />
                                        </Col>
                                        <Col xs={12} md={9}>
                                            <Row>
                                                <Col md={8}>
                                                    <a href={basepath(`/marketplace/product/${o.uuid}`)}><h4 className="title text-left">{o.product_name}</h4></a>
                                                </Col>
                                                <Col md={4} className="d-flex justify-content-md-end pe-md-4">
                                                    <a onClick={() => deleteItem(o.id)}>
                                                        <i className="fa fa-trash fs-4" /></a>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={8}>
                                                    <span>Variant: {o.name}</span>

                                                    {o.product.stock == 0 ?
                                                        <p className="text-danger">Current Product Out of Stock</p>
                                                        :
                                                        <>
                                                            {Big(o.unit_discount).gt(0) ?
                                                                <p>{o.quantity} x <strike>RM {Big(o.unit_price || 0).toFixed(2)}</strike> RM {Big(o.unit_price || 0).minus(o.unit_discount).toFixed(2)} </p>
                                                                :
                                                                <p>{o.quantity} x RM {Big(o.unit_price || 0).toFixed(2)}</p>
                                                            }
                                                        </>}
                                                </Col>
                                                <Col md={4}>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={8}>
                                                    <div>
                                                        {Big(o.discount).gt(0) ?
                                                            <span className="cart-total-price fw-bold"><strike>RM {Big(o.subtotal || 0).toFixed(2)}</strike> RM {Big(o.total || 0).toFixed(2)}</span>
                                                            :
                                                            <span className="cart-total-price fw-bold">RM {Big(o.total || 0).toFixed(2)}</span>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md={4} className="d-flex justify-content-md-end pe-md-4">
                                                    <div className="cart-quantity">
                                                        <div className="d-flex">
                                                            <div className="border p-2 px-5 cursor"
                                                                onClick={() => {
                                                                    setQuantity(o.quantity)
                                                                    setInventory(o.inventory_id)
                                                                    setIsShow(true)
                                                                    if (o.product.has_minimum_order_quantity) {
                                                                        setMOQ(parseInt(o.product.minimum_order_quantity))
                                                                    } else {
                                                                        setMOQ(-1)
                                                                    }
                                                                }}
                                                            > {o.quantity} </div>

                                                        </div>
                                                    </div>
                                                    {/* <div className="position-relative cursor">
                                                                <i className={`fa cart-check ${o.selected ? 'fa-check text-success' : 'fa-check text-secondary'}`}></i>
                                                            </div> */}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                            :
                            <div className="d-flex justify-content-center align-items-center text-center p-3">
                                <h5 className="mb-0 fw-light">Your cart is empty. Please add items to cart.</h5>
                            </div>
                        }

                    </div>

                    <Modal show={isShow} onHide={hideModal} aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header onClick={hideModal}>
                            <Modal.Title>Select Quantity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {MOQ != -1 && <div className="d-flex align-items-center">
                                <span className="">
                                    Minimum Order Quantity = {MOQ}
                                </span>
                            </div>}
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <span className="">
                                                Quantity
                                            </span>
                                        </div>
                                        <div className="d-flex">
                                            <button
                                                className="btn btn-white border rounded-start border-end-0 p-2 px-3 fw-bold curser"
                                                style={{
                                                    borderStartEndRadius: 0,
                                                    borderEndEndRadius: 0
                                                }}
                                                disabled={quantity < 2}
                                                onClick={() => {
                                                    if (MOQ != -1) {
                                                        if (quantity > MOQ) {
                                                            setQuantity(
                                                                quantity - 1
                                                            );
                                                        }
                                                    } else {
                                                        if (quantity > 1) {
                                                            setQuantity(
                                                                quantity - 1
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            <input type="number" value={quantity}
                                                className="form-control border text-center no-arrow" style={{ height: 42, width: 86 }}
                                                onChange={(e) => setQuantity(e.target.valueAsNumber)} />

                                            <button
                                                className="bg-white border rounded-end border-start-0 p-2 px-3 fw-bold"
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    setQuantity(quantity + 1);
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end align-items-center my-3">
                                <a
                                    onClick={() =>
                                        addCart()
                                    }
                                    className="btn btn-primary"
                                >
                                    Confirm
                                </a>
                                <button className="btn btn-secondary ms-2" onClick={hideModal}>
                                    Cancel
                                </button>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {/* <div className="custom-pagination">
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </div> */}
                </div>

                <div className="col-md-4 col-12">
                    <div className="left-sidebar">
                        <h2 className="text-dark mb-2">Checkout</h2>

                        <Card className="">
                            <Card.Body>
                                {/* <Row >
                                    <div className="col-12">
                                        <div className="panel-heading">
                                            <span style={{ fontWeight: 'bold' }}>Apply Coupon Code</span>
                                        </div>
                                    </div>
                                </Row>

                                <Row>
                                    <div className="col-12">
                                        <div className="coupon-input hide-xs">
                                            <input type="text" aria-invalid="false" />

                                            <button className="btn mb-3 coupon-apply-btn btn-secondary" >Apply Code</button>
                                        </div>
                                    </div>
                                </Row> */}

                                <Row>
                                    <div className="col-12 panel-heading">
                                        <div className="cart-subtotal-cont">

                                            <div className="cart-subtotal">
                                                <strong>Apply Coupon Code</strong>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" value={coupon_name} onChange={ev => setCouponName(ev.target.value)}></input>
                                                    <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={getCoupon}>Apply Code</button>
                                                </div>
                                                <div>Subtotal <span>RM {breakdown.subtotal}</span></div>

                                                <div>Discounts <span>-RM {breakdown.discount}</span></div>

                                                {coupon && <div>Coupon Discount ({coupon.name})<span>-RM {breakdown.coupon_discount}</span></div>}
                                            </div>

                                            <br /><br /><br /><br />

                                            <div className="cart-total">
                                                <div>Total<span>RM {breakdown.grandtotal}</span></div>
                                            </div>

                                            <div className="d-grid gap-2">
                                                <a onClick={() => checkout()} className="btn btn-primary ">
                                                    Next <i className="fa fa-chevron-right" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* <img style={{ width: "100%", marginTop: '10px' }} src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/payment.png`} /> */}
                </div>
            </div>
        </div>
    </>
}