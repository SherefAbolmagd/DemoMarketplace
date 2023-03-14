import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Api from '../../../api/Merchant';
import { BiStore } from "react-icons/bi";
import { AreaChart } from 'react-chartkick'

import 'chartkick/chart.js'
import moment from 'moment';
import { toast } from 'react-toastify';
import Big from 'big.js';
import basepath from '../../../components/basepath';

export default function index() {
    const [rep, setReport] = useState({ report: {}, reports: [] });

    useEffect(() => {
        getReport();
    }, [])

    const getReport = async () => {
        try {
            const start = moment().subtract(30, 'd').startOf('day').format('YYYY-MM-DDTHH:mm:ssZ')
            const end = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ssZ')

            const res = await Api.getReport({ start, end });
            setReport(res);
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const { report, reports } = rep;
    const data = reports.map((v) => [moment(v.report_date).format("M/D"), v.store_subtotal || 0]);

    return <>
        {/* {console.log(images)} */}
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-md px-5 container-fluid">
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
                                            <BiStore />
                                            <span className="mini-click-non">Reports</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs className="card p-3 my-3">
                <TabList className="d-flex justify-content-between border-bottom-0 mb-3 overflow-auto text-nowrap">
                    <Tab className="pb-2 px-1 mx-2 text-center cursor" >
                        <a className="tab-item"><span className="current-info audible">current step: </span> Dashboard </a>
                    </Tab>

                    <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor">
                        <a className="tab-item">Product</a>
                    </Tab>

                    {/* <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor" >
                        <a className="tab-item">Sales</a>
                    </Tab>

                    <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor" >
                        <a className="tab-item">Marketing</a>
                    </Tab> */}

                    <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor" >
                        <a className="tab-item">Finances</a>
                    </Tab>
                </TabList>

                {/* DASHBOARD TAB */}
                <TabPanel>
                    <section id="dashboard-info-1" role="tabpanel" aria-labelledby="dashboard-info" className="body">
                        <div className="row">
                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-3 col-lg-3 col-md-3 col-12 my-3">
                                                <a href="" className="">
                                                    <div className="card" style={{ backgroundColor: "#F2984F" }}>
                                                        <div className="card-body">
                                                            <div className="card-title text-white">{report.store_total_order || 0} Orders</div>
                                                            <div className="card-subtitle text-white" style={{ textAlign: "right" }} > Number Of Sales</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-sm-3 col-lg-3 col-md-3 col-12 my-3">
                                                <a href="" className="">
                                                    <div className="card" style={{ backgroundColor: "#74AEDB" }}>
                                                        <div className="card-body">
                                                            <div className="card-title text-white">RM {report.store_subtotal || 0}</div>
                                                            <div className="card-subtitle text-white" style={{ textAlign: "right" }} > Revenue</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-sm-3 col-lg-3 col-md-3 col-12 my-3">
                                                <a href="" className="">
                                                    <div className="card" style={{ backgroundColor: "#8E6186" }}>
                                                        <div className="card-body">
                                                            <div className="card-title text-white">RM {Big(report.store_subtotal||0).sub(report.platform_comission||0).sub(report.delivery_total||0).toFixed(2)}</div>
                                                            <div className="card-subtitle text-white" style={{ textAlign: "right" }} > Profit</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-sm-3 col-lg-3 col-md-3 col-12 my-3">
                                                <a href="" className="">
                                                    <div className="card" style={{ backgroundColor: "#6ABB8E" }}>
                                                        <div className="card-body">
                                                            <div className="card-title text-white">RM {Big(report.platform_comission||0).add(report.delivery_total||0).toFixed(2)}</div>
                                                            <div className="card-subtitle text-white" style={{ textAlign: "right" }} > Cost</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-8 col-lg-8 col-md-8 col-8">
                                <div className="card mb-3">
                                    <div className="p-3 fw-bold"> Trend Sales</div>

                                    <div className="card-tips"> Update every hours</div>

                                    <div>
                                        <AreaChart data={data} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4 col-lg-4 col-md-4 col-4">
                                <div className="card mb-3">
                                    <div className="p-3 fw-bold"> Sales</div>

                                    <div className="card-tips"> Make business decisions by comparing sales across products, staff, channels, and more.</div>

                                   <a className="sales-card" href={basepath("/merchant/report/daily")}> Daily Sales</a>

                                     {/*<a className="sales-card" href="/merchant/report/weekly"> Weekly Sales</a>

                                    <a className="sales-card" href="/merchant/report/monthly"> Montly Sales</a>*/}

                                </div>
                            </div>

                            {/* <div className="col-sm-8 col-lg-8 col-md-8 col-12">
                                <div className="card border-2 mb-3">
                                    <div className="p-3 fw-bold"> Product Rankings</div>

                                    <Tabs className="p-3 my-3">
                                        <TabList className="d-flex flex-row border-bottom-0 mb-3 overflow-auto text-nowrap">
                                            <Tab className="pb-2 px-1 mx-2 text-center cursor" >
                                                <a><span className="current-info audible">current step: </span> By Sales </a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor">
                                                <a>By Unit</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor" >
                                                <a>By Product Page Views</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor" >
                                                <a>By Conversion</a>
                                            </Tab>
                                        </TabList>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Sales</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Unit</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Product Page Views</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Conversion</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            </div> */}
                        </div>
                    </section>
                </TabPanel>

                {/* PRODUCT TAB */}
                {/* <TabPanel>
                    <section id="product-info-1" role="tabpanel" aria-labelledby="product-info" className="body">
                        <div className="row">
                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <div className="container-fluid">
                                        <div className="row">

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                <div className="card border-2 mb-3">
                                    <div className="p-3 fw-bold"> Trend Chart Sales</div>
                                    <div>
                                        <LineChart />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                <div className="card border-2 mb-3">
                                    <div className="p-3 fw-bold"> Product Rankings</div>

                                    <Tabs className="p-3 my-3">
                                        <TabList className="d-flex flex-row border-bottom-0 mb-3 overflow-auto text-nowrap">
                                            <Tab className="pb-2 px-1 mx-2 text-center cursor" >
                                                <a><span className="current-info audible">current step: </span> By Sales (Paid Order) </a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor">
                                                <a>By Unit (Placed Order)</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor" >
                                                <a>By Unit (Add To Cart)</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor" >
                                                <a>By Conversion (Placed Order)</a>
                                            </Tab>
                                        </TabList>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Sales</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Unit</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Product Place Orders</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                <table className="mx-3 my-3 w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Product Information</th>
                                                            <th className="mx-3 d-flex align-items-center justify-content-md-end ">By Conversion</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </section>
                </TabPanel> */}

                {/* SALES TAB */}
                {/* <TabPanel>
                    A
                </TabPanel> */}

                {/* MARKETING TAB */}
                {/* <TabPanel>
                    B
                </TabPanel> */}

                {/* FINANCES TAB */}
                {/* <TabPanel>
                    <div>
                        <div className="containter justify-content-start">
                            <div className="row">

                                Left Panel
                                <div className="col-lg-8 col-md-8 col-sm-8 col-12">
                                    <div className="card border-2 mb-3">

                                        <div className="p-3 fw-bold"> Income Overview</div>

                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col">
                                                    <a className="box-item">
                                                        <p className="item-desc">To Release</p>
                                                        <p className="item-desc">Total</p>
                                                        <p className="fs-5">RM </p>
                                                    </a>
                                                </div>

                                                <div className="col">
                                                    <a className="box-item">
                                                        <p className="item-desc"> Released</p>
                                                        <p className="item-desc"> This Week</p>
                                                        <p className="fs-5">RM </p>
                                                    </a>
                                                </div>

                                                <div className="col">
                                                    <a className="box-item">
                                                        <p className="p-3 item-desc"> This Month</p>
                                                        <p className="fs-5">RM </p>
                                                    </a>
                                                </div>

                                                <div className="col">
                                                    <a className="box-item">
                                                        <p className="p-3 item-desc"> Total</p>
                                                        <p className="fs-5">RM</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card border-2 mb-3">
                                        <div className="p-3 fw-bold"> Income Details</div>

                                        <Tabs className="p-3 my-3">
                                            <TabList className="d-flex flex-row border-bottom-0 mb-3 overflow-auto text-nowrap">
                                                <Tab className="pb-2 px-1 mx-2 text-center cursor" >
                                                    <a><span className="current-info audible ">current step: </span> To Release </a>
                                                </Tab>

                                                <Tab className="border-0 pb-2 px-1 mx-2 text-center cursor">
                                                    <a>Release</a>
                                                </Tab>
                                            </TabList>

                                            <TabPanel>
                                                <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                    <table className="mx-3 my-3 w-100">
                                                        <thead>
                                                            <tr>
                                                                <th>Order</th>
                                                                <th>Buyer</th>
                                                                <th>Estimate Release Date</th>
                                                                <th>Status</th>
                                                                <th className="mx-3 d-flex align-items-center justify-content-md-end ">Payout Amount</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tbody>
                                                    </table>
                                                    <Pagination />
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                                    <table className="mx-3 my-3 w-100">
                                                        <thead>
                                                            <tr>
                                                                <th>Order</th>
                                                                <th>Buyer</th>
                                                                <th>Payout Release On</th>
                                                                <th>Status</th>
                                                                <th className="mx-3 d-flex align-items-center justify-content-md-end ">Payout Amount</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tbody>
                                                    </table>
                                                    <Pagination />
                                                </div>
                                            </TabPanel>
                                        </Tabs>
                                    </div>
                                </div>

                                Right Panel
                                <div className="col-sm-4 col-lg-4 col-md-4 col-12">
                                    <div className="card border-2 mb-3">
                                        <div className="p-3 fw-bold">Income Statement</div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-tips p-3 fw-bold"><a href="">Shop Decoration Tools</a></div>

                                                <div className="card-tips">

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel> */}
            </Tabs>
        </div>

    </>
}
