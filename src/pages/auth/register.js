import Head from 'next/head';
import Api from '../../api/Base';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import basepath, { navigate } from '../../components/basepath';

export default function register({ callbackURL }) {
    const [fullname, setFullname] = useState(null);
    const [username, setUsername] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password_confirmation, setPasswordconfirmation] = useState(null);

    async function onSubmit() {
        try {
            if (!filledIn())
                return;

            await Api.register(fullname, username, email, phone, password, password_confirmation)
            if(callbackURL){
                toast.success("Register Successful", {
                    autoClose: 1000,
                    onClose: navigate.replace(callbackURL)
                });
            }else {
                toast.success("Register Successful", {
                    autoClose: 1000,
                    onClose: navigate.replace("/auth/verify")
                });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const filledIn = () => (fullname && username && phone && email && password && password_confirmation);

    return <>

        <Head>
            <title>Register | DoctorOnCall</title>
            <meta name="description" content="" />

        </Head>

        <div className="bg-white">
            <div className="row mx-0" style={{ minHeight: '100vh' }}>
                <div className="col-md-4 col-12 p-5 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#131BB3' }}>
                    <div style={{ maxWidth: 310 }}>
                        <img className="main-logo align-self-md-start mb-4" src={basepath(`/img/logo/logo-white.png`)} alt="" />
                        <div>
                            <h3 className="text-white fw-normal">Welcome to DoctorOnCall B2B Marketplace</h3>
                            <p className="text-white">The healthcare marketplace for your business</p>
                        </div>
                        <img className="img-fluid my-5" src={basepath(`/img/auth/1.png`)} alt="" />
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
                        <h3>Create Your Account</h3>
                        <p className="mb-4">Search, buy, and manage all your healthcare supply orders on one platform.</p>
                        <div id="loginForm">
                            <div className="row">
                                <div className="col-md-6 col-12 mb-3">
                                    <label className="mb-2">Username</label>
                                    <input type="text" className="form-control" placeholder="johndoe" onChange={(event) => setUsername(event.target.value)}></input>
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                    <label className="mb-2">Full Name</label>
                                    <input type="text" className="form-control" placeholder="John Doe" onChange={(event) => setFullname(event.target.value)}></input>
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                    <label className="mb-2">Email Address</label>
                                    <input type="text" className="form-control" placeholder="johndoe@gmail.com" onChange={(event) => setEmail(event.target.value)}></input>
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                    <label className="mb-2">Phone Number</label>
                                    <div className="input-group">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">+60</button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">+60</a></li>
                                            {/* <li><a class="dropdown-item" href="#">+2</a></li>
                                            <li><a class="dropdown-item" href="#">+3</a></li> */}
                                        </ul>
                                        <input type="number" className="form-control" onChange={(event) => setPhone(event.target.value)}></input>
                                    </div>
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                    <label className="mb-2">Password</label>
                                    <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)}></input>
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                    <label className="mb-2">Confirm Password</label>
                                    <input type="password" className="form-control" onChange={(event) => setPasswordconfirmation(event.target.value)}></input>
                                </div>

                                <div className="col-12 mb-4">
                                    <p className="text-muted text-xs mb-4">Use 8 or more characters with at least one (1) capital letter, number and symbol in a single password</p>
                                    <p className="text-sm">By continuing above, you agree to our <span className="text-primary fw-bold">Terms & Conditions</span></p>
                                </div>

                                <div className="d-flex justify-content-end align-items-center mb-3">
                                    <span>Already have an account? <a href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/`} className="text-decoration-underline text-primary fw-bold">Sign In</a></span>
                                    <a className={`btn ${filledIn() ? "btn-primary" : "btn-secondary"} px-md-5 px-4 py-2 ms-3`} style={{ borderRadius: 8 }} onClick={onSubmit}>Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export async function getServerSideProps(context) {
    const { callbackURL } = context.query;

    return { props: { callbackURL: callbackURL || null } }
}