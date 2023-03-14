import Head from 'next/head';
import Api from '../../../api/Merchant';
import { Row, Col, Modal, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import config from 'next/config';

import Shipping from '../../../components/merchant/order/Shipping';
import moment from 'moment';

export default function orders({ order_id }) {
    const [order, setOrder] = useState({ updates: [], transaction: { ref_id: "" }, items: [], delivery: { provider_id: 0 } });
    const [isShow, setIsShow] = useState(false);


    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = async () => {
        try {
            const { order } = await Api.getOrder(order_id);

            setOrder(order)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Order List | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <Shipping {...{ order_id, setIsShow, isShow, setOrder }} />

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card my-3">
                        <div className="card-body">
                            <div className="text-dark">
                                <a href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/merchant/order`}><i className="fa fa-arrow-left" style={{ color: '#2196F3' }}></i></a>
                                <span className="mini-click-non">Operation / <a href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/merchant/order`}>Orders</a> / Order Details</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-1">
                                        <i className="fa fa-arrows icon-wrap" style={{ color: '#2196F3' }}></i>
                                        <span className="mini-click-non" style={{ fontWeight: 'Bold' }}>Order Status</span>
                                    </div>
                                    {order.updates.map((update, i) =>
                                        <div className="mb-2 ms-5 text-muted" key={i}>{`${moment(update.created_at).format('lll')} : ${update.description}`}</div>
                                    )}
                                    {/*<div className="mb-2 ms-5 text-secondary">*Reasons*</div>*/}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="mb-1">
                                        <i className="fa fa-arrows icon-wrap" style={{ color: '#2196F3' }}></i>
                                        <span className="mini-click-non" style={{ fontWeight: 'Bold' }}>Order ID</span>
                                    </div>
                                    <div style={{ paddingLeft: '48px', color: "grey" }}>{order.transaction.ref_id}</div>
                                </div>

                                <div className="col-12 mb-3">
                                    <div className="mb-1">
                                        <i className="fa fa-arrows icon-wrap" style={{ color: '#2196F3' }}></i>
                                        <span className="mini-click-non" style={{ fontWeight: 'Bold' }}>Delivery Address</span>
                                    </div>

                                    <div style={{ paddingLeft: '48px', color: "grey" }}>Customer Name : {order.transaction?.address?.name}</div>

                                    <div style={{ paddingLeft: '48px', color: "grey" }}>Contact Number : {order.transaction?.address?.phone}</div>

                                    <div style={{ paddingLeft: '48px', color: "grey" }}>Address : {`${order.transaction?.address?.address_1}, ${order.transaction?.address?.address_2 || ""}, ${order.transaction?.address?.city}, ${order.transaction?.address?.postcode}, ${order.transaction?.address?.state}, ${order.transaction?.address?.country}`}</div>
                                </div>

                                <div className="col-12 mb-3">
                                    <div className="mb-1">
                                        <i className="fa fa-road icon-wrap" style={{ color: '#2196F3' }}></i>
                                        <span className="mini-click-non" style={{ fontWeight: 'Bold' }}>Logistic Information</span>
                                    </div>
                                    <div style={{ paddingLeft: '48px', color: "grey" }}>{["Self Delivery", "", "NinjaVan"][order?.delivery?.provider_id || 0]}</div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-1">
                                        <i className="fa fa-road icon-wrap" style={{ color: '#2196F3' }}></i>
                                        <span className="mini-click-non" style={{ fontWeight: 'Bold' }}>Payment Information</span>
                                    </div>
                                    <div style={{ paddingLeft: '48px', color: "grey" }}>
                                        <Row>
                                            <Col>

                                                <p className="mb-2">Merchandise Subtotal </p>

                                                <p className="mb-2">Shipping Subtotal </p>

                                                <p className="mb-2">Discount </p>

                                                <p className="mb-2">Order Total </p>
                                            </Col>
                                            <Col>
                                                <p className="mb-2 fw-bold"><span>RM {parseFloat(order.sub_total).toFixed(2)}</span></p>

                                                <p className="mb-2 fw-bold"><span>RM {parseFloat(order.delivery_amount || 0).toFixed(2)}</span></p>

                                                <p className="mb-2 fw-bold"><span>RM -{parseFloat(order.discount || 0).toFixed(2)}</span></p>

                                                <p className="mb-2 fw-bold"><span>RM {parseFloat(order.total).toFixed(2)}</span></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        <i className="fa fa-tasks icon-wrap" style={{ color: '#2196F3' }}></i>
                                        <span className="mini-click-non" style={{ fontWeight: 'bold' }}>Payment Information</span>
                                    </div>

                                    <div className="product-status-wrap">
                                        <table className="w-100">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product</th>
                                                    <th>Variant</th>
                                                    <th>Unit Price</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, index) => <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.subtotal}</td>
                                                </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <Col className="d-flex justify-content-md-end justify-content-evenly">
                                    {order.order_status === 3 && <a className="btn btn-primary btn-sm me-md-2" onClick={() => setIsShow(true)}>Arange Shipment</a>}
                                    {/* <a className="btn btn-danger btn-sm">Cancel Order</a> */}
                                </Col>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export async function getServerSideProps(context) {
    const { order_id } = context.params;
    return { props: { order_id } }
}