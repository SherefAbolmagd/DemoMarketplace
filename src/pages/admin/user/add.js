import Head from 'next/head';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import Api from '../../../api/Admin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import basepath, { navigate } from '../../../components/basepath';

export default function addUser() {
    const router = useRouter()
    const [user, setUser] = useState({
        full_name: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [key, setKey] = useState(0);

    function userChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...user };
        s[nam] = val;
        setUser(s)
    }

    async function onSubmit() {
        try {
            if (await Api.addUser(user)) {
                toast.success("User Successfully Added", {
                    autoClose: 1000,
                    onClose: navigate.push("/admin/user")
                });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>My Address | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card my-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="breadcomb-wp">
                                        <div className="text-dark">
                                            <i className="fa fa-sliders icon-wrap"></i>
                                            <span className="mini-click-non">Settings / Store Details</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="multi-uploaded-area mg-tb-15">
                    <div className="product-cart-area mg-b-30">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="product-cart-inner">
                                    <Tabs
                                        id="controlled-tab-example"
                                        selectedIndex={key}
                                        onSelect={(k) => setKey(k)}>
                                        <TabList className="d-flex justify-content-evenly border-bottom-0 mb-3">
                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>User Information</a>
                                            </Tab>
                                        </TabList>

                                        <TabPanel>
                                            <section id="company-info-1" role="tabpanel" aria-labelledby="company-info" className="body">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="product-delivary">
                                                            <div className="mb-3">
                                                                <label htmlFor="user-fullname" className="form-label">Full Name</label>
                                                                <input name="full_name" value={user.full_name} type="text" className="form-control" onChange={userChangeHandler} />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="user-phone" className="form-label">Phone</label>
                                                                <input name="phone" value={user.phone} type="text" className="form-control" onChange={userChangeHandler} />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="user-phone" className="form-label">Password</label>
                                                                <input name="password" value={user.password} type="password" className="form-control" onChange={userChangeHandler} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="product-delivary">
                                                            <div className="mb-3">
                                                                <label htmlFor="username" className="form-label">Username</label>
                                                                <input name="username" value={user.username} type="text" className="form-control" onChange={userChangeHandler} />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="user-email" className="form-label">Email</label>
                                                                <input name="email" value={user.email} type="text" className="form-control" onChange={userChangeHandler} />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="user-phone" className="form-label">Password Confirmation</label>
                                                                <input name="password_confirmation" value={user.password_confirmation} type="password" className="form-control" onChange={userChangeHandler} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="button" className="btn btn-primary w-25" onClick={onSubmit}>Add User</button>
                                                </div>
                                            </section>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}