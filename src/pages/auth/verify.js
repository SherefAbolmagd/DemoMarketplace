import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Api from '../../api/Base';
import ApiMerchant from '../../api/Market';
import ApiMarket from '../../api/Merchant';
import { useEffect, useState } from 'react';
import basepath, { navigate } from '../../components/basepath';

export default function verify({ token }) {
    const [message, setMessage] = useState("An email verification link has been sent to your inbox, please check our Spam folder")

    useEffect(() => {
        onVerify();
    }, [])

    const onVerify = async () => {
        try {
            if(!token)
                return;

            await Api.verifyEmail({ token })
            await ApiMerchant.logout();
            await ApiMarket.logout();
            toast.success("Email Verified", {
                autoClose: 5000,
                onClose: navigate.replace("/")
            });
        } catch (ex) {
            if(ex.status == 401){
                toast.warning("Your Verification Token Expired. Please Retry Again.");
                setMessage("Your Verification Token Expired. Please Retry Again.");
            }else
                toast.warning(ex.message);
        }
    }

    return <>

        <Head>
            <title>Verification | DoctorOnCall</title>
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
                        <img className="img-fluid mb-3" src={basepath(`/img/auth/2.png`)} alt="" />
                        <h3 className="fw-bold">Verify your email address</h3>
                        <p className="mb-4">{message}</p>
                        <div className="row">
                            {/* <div className="col-12 col-md-6 mb-3 text-end text-md-start">
                                <button className="btn btn-outline-secondary" onClick={()=>navigate.push("/")}>Back</button>
                            </div> */}

                            <div className="col-12 col-md-6">
                                <div className="text-end">
                                    <button className="btn btn-primary" onClick={()=>navigate.push("/")} >Login to Retry</button>
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
    const { token } = context.query;

    return { props: { token: token || null } }
}