import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Api from '../../api/Base';
import { useState } from 'react';
import basepath, { navigate } from '../../components/basepath';

export default function forgot() {
    const [username, setUsername] = useState("");

    const onSubmit = async () => {
        try {
            if (!username)
                return;

            await Api.forgotPassword(username)
            toast.success("Email Sent. Check your Inbox", {
                autoClose: 1000,
                onClose: navigate.back()
            });
        } catch (ex) {
            toast.warning(ex.message);
        }
    }

    return <>
        <Head>
            <title>Password Recovery | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="bg-white">
            <div className="row mx-0" style={{ minHeight: '100vh' }}>
                <div className="col-md-4 col-12 p-5 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#4C9BF1' }}>
                    <div style={{ maxWidth: 310 }}>
                        <img className="main-logo align-self-md-start mb-4" src={basepath(`/img/logo/logo-white.png`)} alt="" />
                        <div>
                            <h3 className="text-white fw-normal">Welcome to DoctorOnCall B2B Marketplace</h3>
                            <p className="text-white">The healthcare marketplace for your business</p>
                        </div>
                        <img className="img-fluid my-5" src={basepath(`/img/auth/3.png`)} alt="" />
                        <div className="auth-footer">
                            <p>Copyright © 2021 DoctorOnCall TM All rights reserved.</p>
                            <p className="mb-0"><a href={basepath("/doc/policy")} target="_blank" className="text-white text-decoration-underline">Privacy Policy</a> | <a href={basepath("/doc/terms")} target="_blank" className="text-white text-decoration-underline">Terms of Services</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-12 p-5 d-flex flex-column align-items-center position-relative">
                    <div style={{ maxWidth: 700, paddingTop: '15%' }}>
                        <h3>Password Recovery</h3>
                        <p className="mb-4">Enter your credentials and a link to update your password will be emailed to you.</p>
                        <form id="loginForm">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="mb-2">Email/Phone Number/Username</label>
                                    <input className="form-control" placeholder="johndoe@gmail.com/012-3456789/johndoe" onChange={(ev) => setUsername(ev.target.value)} value={username} ></input>
                                </div>

                                <div className="d-flex justify-content-end align-items-center mb-3">
                                    <a className={`btn ${username ? "btn-primary" : "btn-secondary"} px-md-5 px-4 py-2 ms-3`} style={{ borderRadius: 8 }} onClick={onSubmit}>Send Reset Instruction</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}