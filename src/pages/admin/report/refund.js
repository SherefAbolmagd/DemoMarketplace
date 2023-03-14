import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import Api from '../../../api/Admin';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { DateRangePicker } from 'react-date-range';

import moment from 'moment';
import qs from 'querystring';
import Big from 'big.js';

import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'

export default function index() {
    const [rep, setReport] = useState({ report: {}, reports: [] });

    const [state, setState] = useState({
        startDate: moment().subtract(7, 'd').toDate(),
        endDate: moment().toDate(),
        key: 'selection'
    });

    useEffect(() => {
        getReport();
    }, [state]);

    const getReport = async () => {
        try {
            const start = moment(state.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ssZ')
            const end = moment(state.endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ssZ')

            const res = await Api.getRefundReport({ start, end });
            setReport(res);
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const { reports } = rep;
    const data = reports.map((v) => [moment(v.report_date).format("M/D"), v.store_subtotal || 0]);

    const query = qs.stringify({
        start: moment(state.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ssZ'),
        end: moment(state.endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ssZ'),
        access_token: Api.token
    });

    // Upload Excel File
    const uploadRefund = async (event) => {
        try {
            const uploadedFile = event.target.files[0];

            let formData = new FormData();
            formData.append("UploadedFile", uploadedFile)

            if (await Api.uploadRefundReport(formData)) {
                toast.success("Refund Report Uploaded", {
                    autoClose: 1000
                });
                await getReport();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Refund Report</title>
            <meta name="description" content="" />
        </Head>

        <div className="px-5 container-fluid">
            <div className="card mg-b-30 my-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">

                            <div className="row mb-3">
                                <div className="col-md-6 col-12 d-flex align-content-center">
                                    <h4 className="mb-3 mb-md-0 fs-6">Refund Report</h4>
                                </div>

                                <div className="col-md-6 col-12 d-flex align-items-center justify-content-md-end">
                                    <a className="btn btn-primary ms-2 btn-sm"
                                        href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/api/admin/report/refund/download?${query}`} >
                                        Download
                                    </a>
                                    
                                    <label htmlFor="addImageSelect">
                                        <a className="btn btn-success btn-sm ms-2">Upload Refund</a>
                                    </label>
                                    <input type="file" id="addImageSelect" name="ww" className="d-none" accept=".xlsx" onChange={uploadRefund} multiple={false} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 col-12 d-flex align-content-center">
                                    <span className="mb-3 fs-6">Date range</span>
                                    <div className="p-3">
                                        <DateRangePicker
                                            onChange={item => setState(item.selection)}
                                            showSelectionPreview={true}
                                            moveRangeOnFirstSelection={false}
                                            ranges={[state]} maxDate={moment().toDate()}
                                            months={2}
                                            direction="horizontal">
                                        </DateRangePicker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="containter justify-content-start">
                <div className="row">
                    {/*<div className="col-sm-12 col-lg-12 col-md-12 col-12">
                        <div className="card mb-3">
                            <div className="p-3 fw-bold"> Total sales</div>
                            <div>
                                <LineChart data={data} />
                            </div>
                        </div>
                    </div>*/}

                    <div className="col-sm-12 col-lg-12 col-md-12 col-12">
                        <div className="card mb-3">
                            <div className="p-3 fw-bold"> Daily Refund List</div>
                            <table className="mx-3 my-3 w-100">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Company Name</th>
                                        <th>Buyer Name</th>
                                        <th>Gross</th>
                                        <th>Discount</th>
                                        <th>Net</th>
                                        <th>Shipping</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        reports.map(({ transaction, store, sub_total, discount, delivery_amount, platform_comission }, i) =>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{store?.company_name || ""}</td>
                                                <td>{transaction?.customer_name || ""}</td>
                                                <td>RM {Big(sub_total || 0).toFixed(2)}</td>
                                                <td>RM {Big(discount || 0).toFixed(2)}</td>
                                                <td>RM {Big(sub_total || 0).sub(discount || 0).toFixed(2)}</td>
                                                <td>RM {Big(delivery_amount || 0).toFixed(2)}</td>
                                                <td>RM {Big(sub_total || 0).sub(discount || 0).add(delivery_amount || 0).toFixed(2)}</td>
                                            </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}
