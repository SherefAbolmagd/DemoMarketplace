import Head from 'next/head';
import Api from '../../../api/Admin';
import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/Pagination.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import config from 'next/config';
import basepath, { navigate } from '../../../components/basepath';

export default function userList() {
    const router = useRouter()
    const [customers, setCustomers] = useState({ results: [] });
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });

    useEffect(() => {
        listCustomers();
    }, [paginate]);

    const listCustomers = async () => {
        try {
            const result = await Api.listCustomers(paginate);
            setCustomers(result)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const deleteCustomer = async (user_id) => {
        try {
            await Api.deleteUser(user_id);
            listCustomers();
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
            <title>All Customer List | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div>
            <div className="breadcome-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="breadcome-list">
                                <div className="row">
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                        <div className="breadcomb-wp">
                                            {/* <div className="breadcomb-icon">
                                                        <i className="icon jiran-home"></i>
                                                    </div> */}
                                            <div className="text-dark">
                                                <i className="fa fa-user-md icon-wrap"></i>
                                                <span className="mini-click-non"><a href="#" className="">Admin</a> / All Customers List</span>
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
            <div className="product-status mg-b-30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="product-status-wrap">
                                <div className="d-flex align-content-center justify-content-between mb-3">
                                    <h4 className="mb-0">Customer List</h4>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Settings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.results.length > 0 ?
                                            customers.results.map((customer, index) => {
                                                return <tr key={index}>
                                                    <td>{customer.user.full_name}</td>
                                                    <td>{customer.user.username}</td>
                                                    <td>{customer.user.email}</td>
                                                    <td>{customer.user.phone}</td>
                                                    <td>
                                                        <button data-toggle="tooltip" title="Edit" className="btn btn-sm btn-warning" onClick={() => navigate.push(`/admin/user/${customer.user.id}`)}>
                                                            <i className="fa fa-pencil-square-o me-2" aria-hidden="true"></i>
                                                            View
                                                        </button>
                                                        {/* <button data-toggle="tooltip" title="Trash" className="btn btn-sm btn-danger ms-2" onClick={() => deleteCustomer(customer.user.id)}>
                                                            <i className="fa fa-trash-o me-2" aria-hidden="true"></i>
                                                            Delete
                                                        </button> */}
                                                    </td>
                                                </tr>
                                            }) : <tr><td className="text-danger text-center" colSpan="100%">No Customer Available</td></tr>}
                                    </tbody>
                                </table>
                                <Pagination onPageChanged={onPageChange} _page={parseInt(customers._page)} _pagesize={parseInt(customers._pagesize)} totalItem={customers.total} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}