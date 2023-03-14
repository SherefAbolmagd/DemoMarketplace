import Head from 'next/head';
import Api from '../../../api/Merchant';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Pagination from '../../../components/Pagination.js';
import config from 'next/config';

import Shipping from '../../../components/merchant/order/Shipping';
import basepath from '../../../components/basepath';

export default function index({ status }) {
    const [orders, setOrders] = useState({ results: [] });
    const [order_status, setStatus] = useState(status);
    const [isShow, setIsShow] = useState(false);
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });
    const [status_count, setCount] = useState([0,0,0,0,0,0,0,0,0,0]);
    const [total_count, setTotal] = useState(0);

    useEffect(() => {
        getOrderList();
    }, [order_status, paginate]);

    const getOrderList = async () => {
        try {
            const result = await Api.listOrderByStatus({ order_status, _page:paginate._page, _pagesize:paginate._pagesize });
            
            let count = status_count;
            let total = 0;
            count[0] = result.total
            for(let i = 0; i < result.status_count.length; i++){
                total = total + parseInt(result.status_count[i].count);
                count[result.status_count[i].order_status] = parseInt(result.status_count[i].count)
            }
            setCount(count)
            setTotal(total)
            setOrders(result)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const updateStatus = async ({ order_id, order_status }) => {
        try {
            await Api.updateOrderStatus({ order_id, order_status });
            await getOrderList({});
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Upload Excel File
    const uploadPacking = async (event) => {
        try {
            const uploadedFile = event.target.files[0];

            let formData = new FormData();
            formData.append("file", uploadedFile)

            if (await Api.uploadPacking(formData)) {
                toast.success("Packing List Uploaded", {
                    autoClose: 1000
                });
                await getOrderList({});
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

        <Shipping {...{ order_id: isShow, setIsShow, isShow, setOrder: () => getOrderList({}) }} />

        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card my-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                    <div className="breadcomb-wp">
                                        {/* <div className="breadcomb-icon">
                                                    <i className="icon jiran-home"></i>
                                                </div> */}
                                        <div className="text-dark">
                                            <i className="fa fa-tasks icon-wrap"></i>
                                            <span className="mini-click-non">Operation / Order List</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 text-end">
                                    <a href="#">
                                        <i className="icon jiran-download fw-bold"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="product-status-wrap">

                                <div className="d-flex align-content-center justify-content-between mb-3">
                                    <h4 className="mb-0">Order List</h4>
                                    {/* <div className="col-md-6 col-12 d-flex align-content-center justify-content-md-end">
                                        <a className="btn btn-success btn-sm" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/api/store/order/shipping/download?access_token=${Api.token}`}>Packing List</a>
                                        &emsp;
                                        <a className="btn btn-primary btn-sm" >Upload Shipping</a>
                                    </div> */}
                                </div>

                                <Tabs selectedIndex={[-1, 1, 2, 3, 6, 7, 8, 5, 9, 4].findIndex((v) => v === order_status)} onSelect={(index) => { setStatus([-1, 1, 2, 3, 6, 7, 8, 5, 9, 4][index]), setPaginate({ _page: 1, _pagesize: 20 }) }} >
                                    <TabList className="d-flex justify-content-between border-bottom-0 mb-3 overflow-auto text-nowrap">
                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a><span className="current-info audible">current step: </span> All Order ({total_count})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a>Unpaid ({status_count[1]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a>To Accept ({status_count[2]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a>To Pack ({status_count[3]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a>Shipping ({status_count[6]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a>Delivered ({status_count[7]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a>Completed ({status_count[8]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a> Cancellation ({status_count[5]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a> Return/refund ({status_count[9]})</a>
                                        </Tab>

                                        <Tab className="border-0 pb-2 px-1 text-center cursor">
                                            <a> Rejected ({status_count[4]})</a>
                                        </Tab>

                                    </TabList>

                                </Tabs>

                                <div className="d-flex align-content-center justify-content-between mb-3">
                                    <h4 className="mb-0"></h4>

                                    <div className="col-md-6 col-12 d-flex align-content-center justify-content-md-end">
                                        {order_status === 3 && <a className="btn btn-success btn-sm" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/api/store/order/shipping/download?access_token=${Api.token}`}>Download List Template</a>}
                                        &emsp;
                                        {order_status === 3 &&
                                            <>
                                                <label htmlFor="uploadPacking">
                                                    <a className="btn btn-primary btn-sm">Upload List</a>
                                                </label>
                                                <input type="file" id="uploadPacking" name="ww" className="d-none" accept=".xlsx" onChange={uploadPacking} multiple={false} />
                                            </>}
                                    </div>
                                </div>

                                <section id="" role="tabpanel" aria-labelledby="" className="body">
                                    <div className="row my-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="product-status-wrap">
                                                <table className="w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>ID</th>
                                                            <th>Customer</th>
                                                            <th>Address</th>
                                                            <th>Products</th>
                                                            <th>Quantity</th>
                                                            <th>Status</th>
                                                            <th>Order Time</th>
                                                            <th>Settings</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orders.results.length > 0 ?
                                                            orders.results.map((order, index) => {
                                                                return <tr key={index}>
                                                                    <td>
                                                                        {index + 1}
                                                                    </td>
                                                                    <td>{(order.transaction?.ref_id).split('-')[0]}</td>
                                                                    <td>{order.transaction?.address?.name}</td>
                                                                    <td>{`${order.transaction?.address?.address_1}, ${order.transaction?.address?.address_2 + "," || ""}`}<br/>{`${order.transaction?.address?.city}, ${order.transaction?.address?.postcode}, ${order.transaction?.address?.state}, ${order.transaction?.address?.country}`}</td>
                                                                    <td>{
                                                                        order.items.map((item, i) => <>
                                                                            {`${i + 1}. ${item.product_name} : ${item.name}`}<br />
                                                                        </>)
                                                                    }</td>
                                                                    <td>{
                                                                        order.items.map((item, i) => <>
                                                                            {`${item.quantity}`}<br />
                                                                        </>)
                                                                    }</td>
                                                                    <td>
                                                                        {{
                                                                            0: "Draft",
                                                                            1: "Unpaid",
                                                                            2: "Paid",
                                                                            3: "To Ship",
                                                                            4: "Rejected",
                                                                            5: "Cancelled",
                                                                            6: "Shipping",
                                                                            7: "Delivered",
                                                                            8: "Completed",
                                                                            9: "Returned",
                                                                            10: "Archived"
                                                                        }[order.order_status]}
                                                                    </td>
                                                                    <td>{moment(order.created_at).format("lll")}</td>
                                                                    <td>
                                                                        {{
                                                                            0: <a
                                                                                href={basepath(`/merchant/order/${order.id}`)}
                                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                                title="View"
                                                                                className="btn btn-sm btn-primary me-2">
                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                            </a>,
                                                                            1: <a
                                                                                href={basepath(`/merchant/order/${order.id}`)}
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="View"
                                                                                className="btn btn-sm btn-primary me-2">
                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                            </a>,
                                                                            2: <>

                                                                                <a
                                                                                    href={basepath(`/merchant/order/${order.id}`)}
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="View"
                                                                                    className="btn btn-sm btn-primary me-2">
                                                                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                                                                </a>
                                                                                <button
                                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                                    title="Accept"
                                                                                    className="btn btn-sm btn-success me-2"
                                                                                    onClick={() => updateStatus({ order_id: order.id, order_status: 3 })}>
                                                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                                                </button>
                                                                                <button
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Reject"
                                                                                    className="btn btn-sm btn-danger"
                                                                                    onClick={() => updateStatus({ order_id: order.id, order_status: 4 })}>
                                                                                    <i className="fa fa-close" aria-hidden="true"></i>
                                                                                </button>
                                                                            </>,
                                                                            3: <>
                                                                                <a
                                                                                    href={basepath(`/merchant/order/${order.id}`)}
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="View"
                                                                                    className="btn btn-sm btn-primary me-2">
                                                                                    <i className="fa fa-eye" aria-hidden="true" />
                                                                                </a>
                                                                                {order.delivery?.provider_id == 0 && <button
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Ship"
                                                                                    className="btn btn-sm btn-success"
                                                                                    onClick={() => setIsShow(order.id)}>
                                                                                    <i className="fa fa-truck" aria-hidden="true"></i>
                                                                                </button>}
                                                                                {order.delivery?.provider_id == 2 && <a
                                                                                    href={basepath(`/api/store/order/waybill/${order.id}?access_token=${Api.token}`)}
                                                                                    target="_blank"
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Download Waybill"
                                                                                    className="btn btn-sm btn-success">
                                                                                    <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                                                                                </a>}
                                                                            </>,
                                                                            4: <a
                                                                                href={basepath(`/merchant/order/${order.id}`)}
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="View"
                                                                                className="btn btn-sm btn-primary me-2">
                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                            </a>,
                                                                            5: <a
                                                                                href={basepath(`/merchant/order/${order.id}`)}
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="View"
                                                                                className="btn btn-sm btn-primary me-2">
                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                            </a>,
                                                                            6: <>
                                                                                <a
                                                                                    href={basepath(`/merchant/order/${order.id}`)}
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="View"
                                                                                    className="btn btn-sm btn-primary me-2">
                                                                                    <i className="fa fa-eye" aria-hidden="true" />
                                                                                </a>
                                                                                {order.delivery?.provider_id == 0 && <button
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Delivered"
                                                                                    className="btn btn-sm btn-success"
                                                                                    onClick={() => updateStatus({ order_id: order.id, order_status: 7 })}>
                                                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                                                </button>}
                                                                                {order.delivery?.provider_id == 2 && <a
                                                                                    href={basepath(`/api/store/order/waybill/${order.id}?access_token=${Api.token}`)}
                                                                                    target="_blank"
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="top"
                                                                                    title="Download Waybill"
                                                                                    className="btn btn-sm btn-success">
                                                                                    <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                                                                                </a>}
                                                                            </>,
                                                                            7: <a
                                                                                href={basepath(`/merchant/order/${order.id}`)}
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="View"
                                                                                className="btn btn-sm btn-primary me-2">
                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                            </a>,
                                                                            8: <a
                                                                                href={basepath(`/merchant/order/${order.id}`)}
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="View"
                                                                                className="btn btn-sm btn-primary me-2">
                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                            </a>,
                                                                        }[order.order_status]}

                                                                        {/*<button data-toggle="tooltip" 
                                                                        data-placement="top" title="Cancel" className="btn btn-sm btn-danger ms-2" onClick={() => cancelOrder(order.id)}>
                                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                        </button>*/}
                                                                    </td>
                                                                </tr>
                                                            })
                                                            :
                                                            <>
                                                                <tr>
                                                                    <td colSpan="7" className="text-center py-3">No Data Available</td>
                                                                </tr>
                                                            </>}
                                                    </tbody>
                                                </table>
                                                <Pagination onPageChanged={onPageChange} _page={parseInt(orders._page)} _pagesize={parseInt(orders._pagesize)} totalItem={orders.total} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export async function getServerSideProps(context) {
    const query = context.query;
    const status = query.status ? parseInt(query.status) : 0;
    return { props: { status } }
}