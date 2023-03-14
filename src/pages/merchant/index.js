import Head from 'next/head';
import Api from '../../api/Merchant';
import Event from '../../api/Event';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import basepath, { navigate } from '../../components/basepath';

export default function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        Api.checkAuth();
    }, [])

    Event.on("update_auth", () => {
        let { merchant, email_verified_at } = Api.user;
        //merchant with store
        if (merchant.stores.length > 0) {
            if(!email_verified_at)
                toast.success("Login Successful", {
                    autoClose: 1000,
                    onClose: navigate.replace(`/merchant/verify`)
                });
            else if(merchant.stores[0].metadata.files.length == 0)
                toast.success("Login Successful", {
                    autoClose: 1000,
                    onClose: navigate.replace(`/merchant/register`)
                });
            else
                toast.success("Login Successful", {
                    autoClose: 1000,
                    onClose: navigate.replace(`/merchant/home`)
                });
            //merchant no store
        } else {
            navigate.replace(`/merchant/register`)
        }
    });

    async function onSubmit() {
        try {
            if (!filledIn())
                return

            await Api.login(username, password, remember);
            let { merchant, email_verified_at } = Api.user;

            //merchant with store
            if (merchant.stores.length > 0) {
                Api.storeStoreId(merchant.stores[0].id);

                if(!email_verified_at)
                    toast.success("Login Successful", {
                        autoClose: 1000,
                        onClose: navigate.replace(`/merchant/verify`)
                    });
                else if(merchant.stores[0].metadata.files.length == 0)
                    toast.success("Login Successful", {
                        autoClose: 1000,
                        onClose: navigate.replace(`/merchant/register`)
                    });
                else
                    toast.success("Login Successful", {
                        autoClose: 1000,
                        onClose: navigate.replace(`/merchant/home`)
                    });
                //merchant no store
            } else {
                navigate.replace(`/merchant/register`);
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const filledIn = () => (username && password);

    return <>

        <Head>
            <title>Login | DoctorOnCall</title>
            <meta name="description" content="" />

        </Head>

        <div className="bg-white">
            <div className="row mx-0" style={{ minHeight: '100vh' }}>
                <div className="col-md-4 col-12 p-5 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#F69300' }}>
                    <div style={{ maxWidth: 310 }}>
                        <img className="main-logo align-self-md-start mb-4" src={basepath(`/img/logo/logo-white.png`)} alt="" />
                        <div>
                            <h3 className="text-white fw-normal">Welcome to DoctorOnCall B2B Marketplace</h3>
                            <p className="text-white">The healthcare marketplace for your business</p>
                        </div>
                        <img className="img-fluid my-5" src={basepath(`/img/auth/6.png`)} alt="" />
                        <div className="auth-footer">
                            <p>Copyright © 2021 DoctorOnCall TM All rights reserved.</p>
                            <p className="mb-0"><a href={basepath("/doc/policy")} target="_blank" className="text-white text-decoration-underline">Privacy Policy</a> | <a href={basepath("/doc/terms")} target="_blank" className="text-white text-decoration-underline">Terms of Services</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-12 p-5 d-flex flex-column align-items-center position-relative">
                    <div style={{ maxWidth: 700, paddingTop: '15%' }}>
                        <div className="position-absolute ps-3" style={{ top: 10, right: 20 }}>
                            Not here for merchant account? <a href={basepath("/")} className="text-primary text-decoration-underline fw-bold">Back to marketplace sign in</a>
                        </div>
                        <h3>Merchant Account Sign In</h3>
                        <p className="mb-4">Sign in and start selling your products on the healthcare marketplace.</p>
                        <form id="loginForm">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="mb-2">Email/Phone Number</label>
                                    <input className="form-control" placeholder="johndoe@gmail.com/012-3456789" onChange={(event) => setUsername(event.target.value)}></input>
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="mb-2">Password</label>
                                    <input type="password" className="form-control" placeholder="Enter your password" onChange={(event) => setPassword(event.target.value)}></input>
                                </div>
                                <div className="col-12 mb-5">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="d-flex">
                                                <input type="checkbox" checked={remember} onChange={()=>setRemember(!remember)} className="form-check me-2" style={{ width: 20, height: 20 }} />
                                                <label>Remember Me</label>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            <a href={basepath(`/auth/forgot`)} className="text-end text-primary">Forgot password?</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <span>New here? <a href={basepath(`/auth/register`)} className="text-decoration-underline text-primary fw-bold">Create an account</a></span>
                                    <a className={`btn ${filledIn() ? "btn-primary" : "btn-secondary"} px-md-5 px-4 py-2 ms-3`} style={{ borderRadius: 8 }} onClick={onSubmit}>Sign In</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}