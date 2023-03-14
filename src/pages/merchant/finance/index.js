import Head from 'next/head';
import Api from '../../../api/Merchant';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import config from 'next/config';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Pagination from '../../../components/Pagination.js';
import numeral from 'numeral';
import moment from 'moment';

export default function index() {
    const [unpaid_reports, setUnpaidReports] = useState({ results: [] });
    const [reports, setReports] = useState({ results: [] });
    const [incomes, setIncomes] = useState({ weekly: {}, monthly: {}, all: {} });

    useEffect(() => {
        getIncomes();
        getUnpaidSettlementList();
        getPaidSettlementList()
    }, []);


    const getUnpaidSettlementList = async () => {
        try {
            const orders = await Api.listOrderSettlement({ settlement_status: 0 });
            setUnpaidReports(orders)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const getPaidSettlementList = async () => {
        try {
            const orders = await Api.listOrderSettlement({ settlement_status: 1 });
            setReports(orders)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const getIncomes = async () => {
        try {
            const incomes = await Api.getIncomeReport({});
            setIncomes(incomes)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Report List | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

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
                                            <span className="mini-click-non">Operation / Daily Report</span>
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

            <div>
                <div className="containter justify-content-start">
                    <div className="row">

                        {/* Left Panel */}
                        <div className="col-lg-8 col-md-8 col-sm-8 col-12">
                            <div className="card border-2 mb-3">

                                <div className="p-3 fw-bold"> Income Overview</div>

                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <a className="box-item">
                                                <p className="item-desc">Total</p>
                                                <p className="fs-5">RM {numeral(incomes.all?.store_subtotal || 0).format('(0.00 a)')}</p>
                                            </a>
                                        </div>

                                        <div className="col">
                                            <a className="box-item">
                                                <p className="item-desc"> This Week</p>
                                                <p className="fs-5">RM {numeral(incomes.weekly?.store_subtotal || 0).format('(0.00 a)')}</p>
                                            </a>
                                        </div>

                                        <div className="col">
                                            <a className="box-item">
                                                <p className="item-desc"> This Month</p>
                                                <p className="fs-5">RM {numeral(incomes.monthly?.store_subtotal || 0).format('(0.00 a)')}</p>
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
                                            <div className="product-status-wrap">
                                                <table className="w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Order</th>
                                                            <th>Buyer</th>
                                                            <th>Estimate Release Date</th>
                                                            <th>Status</th>
                                                            <th>Payout Amount</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {unpaid_reports.results.length > 0 ?
                                                            unpaid_reports.results.map(({ total, transaction: { ref_id, customer_name }, updated_at }) =>
                                                                <tr>
                                                                    <td>{ref_id.substr(-4)}</td>
                                                                    <td>{customer_name}</td>
                                                                    <td>{moment(updated_at).endOf('week').format("lll")}</td>
                                                                    <td>Unpaid</td>
                                                                    <td>RM {total}</td>
                                                                </tr>
                                                            )
                                                            :
                                                            <tr>
                                                                <td colSpan="5" className="text-center py-3">No Data Available</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </div>
                                    </TabPanel>

                                    <TabPanel>
                                        <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                                            <div className="product-status-wrap">
                                                <table className="w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>Order</th>
                                                            <th>Buyer</th>
                                                            <th>Payout Release On</th>
                                                            <th>Status</th>
                                                            <th>Payout Amount</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {reports.results.length > 0 ?
                                                            reports.results.map(({ total, transaction: { ref_id, customer_name }, updated_at }) =>
                                                                <tr>
                                                                    <td>{ref_id.substr(-4)}</td>
                                                                    <td>{customer_name}</td>
                                                                    <td>{moment(updated_at).format("lll")}</td>
                                                                    <td>Paid</td>
                                                                    <td >RM {total}</td>
                                                                </tr>
                                                            )
                                                            :
                                                            <tr>
                                                                <td colSpan="5" className="text-center py-3">No Data Available</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                                <Pagination />
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="col-sm-4 col-lg-4 col-md-4 col-12">
                            <div className="card border-2 mb-3">
                                <div className="p-3 fw-bold">Income Statement</div>
                                <div className="row">
                                    <div className="col">
                                        <div className="card-tips p-3 fw-bold"><a href="">Date</a></div>

                                        <div className="card-tips">

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="product-status-wrap">
                                <div className="d-flex align-content-center justify-content-between mb-3">
                                    <h4 className="mb-0">Daily Report</h4>
                                    <div className="">
                                        // {/*<a className="btn btn-success btn-sm" href="#">Upload List</a>
                                    </div>
                                </div>
                                <table className="w-100">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Transaction ID</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                            <th>Payment Method</th>
                                            <th>Created at</th>
                                            <th>Settings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.results.length > 0 ?
                                            reports.results.map((report, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>{report.data.transaction_id}</td>
                                                    <td>
                                                        {{
                                                            0: <span className="text-success fw-bold">Published</span>,
                                                            1: <span className="text-primary fw-bold">Drafted</span>,
                                                            2: <span className="text-danger fw-bold">Missing Report Variant</span>
                                                        }[report.report_status]}
                                                    </td>
                                                    <td>{report.data.store_name}</td>
                                                    <td>{report.data.shipping}</td>
                                                    <td>{report.data.created_at}</td>
                                                    <td>
                                                        <button data-toggle="tooltip" title="Approve" className="btn btn-sm btn-success" onClick={() => { }}>
                                                            <i className="fa fa-check-o" aria-hidden="true"></i>
                                                        </button>
                                                        <button data-toggle="tooltip" title="Cancel" className="btn btn-sm btn-danger ms-2" onClick={() => cancelReport(report.id)}>
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            })
                                            :
                                            <>
                                                <tr>
                                                    <td colSpan="7" className="text-center">No Data Available</td>
                                                </tr>
                                            </>}
                                    </tbody>
                                </table>
                                <div className="custom-pagination mt-3">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    </>
}

