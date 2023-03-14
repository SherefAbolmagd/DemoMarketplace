import Head from 'next/head';
import Api from '../../../api/Market';

import Big from 'big.js';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BiStore, BiUser } from "react-icons/bi";
import basepath from '../../../components/basepath';
import Swal from 'sweetalert2';
import Pagination from '../../../components/Pagination.js';

export default function index() {
    const [orders, setOrders] = useState({ results: [] });
    const [order_status, setStatus] = useState(-1);
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });
    const [status_count, setCount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [total_count, setTotal] = useState(0);

    useEffect(() => {
        getOrderList({ order_status, _page: 1 });
    }, [order_status, paginate]);

    const logout = () => {
        Api.logout();
        navigate.push(`/`)
    }

    const getOrderList = async ({ order_status, is_business = false }) => {
        try {
            const result = await Api.listMarketOrderByStatus({ order_status, is_business, _page: paginate._page, _pagesize: paginate._pagesize });

            let count = status_count;
            let total = 0;
            for (let i = 0; i < result.status_count.length; i++) {
                total = total + parseInt(result.status_count[i].count);
                count[result.status_count[i].order_status] = parseInt(result.status_count[i].count)
            }

            setCount(count)
            setTotal(total)

            let newArr = result.results.reduce((arr, o) => {
                let ref_id = o.transaction.ref_id
                //ref_id = ref_id.substring(ref_id.length - 12)
                let obj = arr.find(a => a.ref_id == ref_id);
                if (obj)
                    obj.orders.push(o);
                else
                    arr.push({ ref_id, orders: [o] });

                return arr;
            }, []);

            setOrders({ _page: result._page, _pagesize: result._pagesize, total: result.total, results: newArr })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const cancelOrder = async (order) => {
        try {
            const result = await Swal.fire({
                title: 'Cancel Order',
                text: "Are you sure to cancel the Order? You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            })

            if (result.isConfirmed) {
                await Api.cancelOrder(order.id);
                await getOrderList({ order_status, _page: 1 });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const receivedOrder = async (order) => {
        try {
            const result = await Swal.fire({
                title: `Release RM${order.total} to seller`,
                text: `By clicking "Confirm", DoctorOnCall Guarantee will end for this order. You will not be able to return or refund after you confirm. Please ensure you have received the product(s) and are satisfied with their condition.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            })
            if (result.isConfirmed) {
                await Api.receivedOrder(order.id);
                Swal.fire(
                    'Received!',
                    'Product has been received.',
                    'success'
                );
                await getOrderList({ order_status, _page: 1 });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const onPageChange = async ({ _page, _pagesize }) => {
        try {
            setPaginate({ _page, _pagesize })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Order List | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="bg-white">
            <nav>
                <div className="row mx-0" style={{ minHeight: '100vh' }}>

                    <div className="col-md-2 col-12 p-5 d-flex flex-column position-relative" style={{ backgroundColor: '#F1F4FA', marginBottom: -30 }}>
                        <div style={{ maxWidth: 310, paddingTop: '15%' }}>
                            <div className="nav nav-tabs pt-4 d-flex flex-column justify-content-between border-bottom-0 mb-4 overflow-auto text-nowrap" id="nav-tab" role="tablist">

                                <a className="fs-6 mb-5 position-relative"
                                    href={basepath(`/marketplace`)}
                                    type="button" aria-selected="false">
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/home.svg")}
                                        alt="Cart"
                                    />
                                    <span className="fw-bold"> Home </span>
                                </a>

                                <a className="fs-6 mb-5 active position-relative"
                                    href={basepath(`/marketplace/order`)}
                                    type="button" aria-selected="true">
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/medicine.svg")}
                                        alt="Cart"
                                    />
                                    <span className="fw-bold"> Order </span>
                                </a>

                                <a className="fs-6 mb-5 position-relative"
                                    href={basepath(`/marketplace/cart`)}
                                    type="button" aria-selected="false">
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/cart.svg")}
                                        alt="Cart"
                                    />
                                    <span className="fw-bold"> Cart </span>
                                </a>

                                <a className="fs-6 mb-5 position-relative"
                                    href={basepath(`/marketplace/profile`)}
                                    type="button" aria-selected="false" >
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/user.svg")}
                                        alt="Cart"
                                    />
                                    <span className="fw-bold"> Profile</span>
                                </a>

                                <a className="fs-6 mb-5 position-relative"
                                    type="button" aria-selected="false" onClick={logout}>
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/log-out.svg")}
                                        alt="Cart"
                                    />
                                    <span className="fw-bold"> Log Out </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 col-12 p-5 d-flex flex-column position-relative">
                        <div>

                            <div className="tab-content" id="tab-content1">
                                <div className="tab-pane fade  show active" id="company-info-1" role="tabpanel" aria-labelledby="company-info-tab">

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="p-2">
                                                <Tabs>
                                                    <div className="react-tabs__menu is--open">
                                                        <TabList className="d-flex justify-content-between border-bottom-0 mb-3 overflow-auto text-nowrap">

                                                            <Tab className="border-0 pb-2 px-1 text-center cursor" onClick={() => setStatus(-1)}>
                                                                <a>All ({total_count})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-md-1 px-2 text-center cursor" onClick={() => setStatus(0)}>
                                                                <a>Draft ({status_count[0]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-md-1 px-2 text-center cursor" onClick={() => setStatus(1)}>
                                                                <a>To Pay ({status_count[1]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-1 text-center cursor" onClick={() => setStatus(2)}>
                                                                <a>To Pack ({status_count[2]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-1 text-center cursor" onClick={() => setStatus(3)}>
                                                                <a>To Ship ({status_count[3]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-md-1 px-2 text-center cursor" onClick={() => setStatus(6)}>
                                                                <a>To Receive ({status_count[6]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-md-1 px-2 text-center cursor" onClick={() => setStatus(7)}>
                                                                <a>Delivered ({status_count[7]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-md-1 px-2 text-center cursor" onClick={() => setStatus(8)}>
                                                                <a>Completed ({status_count[8]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-md-1 px-2 text-center cursor" onClick={() => setStatus(5)}>
                                                                <a> Cancellation ({status_count[5]})</a>
                                                            </Tab>

                                                            <Tab className="border-0 pb-2 px-md-1 px-2 text-center cursor" onClick={() => setStatus(9)}>
                                                                <a> Return/refund ({status_count[9]})</a>
                                                            </Tab>

                                                        </TabList>
                                                    </div>

                                                    {Array.from(Array(8), (e, i) => (
                                                        <TabPanel key={i}>
                                                            <section id="" role="tabpanel" aria-labelledby="" className="body">
                                                                <div className="row my-3">
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        {orders.results.length > 0 ?
                                                                            orders.results.map((o, i) => {
                                                                                return (
                                                                                    <div key={i} className={`border rounded-3 my-3`}>
                                                                                        <div className="p-2 bg-light rounded-3">
                                                                                            <h5 className="ms-3 title fw-normal text-left text-nowrap overflow-hidden mb-0" style={{ textOverflow: 'ellipsis' }}>Order Number: {o.ref_id.substring(o.ref_id.length - 12)}</h5>
                                                                                        </div>
                                                                                        {o.orders.map((order, idx) => (
                                                                                            <div key={idx}>
                                                                                                <div className="border-bottom d-flex justify-content-between align-items-center py-3">
                                                                                                    <div className="d-flex align-items-center ms-3">
                                                                                                        <BiStore style={{ fontSize: 17 }} />
                                                                                                        <p className="fw-bold mb-0">&nbsp;&nbsp;{order.store.store_name}</p>
                                                                                                    </div>
                                                                                                    <div className="d-flex align-items-center me-3">{{
                                                                                                        0: <span className="badge bg-dark">DRAFT</span>,
                                                                                                        /** When payment is initiated and awaiting payment confirmation */
                                                                                                        1: <span className="badge bg-warning">PENDING</span>,
                                                                                                        /** When payment had been confirmed */
                                                                                                        2: <span className="badge bg-warning">PROCESSED</span>,
                                                                                                        /** After merchant accepted the order, waiting for shipment */
                                                                                                        3: <span className="badge bg-primary">ACCEPTED</span>,
                                                                                                        /** When merchant rejected the order, applicable for full refund */
                                                                                                        4: <span className="badge bg-danger">REJECTED</span>,
                                                                                                        /** Order is cancelled by Customer, applicable for full refund */
                                                                                                        5: <span className="badge bg-danger">CANCELLED</span>,
                                                                                                        /** Order had been shipped */
                                                                                                        6: <span className="badge bg-primary">SHIPPED</span>,
                                                                                                        /** Order had been delivered */
                                                                                                        7: <span className="badge bg-success">DELIVERED</span>,
                                                                                                        /** Order had been completed */
                                                                                                        8: <span className="badge bg-success">COMPLETED</span>,
                                                                                                        /** Order disputed and had been resolved, applicable for partial or full refund based on dispute result */
                                                                                                        9: <span className="badge bg-danger">RETURNED</span>
                                                                                                    }[order.order_status]}</div>
                                                                                                </div>
                                                                                                {order.items.map((item, index) => (
                                                                                                    <div className="row mx-3 my-3 align-items-center" key={index}>
                                                                                                        <div className="col-md-auto">
                                                                                                            <div className="align-items-center me-3" style={{ display: 'flex', justifyContent: 'center', width: 70 }}>
                                                                                                                <img className="img-fluid border" style={{ objectFit: 'contain', width: 70 }} src={Api.getImage(item.image_id)} alt="" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-md-auto">
                                                                                                            <div className="align-items-center">
                                                                                                                <p className="my-2">{item.name}</p>
                                                                                                                <p className="mb-1">{item.quantity} item(s)</p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col">
                                                                                                            <div className="d-flex justify-content-md-end">
                                                                                                                {Big(item.unit_discount).gt(0) ?
                                                                                                                    <p className="text-primary fw-bold"><strike className="text-muted">RM {Big(item.subtotal || 0).toFixed(2)}</strike> RM {Big(item.subtotal || 0).minus(item.discount).toFixed(2)} </p>
                                                                                                                    :
                                                                                                                    <p className="text-primary fw-bold">RM {Big(item.total || 0).toFixed(2)}</p>
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                                <div className="bg-light">
                                                                                                    <div className="row d-flex justify-content-end pt-3">
                                                                                                        <div className="col-md-auto">
                                                                                                            <p className="text-muted ms-3 mb-0">Shipping Fee</p>
                                                                                                            <p className="text-muted ms-3 mb-0">Discount</p>
                                                                                                            <p className="fw-bold ms-3">Order Total</p>
                                                                                                        </div>
                                                                                                        <div className="col-md-auto text-end me-3">
                                                                                                            <p className="text-muted mb-0">RM {parseFloat(order.delivery_amount || 0).toFixed(2)}</p>
                                                                                                            <p className="text-muted mb-0">-RM {parseFloat(order.discount || 0).toFixed(2)}</p>
                                                                                                            <h5 className="text-primary">RM {parseFloat(order.total).toFixed(2)}</h5>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="d-flex justify-content-end align-items-center h-100 py-3 me-3">
                                                                                                        {{
                                                                                                            0: <>
                                                                                                                <a className="btn btn-sm btn-primary mx-1" href={basepath(`/marketplace/checkout/${o.ref_id}`)}>Checkout</a>
                                                                                                                <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/invoice/${o.ref_id}?access_token=${Api.token}`)}>View Invoice</a>
                                                                                                                {/* <a className="btn btn-sm btn-outline-secondary mx-1">Print</a> */}
                                                                                                                <a className="btn btn-sm btn-outline-danger mx-1" onClick={() => cancelOrder(order)}>Cancel</a>
                                                                                                            </>,
                                                                                                            1: <>
                                                                                                                <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/marketplace/confirmation/${o.ref_id}`)}>Pay</a>
                                                                                                                <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/invoice/${o.ref_id}?access_token=${Api.token}`)}>View Invoice</a>
                                                                                                                {/* <a className="btn btn-sm btn-outline-secondary mx-1">Print</a> */}
                                                                                                                <a className="btn btn-sm btn-outline-danger mx-1" onClick={() => cancelOrder(order)}>Cancel</a>
                                                                                                            </>,
                                                                                                            2: <>
                                                                                                                <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/receipt/${o.ref_id}?access_token=${Api.token}`)}>View Receipt</a>
                                                                                                                <button className="btn btn-sm mx-1 btn-outline-danger" onClick={() => cancelOrder(order)} >Cancel</button>
                                                                                                            </>,
                                                                                                            3: <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/receipt/${o.ref_id}?access_token=${Api.token}`)}>View Receipt</a>,
                                                                                                            6: <>
                                                                                                                <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/receipt/${o.ref_id}?access_token=${Api.token}`)}>View Receipt</a>
                                                                                                                <button className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={order.delivery?.tracking_url || "#"}>Track</button>
                                                                                                            </>,
                                                                                                            7: <>
                                                                                                                <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/receipt/${o.ref_id}?access_token=${Api.token}`)}>View Receipt</a>
                                                                                                                <button className="btn btn-sm mx-1 btn-outline-warning" onClick={() => receivedOrder(order)}>Received</button>
                                                                                                            </>,
                                                                                                            5: <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/receipt/${o.ref_id}?access_token=${Api.token}`)}>View Receipt</a>,
                                                                                                            8: <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/receipt/${o.ref_id}?access_token=${Api.token}`)}>View Receipt</a>, //<button className="btn btn-sm mx-1 btn-outline-primary">Report</button>,
                                                                                                            9: <a className="btn btn-sm mx-1 btn-outline-primary" target="_blank" href={basepath(`/receipt/${o.ref_id}?access_token=${Api.token}`)}>View Receipt</a>,
                                                                                                        }[order.order_status]}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <div className="d-flex justify-content-center align-items-center text-center p-3 my-3">
                                                                                <h5 className="mb-0 fw-light">
                                                                                    {{
                                                                                        0: "You have no draft order",
                                                                                        1: "You have no unpaid order",
                                                                                        2: "You have no paid order",
                                                                                        3: "You have no pre-ship order",
                                                                                        6: "You have no shipped order",
                                                                                        7: "You have no delivered order",
                                                                                        5: "You have no cancelled order",
                                                                                        8: "You have no completed request",
                                                                                        9: "You have no return/refund request"
                                                                                    }[order_status]}
                                                                                </h5>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </TabPanel>
                                                    ))}
                                                </Tabs>
                                                <Pagination onPageChanged={onPageChange} _page={parseInt(orders._page)} _pagesize={parseInt(orders._pagesize)} totalItem={orders.total} />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
}

