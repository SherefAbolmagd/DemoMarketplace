import Head from 'next/head';
import Api from '../../api/Admin';
import Event from '../../api/Event';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import basepath, { navigate } from '../../components/basepath';

export default function login() {
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        Api.checkAuth();
    },[])

    Event.on("update_auth", () => {
        let user = Api.user;
        // admin login
        if (user.admin) {
            toast.success("Login Successful", {
                autoClose: 1000,
                onClose: navigate.replace(`/admin/store`)
            });
        }
    });

    async function onSubmit() {
        try {
            await Api.login(username, password);
            let user = Api.user;
            // admin login
            if (user.admin) {
                toast.success("Login Successful", {
                    autoClose: 1000,
                    onClose: navigate.replace(`/admin/store`)
                });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>

        <Head>
            <title>Login | DoctorOnCall</title>
            <meta name="description" content="" />

        </Head>

        <div className="container-fluid p-md-5 pt-3 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="row">
                <div className="col-12">
                    <div className="text-center m-b-md custom-login">
                        <img className="main-logo mb-3" src={`${process.env.NEXT_PUBLIC_BASEPATH||""}/img/logo/logo.png`} alt="" />
                        <h3>ADMIN LOGIN</h3>
                        <p>Login to your dashboard and manage your products.</p>
                    </div>
                    <div className="hpanel">
                        <div className="panel-body">
                            <form id="loginForm">
                                <div className="row">

                                    <div className="col-12 mb-3">
                                        <label className="mb-2">Phone Number/Email Address</label>
                                        <input className="form-control" placeholder="Enter your Phone Number or Email Address" onChange={(event) => setUsername(event.target.value)}></input>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="mb-2">Password</label>
                                        <input type="password" className="form-control" placeholder="Enter your password" onChange={(event) => setPassword(event.target.value)}></input>
                                        <a href={`${process.env.NEXT_PUBLIC_BASEPATH||""}/auth/forgot`} className="float-end text-muted">Forgot password?</a>
                                    </div>

                                    <div className="text-center mb-3">
                                        <a className="btn btn-primary me-3" onClick={onSubmit}>Login</a>
                                        <a href={`${process.env.NEXT_PUBLIC_BASEPATH||""}/auth/register`} className="btn btn-outline-primary">Register</a>
                                        {/* <a className="btn btn-default">Cancel</a> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mg-t-15">
                <div className="col-md-12 col-md-12 col-sm-12 col-12 text-center">
                    <p>Copyright © 2021 <a href="https://doctoroncall.com.my">DoctorOnCall TM</a> All rights reserved.</p>
                </div>
            </div>
        </div>
    </>
}