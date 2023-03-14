import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Api from '../../api/Market';
import { useEffect, useState } from 'react';
import basepath, { navigate } from '../../components/basepath';

export default function registerdone({}) {
    const logout = async () => {
        await Api.logout();
        navigate.replace(`/`)
    }

    return <>

        <Head>
            <title>Registration Finished | DoctorOnCall</title>
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
                    <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ maxWidth: 700, paddingTop: '15%' }}>
                        <img className="img-fluid mb-5" src={basepath(`/img/auth/5.png`)} alt="" />
                        <h3 className="fw-bold mb-4">Thank you for signing up!</h3>
                        <p className="mb-3">Our team will validate the documents submitted and provide approval or next steps within the next 24 working hours (i.e. Monday to Friday).</p>
                        <p className="mb-3">All communications will be directed to your email address.</p>
                        <p className="mb-4">Stay tuned!</p>
                        <a className="btn btn-primary mt-4" onClick={logout}>Back to sign in page</a>
                    </div>
                </div>
            </div>
        </div>
    </>
}