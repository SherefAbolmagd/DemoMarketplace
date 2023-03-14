import Head from 'next/head';
import Api from '../../../api/Admin';
import Pagination from '../../../components/Pagination.js';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import config from 'next/config';

export default function platformReport() {
    const router = useRouter()

    return <>

        <Head>
            <title>Platform Report | DoctorOnCall</title>
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
                                            <i className="fa fa-user-md icon-wrap"></i>
                                            <span className="mini-click-non">Admin / Platform Report</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 text-end">
                                    <a href="#">
                                        <i className="icon jiran-download"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}