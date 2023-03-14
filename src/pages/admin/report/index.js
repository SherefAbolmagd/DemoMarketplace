import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Api from '../../../api/Admin';

import { BiStore } from "react-icons/bi";
import { AreaChart } from 'react-chartkick';

import basepath from '../../../components/basepath';

import 'chartkick/chart.js'
import moment from 'moment';
import { toast } from 'react-toastify';
import Big from 'big.js';

export default function index() {
    const [rep, setReport] = useState({ report:{}, reports:[] });

    useEffect(()=>{
        getReport();
    },[])

    const getReport = async () => {
        try {
            const start = moment().subtract(30,'d').startOf('day').format('YYYY-MM-DDTHH:mm:ssZ')
            const end = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ssZ')

            const res = await Api.getReport({ start, end });
            setReport(res);
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const { report, reports } = rep;
    const data = reports.map((v)=>[moment(v.report_date).format("M/D"),v.store_subtotal||0]);

    return <>
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

            <div className="containter justify-content-start">
                <div className="row">
                    <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                        <div className="card mb-3">
                            <div className="p-3 fw-bold"> Reports Summary</div>

                            <div className="container-fluid">
                                <div className="row mb-3">
                                    <div className="col">
                                        <a href="" className="">
                                            <div className="card" style={{ backgroundColor: "#F2984F" }}>
                                                <div className="card-body">
                                                    <div className="card-title text-white">RM {Big(report.store_subtotal||0).toFixed(2)}</div>
                                                    <div className="card-subtitle text-white" style={{ textAlign: "right" }} > Monthly Revenue</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href="" className="">
                                            <div className="card" style={{ backgroundColor: "#74AEDB" }}>
                                                <div className="card-body">
                                                    <div className="card-title text-white">{report.store_total_order||0}</div>
                                                    <div className="card-subtitle text-white" style={{ textAlign: "right" }} >Orders</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href="" className="">
                                            <div className="card" style={{ backgroundColor: "#8E6186" }}>
                                                <div className="card-body">
                                                    <div className="card-title text-white">RM {Big(report.store_subtotal||0).div(7).toFixed(2)}</div>
                                                    <div className="card-subtitle text-white" style={{ textAlign: "right" }} >Sales Per Day</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col">
                                        <a href="" className="">
                                            <div className="card" style={{ backgroundColor: "#6ABB8E" }}>
                                                <div className="card-body">
                                                    <div className="card-title text-white">{report.store_total_product||0}</div>
                                                    <div className="card-subtitle text-white" style={{ textAlign: "right" }} >Total Product</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-lg-4 col-md-4 col-4">
                        <div className="card mb-3">
                            <div className="p-3 fw-bold"> Sales</div>

                            <div className="card-tips"> Make business decisions by comparing sales across products, staff, channels, and more.</div>

                            <a className="sales-card" href={basepath("/merchant/report/reports")}> Daily Sales</a>

                            <a className="sales-card" href=""> Weekly Sales</a>

                            <a className="sales-card" href=""> Montly Sales</a>

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

                </div>
            </div>
        </div>
    </>
}
