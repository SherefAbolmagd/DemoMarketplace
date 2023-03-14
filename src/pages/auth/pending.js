import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Api from '../../api/Base';
import { useEffect, useState } from 'react';
import basepath, { navigate } from '../../components/basepath';

export default function pending({ token }) {
    useEffect(() => {
        // onVerify();
    }, [])

    return <>

        <Head>
            <title>Approval Status | DoctorOnCall</title>
            <meta name="description" content="" />

        </Head>

        <div className="container-fluid p-md-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="row">
                <div className="col-12">
                    <div className="text-center m-b-md custom-login">
                        <img className="main-logo mb-3" src={basepath(`/img/logo/logo.png`)} alt="" />
                        <h3>Approval Status</h3>
                        {/* <p>Login Now</p> */}
                    </div>
                    <div className="hpanel" style={{minWidth: 300}}>
                        <div className="panel-body">
                            <div className="row">
                                <div className="text-center d-flex flex-column justify-content-center align-items-center">
                                    <p className="mb-0">Your account registration is still being reviewed</p>
                                    {/* <a href={basepath("/")} className="btn btn-primary w-md-25">Retry</a> */}
                                </div>
                            </div>
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

export async function getServerSideProps(context) {
    const { token } = context.query;

    return { props: { token: token || null } }
}