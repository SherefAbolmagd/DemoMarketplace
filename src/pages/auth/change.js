import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Api from '../../api/Base';
import { useEffect, useState } from 'react';
import basepath, { navigate } from '../../components/basepath';

export default function register() {
    const router = useRouter();
    const [req, setRequest] = useState({ password:null, password_confirmation:null });

    useEffect(()=>{
        const { token } = router.query;
        if(token){
            req["token"] = token;
            setRequest({...req});
        }            
    },[router])
    
    const onSubmit = async ()=>{
        try{
            if(!req.password && !req.password_confirmation)
                return

            await Api.changePassword(req)
            toast.success("Password Reset. Login with your new password.", {
                autoClose: 1000,
                onClose: navigate.replace("/")
            });
        }catch(ex){
            toast.warning(ex.message);
        }
    }

    const onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        req[nam] = val;
        setRequest({...req});
    }

    return <>

        <Head>
            <title>Password Update | DoctorOnCall</title>
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
                        <h3>Reset Password</h3>
                        <p className="mb-4">Enter a new password for your account.</p>
                        <form id="loginForm">
                            <div className="row">
                                
                                <div className="col-12 mb-3">
                                    <label className="mb-2">New Password</label>
                                    <input type="password" className="form-control" onChange={onChangeHandler} name="password"></input>
                                </div>

                                <div className="col-12 mb-2">
                                    <label className="mb-2">Confirm New Password</label>
                                    <input type="password" className="form-control" onChange={onChangeHandler} name="password_confirmation"></input>
                                </div>

                                <div className="col-12 mb-4">
                                    <p className="text-muted text-xs mb-4">Use 8 or more characters with at least one (1) capital letter, number and symbol in a single password</p>
                                </div>

                                <div className="d-flex justify-content-end align-items-center mb-3">
                                    <a className={`btn ${ (req.password && req.password_confirmation) ? "btn-primary" : "btn-secondary"} px-md-5 px-4 py-2 ms-3`} style={{borderRadius: 8}} onClick={onSubmit}>Reset Password</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}