import Head from 'next/head';
import Api from '../api/Market';
import Event from '../api/Event';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import basepath, { navigate } from '../components/basepath';

export default function login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        Api.checkAuth();
    }, [])

    Event.on("update_auth", () => {
        let { customer, email_verified_at } = Api.user;

        if (customer.metadata) {
            if(!email_verified_at)
                navigate.push(`/marketplace/verify`)
            else if(customer.metadata.files.length == 0)
                navigate.replace(`/marketplace/register`)
            else if(!customer.buyer_approved_at)
                navigate.replace(`/marketplace/registerdone`)
            else
                toast.success("Login Successful", {
                    autoClose: 1000,
                    onClose: navigate.replace(`/marketplace`)
                });
        } else {
            navigate.replace(`/marketplace/register`);
        }
    });

    async function onSubmit() {
        try {
            if(!filledIn())
                return

            await Api.login(username, password, remember);
            let { customer, email_verified_at } = Api.user;

            if (customer.metadata) {
                if(!email_verified_at)
                    navigate.push(`/marketplace/verify`)
                else if(customer.metadata.files.length == 0)
                    navigate.replace(`/marketplace/register`)
                else if(!customer.buyer_approved_at)
                    navigate.replace(`/marketplace/registerdone`)
                else
                    toast.success("Login Successful", {
                        autoClose: 1000,
                        onClose: navigate.replace(`/marketplace`)
                    });
            } else {
                navigate.replace(`/marketplace/register`);
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const filledIn = ()=>(username&&password); 

    return <>

        <Head>
            <title>Login | DoctorOnCall</title>
            <meta name="description" content="" />

        </Head>

        <div className="bg-white">
            <div className="row mx-0" style={{ minHeight: '100vh' }}>
                <div className="col-md-4 col-12 p-5 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#131BB3' }}>
                    <div style={{ maxWidth: 310 }}>
                        <img className="main-logo align-self-md-start mb-4" src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/logo/logo-white.png`} alt="" />
                        <div>
                            <h3 className="text-white fw-normal">Welcome to DoctorOnCall B2B Marketplace</h3>
                            <p className="text-white">The healthcare marketplace for your business</p>
                        </div>
                        <img className="img-fluid my-5" src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/auth/1.png`} alt="" />
                        <div className="auth-footer">
                            <p>Copyright © 2021 DoctorOnCall TM All rights reserved.</p>
                            <p className="mb-0"><a href={basepath("/doc/policy")} target="_blank" className="text-white text-decoration-underline">Privacy Policy</a> | <a href={basepath("/doc/terms")} target="_blank" className="text-white text-decoration-underline">Terms of Services</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-12 p-5 d-flex flex-column align-items-center position-relative">
                    <div style={{ maxWidth: 700, paddingTop: '15%' }}>
                        <div className="position-absolute" style={{ top: 10, right: 20 }}>
                            Interested in selling with us? <a href={basepath("/merchant")} className="text-decoration-underline fw-bold">Join us here</a>
                        </div>
                        <h3>Buyer Sign In</h3>
                        <p className="mb-4">Search, buy, and manage all your healthcare supply orders in one platform.</p>
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
                                                <input checked={remember} onChange={()=>setRemember(!remember)} type="checkbox" className="form-check me-2" style={{width: 20, height: 20}} />
                                                <label>Remember Me</label>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            <a href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/auth/forgot`} className="text-end text-primary">Forgot password?</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <span>New here? <a href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/auth/register`} className="text-decoration-underline text-primary fw-bold">Create an account</a></span>
                                    <a className={`btn ${filledIn() ? "btn-primary" : "btn-secondary"} px-md-5 px-4 py-2 ms-3`} style={{borderRadius: 8}} onClick={onSubmit}>Sign In</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}