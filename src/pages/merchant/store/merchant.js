import Head from 'next/head';
import Api from '../../../api/Merchant';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Pagination from '../../../components/Pagination.js';
import config from 'next/config';
import Swal from 'sweetalert2';

import basepath from '../../../components/basepath';

export default function merchant() {
    const [merchants, setMerchants] = useState([]);
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getOrderList();
    }, [paginate]);

    const getOrderList = async () => {
        try {
            const { results } = await Api.listMerchant(paginate);

            setTotal(results.total)
            setMerchants(results.merchants)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const onInvite = async () => {
        try {
            const { value: email } = await Swal.fire({
                title: 'Input email address',
                input: 'email',
                inputLabel: 'Email address',
                inputPlaceholder: 'Enter email address',
                showCancelButton: true
            })

            if (email) {
                if (await Api.inviteMerchant(email)) {
                    Swal.fire(`${email} has been invited`)
                }
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
            <title>Merchant List | DoctorOnCall</title>
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
                                            <span className="mini-click-non">Store Merchant List</span>
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
                                    <h4 className="mb-0">Merchant List</h4>
                                    <div className="col-md-6 col-12 d-flex align-content-center justify-content-md-end">
                                        <a className="btn btn-primary btn-sm" onClick={onInvite}>Invite Merchant</a>
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
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {merchants.length > 0 ?
                                                            merchants.map((merchant, index) => {
                                                                return <tr key={index}>
                                                                    <td>
                                                                        {index + 1}
                                                                    </td>
                                                                    <td>{merchant.user.full_name}</td>
                                                                    <td>{merchant.user.email}</td>
                                                                    <td>{merchant.user.phone}</td>
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
                                                <Pagination onPageChanged={onPageChange} _page={paginate._page} _pagesize={paginate._pagesize} totalItem={total} />
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