import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import { BiStore } from "react-icons/bi";

import Pagination from '../../../components/Pagination.js';

export default function index() {
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });

    useEffect(() => {
        getReports();
    }, [paginate]);

    // Get List of Report
    const getReports = async () => {
        try {
            // To Do
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Page Change Handler
    const onPageChange = async ({ _page, _pagesize }) => {
        try {
            setPaginate({ _page, _pagesize })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Payments Report</title>
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
                                        <div className="text-dark">
                                            <BiStore />
                                            <span className="mini-click-non">Admin / Payments Report</span>
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
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="product-status-wrap">
                            <div className="row mb-3">
                                <div className="col-md-6 col-12 d-flex align-items-center">
                                    <h4 className="mb-3 mb-md-0 fs-6">Payments Record</h4>
                                </div>

                                <div className="col-md-6 col-12 d-flex align-items-center justify-content-md-end">
                                    <a className="btn btn-primary ms-2 btn-sm">Print</a>
                                    <div className="dropdown">
                                        <a className="btn btn-primary ms-2 btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Download
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    CSV (.csv)
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Excel(.xls)
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    PDF
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <table className="w-100">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Gross Sales</th>
                                        <th>Discount</th>
                                        <th>Returns</th>
                                        <th>Ner Sales</th>
                                        <th>Shipping</th>
                                        <th>Tax</th>
                                        <th>Total Sales</th>
                                    </tr>
                                </thead>

                                {/* To Do 
                                
                                <tbody>
                                    <td>1</td>
                                    <td>RM</td>
                                    <td>RM</td>
                                    <td>RM</td>
                                    <td>RM</td>
                                    <td>RM</td>
                                    <td>RM</td>
                                    <td>RM</td>
                                </tbody>

                                */}
                            </table>

                            <Pagination onPageChanged={onPageChange} /*_page={} _pagesize={} totalItem={}*/ />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
