import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Pagination from '../../components/Pagination.js';
import { Card, Accordion, Button, Modal } from "react-bootstrap";
import { useRouter } from "next/router";

import Api from "../../api/Market";
import React from "react";
import basepath, { navigate } from "../../components/basepath.js";

export default function profile() {
    const router = useRouter();

    const [user, setUser] = useState({});
    const [req, setRequest] = useState({});

    useEffect(() => {
        if (Api.user)
            setUser(Api.user);
    }, [Api.user])

    const logout = () => {
        Api.logout();
        navigate.push(`/`)
    }

    const changePassword = async () => {
        try {
            await Api.changePasswordProfile(req);
            toast.success("Password Changed");
        } catch (ex) {
            toast.error(ex.message);
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const val = event.target.value;

        req[name] = val;

        setRequest({ ...req });
    }

    const { username, email, phone } = user;

    return (
        <>
            <Head>
                <title>Profile | DoctorOnCall</title>
                <meta name="description" content="" />
            </Head>

            <div className="bg-white">
                <nav>
                    <div className="row mx-0" style={{ minHeight: '100vh' }}>

                        <div className="col-md-2 col-12 p-5 d-flex flex-column position-relative" style={{ backgroundColor: '#F1F4FA', marginBottom: -30 }}>
                            <div style={{ maxWidth: 310, paddingTop: '15%' }}>
                                <div className="nav nav-tabs pt-4 d-flex flex-column justify-content-between border-bottom-0 mb-4 overflow-auto text-nowrap" id="nav-tab" role="tablist">

                                    <a className="fs-6 mb-5 position-relative"
                                        href={basepath(`/marketplace`)}
                                        type="button" aria-selected="false">
                                        <img
                                            className="header-icon"
                                            src={basepath("/img/icon/home.svg")}
                                            alt="Cart"
                                        />
                                        <span className="fw-bold"> Home </span>
                                    </a>

                                    <a className="fs-6 mb-5 position-relative"
                                        href={basepath(`/marketplace/order`)}
                                        type="button" aria-selected="false">
                                        <img
                                            className="header-icon"
                                            src={basepath("/img/icon/medicine.svg")}
                                            alt="Cart"
                                        />
                                        <span className="fw-bold"> Order </span>
                                    </a>

                                    <a className="fs-6 mb-5 position-relative"
                                        href={basepath(`/marketplace/cart`)}
                                        type="button" aria-selected="false">
                                        <img
                                            className="header-icon"
                                            src={basepath("/img/icon/cart.svg")}
                                            alt="Cart"
                                        />
                                        <span className="fw-bold"> Cart </span>
                                    </a>

                                    <a className="fs-6 active mb-5 position-relative"
                                        href={basepath(`/marketplace/profile`)}
                                        type="button" aria-selected="true" >
                                        <img
                                            className="header-icon"
                                            src={basepath("/img/icon/user.svg")}
                                            alt="Cart"
                                        />
                                        <span className="fw-bold"> Profile</span>
                                    </a>

                                    <a className="fs-6 mb-5 position-relative"
                                        type="button" aria-selected="false" onClick={logout}>
                                        <img
                                            className="header-icon"
                                            src={basepath("/img/icon/log-out.svg")}
                                            alt="Cart"
                                        />
                                        <span className="fw-bold"> Log Out </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-12 p-5 d-flex flex-column position-relative">
                            <div style={{ maxWidth: 700 }}>

                                <div className="tab-content" id="tab-content1">
                                    <div className="tab-pane fade  show active" id="company-info-1" role="tabpanel" aria-labelledby="company-info-tab">

                                        <h3>Profile Setting</h3>
                                        <div id="loginForm">
                                            <div className="row">

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="store-name" className="form-label mb-2">Name</label>
                                                    <input name="store_name" value={user.full_name} type="text" className="form-control" disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="store-name" className="form-label mb-2">Username</label>
                                                    <input name="store_name" value={user.username} type="text" className="form-control" disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="company-email" className="form-label mb-2">Email Address</label>
                                                    <input name="support_email" value={user.email} type="email" className="form-control" disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="company-name" className="form-label mb-2">Phone Number</label>
                                                    <input name="company_name" value={user.phone} type="text" className="form-control" disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="company-name" className="form-label mb-2">Store Name</label>
                                                    <input name="company_name" value={user?.customer?.metadata?.store_name} type="text" className="form-control" disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="company-name" className="form-label mb-2">Company Name</label>
                                                    <input name="company_name" value={user?.customer?.metadata?.company_name} type="text" className="form-control" disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="company-name" className="form-label mb-2">Company Registration Number</label>
                                                    <input name="company_name" value={user?.customer?.metadata?.company_registration} type="text" className="form-control" disabled />
                                                </div>

                                                {/* <div className="row">
                                                    <div className="col-12 col-md-6 mb-3 text-end text-md-start">
                                                        <button className="btn btn-primary" onClick={logout}>Update Profile</button>
                                                    </div>
                                                </div> */}

                                            </div>
                                        </div>
                                        <h3 className="mt-4">Account Setting</h3>
                                        <div id="loginForm">
                                            <div className="row">

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="store-name" className="form-label mb-2">Current Password</label>
                                                    <input name="password" placeholder="Current Password" type="password" className="form-control" onChange={onChangeHandler} />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="new_password" className="form-label mb-2">New Password</label>
                                                    <input name="new_password" placeholder="New Password" type="password" className="form-control" onChange={onChangeHandler} />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="new_password_confirmation" className="form-label mb-2">Confirm Password</label>
                                                    <input name="new_password_confirmation" placeholder="Confirm Password" type="password" className="form-control" onChange={onChangeHandler} />
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 col-md-6 mb-3 text-end text-md-start">
                                                        <button className="btn btn-primary" onClick={changePassword}>Update Password</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
