import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Api from '../../api/Merchant';
import { AreaChart } from 'react-chartkick'
import 'chartkick/chart.js'
import moment from 'moment';
import { toast } from 'react-toastify';
import Big from 'big.js';
import basepath from '../../components/basepath';

export default function index() {
    const [rep, setReport] = useState({ report: {}, reports: [] });
    const [count, setCount] = useState([]);

    useEffect(() => {
        getReport();
        getCount();
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

    const getCount = async () => {
        try {
            const { report } = await Api.getOrderCount();
            setCount(report);
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const { reports } = rep;
    const data = reports.map((v) => [moment(v.report_date).format("M/D"), v.store_subtotal || 0]);
    const counts = count.reduce((acc, v) => { acc[v.status] = parseInt(v.count); acc["total"] += parseInt(v.count); return acc }, { "total": 0 });

    return <>
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-md px-5 container-fluid">

            <div className="containter justify-content-start">
                <div className="row">

                    {/* Left Panel */}
                    <div className="col-sm-8 col-lg-8 col-md-8 col-8">
                        <div className="card mb-3">

                            <div className="p-3 fw-bold"> To Do List</div>

                            <div className="card-tips"> Things you need to deal with</div>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=-1")} className="box-item">
                                            <p>{counts["total"] || 0}</p>
                                            <p className="item-desc"> All Order</p>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=2")} className="box-item">
                                            <p>{counts[2] || 0}</p>
                                            <p className="item-desc"> To-Accept Order</p>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=3")} className="box-item">
                                            <p>{counts[3] || 0}</p>
                                            <p className="item-desc"> To-Process Shipment</p>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=6")} className="box-item">
                                            <p>{counts[6] || 0}</p>
                                            <p className="item-desc"> Processed Shipment</p>
                                        </a>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=7")} className="box-item">
                                            <p>{counts[7] || 0}</p>
                                            <p className="item-desc"> Completed</p>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=5")} className="box-item">
                                            <p>{counts[5] || 0}</p>
                                            <p className="item-desc"> Cancellation</p>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=8")} className="box-item">
                                            <p>{counts[8] || 0}</p>
                                            <p className="item-desc"> Pending Return/Refund</p>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href={basepath("/merchant/order?status=4")} className="box-item">
                                            <p>{counts[4] || 0}</p>
                                            <p className="item-desc"> Rejected</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="p-3 fw-bold"> Business Insight</div>

                            <div className="card-tips"> An overview of the shop data for the paid order dimension</div>

                            <div>
                                <AreaChart data={data} />
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="p-3 fw-bold"> Performance</div>
                            <div className="card-tips"> Performance relfects the quality of various metrics of the store</div>

                            <Tabs className="card-tips p-3">
                                <TabList className="d-flex justify-content-between border-bottom-0 mb-3 overflow-auto text-nowrap">
                                    <Tab className="border-0 pb-2 px-1 text-center cursor" >
                                        <a><span className="current-info audible">current step: </span> Listing Violation </a>
                                    </Tab>

                                    <Tab className="border-0 pb-2 px-1 text-center cursor">
                                        <a>Fulfilment</a>
                                    </Tab>

                                    <Tab className="border-0 pb-2 px-1 text-center cursor" >
                                        <a>Customer Service</a>
                                    </Tab>

                                    <Tab className="border-0 pb-2 px-1 text-center cursor" >
                                        <a>Customer Satisfaction</a>
                                    </Tab>
                                </TabList>
                                
                                <TabPanel></TabPanel>

                                <TabPanel></TabPanel>

                                <TabPanel></TabPanel>

                                <TabPanel></TabPanel>
                            </Tabs>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="col-sm-4 col-lg-4 col-md-4 col-4">
                        <div className="card mb-3">
                            <div className="p-3 fw-bold">Announcement</div>
                            {/* <div className="row">
                                <div className="col">
                                    <div className="card-tips p-3 fw-bold"><a href="">Shop Decoration Tools</a></div>

                                    <div className="card-tips">
                                        <div>Learn on how to make your shop front more attractive and design more effectively by using shop decoration tools 😎👉</div>

                                        <div className="mtime">21 May 2021</div>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}