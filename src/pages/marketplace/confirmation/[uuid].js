import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, } from 'react-bootstrap'
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import Big from 'big.js';
import Api from '../../../api/Market';
import config from 'next/config';
import basepath, { navigate } from '../../../components/basepath';

export default function confirmation({ uuid, payment_type }) {
    const router = useRouter();
    const [transaction, setTransaction] = useState({})
    const [cart, setCart] = useState([])
    const [address, setAddress] = useState({})
    const [paymentType, setPaymentType] = useState(payment_type||"ozopay")

    useEffect(() => {
        getTransaction();
    }, []);

    const getTransaction = async () => {
        try {
            const { transaction } = await Api.getTransaction({ uuid, is_business: false });

            setAddress(transaction.address || {});
            setTransaction(transaction);
            // console.log(`transaction`, transaction)
            const { orders } = transaction;

            const cart = orders.reduce((arr, val) => {
                return [...arr, ...val.items];
            }, []);
            setCart(cart);
        } catch (ex) {
            console.log(ex);
        }
    }

    const pay = async () => {
        try {
            toast.success("Moving to Payment", {
                autoClose: 1000,
                onClose: navigate.push(`/payment/${paymentType}/${uuid}`)
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    return <>

        <Head>
            <title>Market Place | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-md container-fluid mt-5">
            <div className="row">
                <div className="col-md-8 col-12">
                    <div className="right-sidebar">
                        <div className="mobile-shipping">

                            <Card style={{ marginBottom: 10 }}>
                                <Card.Body>
                                    <h2 className="title text-left mb-3 ms-0" style={{ color: 'black' }}>Review Order</h2>
                                    <Row className="mobile-shipping">
                                        <Col xs={12} md={12}>
                                            <div className="shipping-cart">Shipping Details</div>
                                            <div>
                                                <label htmlFor="recipient-name" className="form-label" style={{ fontSize: 14 }}>Transaction Number</label>
                                                <p>{transaction.ref_id}</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="recipient-name" className="form-label" style={{ fontSize: 14 }}>Recipient Name</label>
                                                        <p>{address.name}</p>

                                                        <label htmlFor="postcode" className="form-label" style={{ fontSize: 14 }}>Email</label>
                                                        <p>{address.email}</p>

                                                        <label htmlFor="postcode" className="form-label" style={{ fontSize: 14 }}>Phone</label>
                                                        <p>{address.phone}</p>

                                                        <label htmlFor="postcode" className="form-label" style={{ fontSize: 14 }}>Address</label>
                                                        <p><span>{address.address_1}{address.address_2 ? `, ${address.address_2}` : ''}</span><br />
                                                            <span>{address.city}, {address.postcode}</span><br />
                                                            <span>{address.state}, {address.country}</span><br /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Card style={{ marginBottom: 10 }}>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <div className="shipping-cart" >Shipping Option</div>
                                            <div style={{ marginLeft: '8px', marginBottom: 8 }}>Free Delivery</div>
                                            <div className="card ms-2" style={{ border: '1px solid #41c0f1', borderRadius: '6px', backgroundColor: '#CDEBCC' }}>
                                                <div className="card-body">
                                                    <label> Receive within 3-5 business days (subject to ongoing MCO conditions) </label>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
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
                                            <div>Subtotal <span>RM {Big(transaction.sub_total || 0).toFixed(2)}</span></div>
                                            <div>Shipping <span>RM {Big(transaction.delivery || 0).toFixed(2)}</span></div>
                                            <div>Discounts <span>RM -{Big(transaction.discounts || 0).toFixed(2)}</span></div>
                                            <div>Coupon Code Applied <span> </span></div>
                                        </div>

                                        <div className="cart-total mb-3">
                                            <div>Total<span>RM {Big(transaction.total || 0).toFixed(2)}</span></div>
                                        </div>

                                        { payment_type == "ozopay" && <>
                                                <p className="fw-normal mb-2">Select Payment Type</p>

                                                <select id="" className="form-control mb-4" value={paymentType} onChange={(event) => { setPaymentType(event.target.value) }}>
                                                    <option value="ozopay">Customer Banking</option>
                                                    <option value="ozopayb2b">Corporate Banking</option>
                                                </select>
                                            </>
                                        }

                                        <div className="d-grid gap-2 mb-3">
                                            <a className="btn btn-primary" onClick={pay}>
                                                Proceed to Payment <i className="fa fa-arrow-right" aria-hidden="true" /> </a>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <img style={{ width: "100%", marginTop: '10px' }} src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/payment.png`} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div >

    </>
}

export async function getServerSideProps(context) {
    const { uuid } = context.params;
    const payment_type = process.env.PAYMENT_PROVIDER || "stripe";

    return {
        props: { uuid, payment_type }, // will be passed to the page component as props
    }
}