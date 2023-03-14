import Head from 'next/head';
import { Container, Row, Col, Card, } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import config from 'next/config';

import { getStates, getCities, getPostcodes } from "malaysia-postcodes";

import _ from 'lodash'
import Big from 'big.js';

import Api from '../../../api/Market';
import basepath, { navigate } from '../../../components/basepath';

const default_state = getStates()[0];
const default_city = getCities(default_state)[0];
const default_postcode = getPostcodes(default_state, default_city)[0];

export default function checkoutPage({ uuid }) {
    const router = useRouter();
    const [transaction, setTransaction] = useState({})
    const [cart, setCart] = useState([])
    const [address, setAddress] = useState({
        country: "Malaysia",
        state: default_state,
        city: default_city,
        postcode: default_postcode
    });

    const [addressNo, setAddressNo] = useState({})
    const [user, setUser] = useState({})

    useEffect(async () => {
        //getTransaction();
        getAddress();
    }, []);

    const getTransaction = async () => {
        try {
            const { transaction } = await Api.getTransaction({ uuid, is_business: false });

            updateTransaction(transaction);
        } catch (ex) {
            toast.warning(ex.message);
        }
    }

    const updateTransaction = (transaction) => {
        try {
            setTransaction(transaction);
            const { orders } = transaction;

            const cart = orders.reduce((arr, val) => {
                return [...arr, ...val.items];
            }, []);
            setCart(cart);
        } catch (ex) {
            toast.warning(ex.message);
        }
    }

    const getAddress = async () => {
        try {
            const user = Api.user;

            let address = await Api.getAddress();

            if ([address.state, address.city, address.postcode].includes(null))
                address = {
                    ...address,
                    country: "Malaysia",
                    state: default_state,
                    city: default_city,
                    postcode: default_postcode
                }

            if ([address.name, address.email, address.phone].includes(null))
                address = {
                    ...address,
                    name: user.full_name,
                    email: user.email,
                    phone: user.phone
                }

            console.log(address);

            const { transaction } = await Api.updateTransactionAddress({ ref_id: uuid });
            updateTransaction(transaction);

            setAddress(address);
            setAddressNo(1);
            setUser(user);

        } catch (ex) {
            toast.warning(ex.message);
        }
    }

    function addressChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...address };
        s[nam] = val;

        if (nam == "state") {
            s.country = "Malaysia";
            s.city = getCities(val)[0];
            s.postcode = getPostcodes(val, s.city)[0];
        } else if (nam == "city") {
            s.postcode = getPostcodes(s.state, s.city)[0];
        }

        setAddress(s)
    }

    const checkout = async () => {
        try {
            if (!address.address_1) {
                throw Error("Your Address is Incomplete.")
            }

            await updateAddress();
            await Api.checkout({ ref_id: uuid/*, address_id: address.id*/ });

            toast.success("Moving to Confirmation", {
                autoClose: 1000,
                onClose: navigate.push(`/marketplace/confirmation/${uuid}`)
            });
        } catch (ex) {
            toast.warning(ex.message);
        }
    }

    const updateAddress = async () => {
        try {
            const res = await Api.updateAddress(address)

            const { transaction } = await Api.updateTransactionAddress({ ref_id: uuid });
            updateTransaction(transaction);

            toast.success("Address Updated", {
                autoClose: 1000,
            });

            setAddress(res.address);
        } catch (ex) {
            toast.warning(ex.message);
        }
    }

    // console.log(`address`, address)
    return <>
        <Head>
            <title>Market Place | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-md container-fluid mt-5">
            <div className="row">
                <div className="col-md-8 col-12">

                    <div className="my-3">
                        <Card>
                            <Card.Body>
                                <h2 className="title text-left mb-3 ms-0" style={{ color: 'black' }}>Checkout</h2>

                                <Row className="">
                                    <div className="shipping-cart">Contact Details</div>
                                    <Col xs={12} md={6}>
                                        <label htmlFor="name" className="form-label">Name </label>
                                        <input type="text" name="name" value={address?.name} onChange={addressChangeHandler} className="form-control" />
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <label htmlFor="phone" className="form-label">Email </label>
                                        <input type="text" name="email" type="email" value={address?.email} onChange={addressChangeHandler} className="form-control" />
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <label htmlFor="phone" className="form-label">Phone No. </label>
                                        <input type="text" name="phone" value={address?.phone} onChange={addressChangeHandler} className="form-control" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="right-sidebar">
                        <Card>
                            <Card.Body>
                                <Row className="mobile-shipping">
                                    <Col xs={12} md={12}>
                                        <div className="shipping-cart mb-3" >Shipping Details</div>
                                        {/*!_.isEmpty(address) &&
                                        {/* {!_.isEmpty(address) &&
                                            <div className="d-flex justify-content-between align-items-center border-bottom border-light mx-3 mb-3" onClick={() => setAddressNo(address.id)}>
                                                <div>
                                                    <p className="mb-2">{address.city}</p>
                                                    <p>AddressAddress AddressAddress AddressAddress AddressAddress AddressAddress AddressAddress AddressAddress AddressAddress </p>
                                                </div>
                                                <i className={`fa fa-check px-3 ${addressNo == 2 ? 'text-primary' : 'text-secondary'}`} style={{ fontSize: 30 }} />
                                            </div>
                                        */}

                                        <div className="d-flex justify-content-between align-items-center mx-3 mb-3" onClick={() => setAddressNo(1)}>
                                            <div>
                                                <p className="mb-0" >Shipping Address</p>
                                            </div>
                                            {/* <i className={`fa fa-check px-3 ${addressNo == 1 ? 'text-primary' : 'text-secondary'}`} style={{ fontSize: 30 }} /> */}
                                        </div>
                                        {/* {addressNo == 1 && */}
                                        <div className="mx-3 mb-3">
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Address 1 <label style={{ color: 'red' }}>*</label></label>
                                                <input required type="text" className="form-control" name="address_1" value={address?.address_1} onChange={addressChangeHandler} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Address 2</label>
                                                <input type="text" className="form-control" name="address_2" value={address?.address_2} onChange={addressChangeHandler} />
                                            </div>

                                            <Row >
                                                <Col xs={12} md={6} className="mb-3">
                                                    <label htmlFor="country" className="form-label">Country / Region <label style={{ color: 'red' }}>*</label></label>
                                                    {/* <input type="text" className="form-control" name="country" value={address?.country} onChange={addressChangeHandler} /> */}
                                                    <select id="" className="form-select" name="country">
                                                        <option value={"Malaysia"}>Malaysia</option>
                                                    </select>
                                                </Col>

                                                <Col xs={12} md={6} className="mb-3">
                                                    <label htmlFor="state" className="form-label">State / Province <label style={{ color: 'red' }}>*</label></label>
                                                    {/* <input type="text" className="form-control" name="state" value={address?.state} onChange={addressChangeHandler} /> */}
                                                    <select className="form-select" name="state" value={address?.state} onChange={addressChangeHandler}>
                                                        {getStates().map((state) => <option value={state}>{state}</option>)}
                                                    </select>
                                                </Col>

                                                <Col xs={12} md={6} className="mb-3">
                                                    <div>
                                                        <label htmlFor="city" className="form-label">City <label style={{ color: 'red' }}>*</label></label>
                                                        {/* <input required type="text" className="form-control" name="city" value={address?.city} onChange={addressChangeHandler} /> */}
                                                        <select disabled={!address?.state} className="form-select" name="city" value={address?.city} onChange={addressChangeHandler}>
                                                            {getCities(address?.state || "").map((city) => <option value={city}>{city}</option>)}
                                                        </select>
                                                    </div>
                                                </Col>

                                                <Col xs={12} md={6} className="mb-3">
                                                    <label htmlFor="postcode" className="form-label">Postcode <label style={{ color: 'red' }}>*</label></label>
                                                    {/* <input required type="number" className="form-control" name="postcode" value={address?.postcode} onChange={addressChangeHandler} /> */}
                                                    <select disabled={!address?.state && !address?.city} className="form-select" name="postcode" value={address?.postcode} onChange={addressChangeHandler}>
                                                        {getPostcodes(address?.state || "", address?.city || "").map((postcode) => <option value={parseInt(postcode)}>{postcode}</option>)}
                                                    </select>
                                                </Col>
                                            </Row>

                                            <a className="btn btn-primary" onClick={updateAddress}>Update Address</a>
                                        </div>
                                        {/* } */}
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>

                        {/* <div className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Row className="">
                                        <div className="shipping-cart" >Billing Details</div>
                                        <Col xs={12} md={12}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="shipping-add" id="shipping-1" value="shipping-add" defaultChecked />
                                                <label className="form-check-label" htmlFor="shipping-add"> Same as shipping address </label>
                                            </div>

                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="custom-ship" id="shipping-2" value="custom-ship" />
                                                <label className="form-check-label" htmlFor="custom-ship"> Use a diffrent billing address </label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div> */}

                        {/* <div className="mb-md-5 mb-3">
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <div className="shipping-cart" >Delivery Option</div>
                                            <Col xs={12} md={6} className="mb-3">
                                                <div className="card shadow-none" style={{ border: '1px solid #41c0f1', borderRadius: '6px' }}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Standard Delivery</h5>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="" id="" value="standard-delivery" defaultChecked />
                                                            <label className="form-check-label" htmlFor="standard-delivery"> Receive within 3-5 business days (subject to ongoing MCO conditions) </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xs={12} md={6}>
                                                <div className="card" style={{ border: '1px solid #41c0f1', borderRadius: '6px' }}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Express Delivery</h5>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="" id="" value="express-delivery" defaultChecked />
                                                            <label className="form-check-label" htmlFor="express-delivery"> Receive in 2-4 Hours for orders before 5pm. Within Klang Valley, Johor & Penang only </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div> */}
                    </div>
                    <div className="my-3">
                        <Card>
                            <Card.Body>
                                <div className="shipping-cart mb-3" >Items</div>
                                {cart.map((o, i) => {
                                    return (
                                        <Row key={i} style={{ marginBottom: 20, marginTop: 10 }} className={`${i != 0 ? 'border-top  pt-3' : ''}`} >
                                            <Col xs={8} md={2} className="align-items-md-center" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img
                                                    className="img-fluid"
                                                    style={{ height: 100, objectFit: 'contain' }}
                                                    src={Api.getImage(o.image_id)}
                                                    alt="cart" />
                                            </Col>
                                            <Col xs={12} md={10}>
                                                <Row>
                                                    <Col md={8}>
                                                        <a href={basepath(`/marketplace/product/${o.uuid}`)}><p className="fw-bold mb-1">{o.product_name}</p></a>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>
                                                        {o.product_name != o.name && <span>Variant: {o.name}</span>}
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
                                                        <div>
                                                            <span className="cart-total-price fw-bold">Qty : {o.quantity}</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="col-md-4 col-12">
                    <Card>
                        <Card.Body>
                            <Row>
                                <div className="col-12 panel-heading">
                                    <div className="cart-subtotal-cont">

                                        <div className="cart-subtotal">
                                            <strong>Payment Details</strong>
                                            <div>Subtotal <span>RM {Big(transaction.sub_total || 0).toFixed(2)}</span></div>
                                            <div>Shipping <span>RM {Big(transaction.delivery || 0).toFixed(2)}</span></div>
                                            <div>Discounts <span>-RM {Big(transaction.discount || 0).toFixed(2)}</span></div>
                                            {/* <div>Coupon Code Applied <span> </span></div> */}
                                        </div>

                                        <div className="cart-total">
                                            <div>TO BE PAID<span>RM {Big(transaction.total || 0).toFixed(2)}</span></div>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <a type="submit" onClick={() => checkout()} className="btn btn-primary ">
                                                Checkout</a>
                                            {/* <a onClick={checkout} className="btn btn-primary" >
                                                <i className="fa fa-arrow-right" aria-hidden="true" />  Review Order </a> */}
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <img style={{ width: "100%", marginTop: '10px' }} src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/payment.png`} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>

    </>
}

export function getServerSideProps(context) {
    const { uuid } = context.params;
    return {
        props: { uuid }, // will be passed to the page component as props
    }
}