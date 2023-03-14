import Head from 'next/head';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import Api from '../../../api/Admin';
import { toast } from 'react-toastify';

import basepath, { navigate } from '../../../components/basepath';

import Buyers from "../../../../json/buyer_types.json";

export default function User({ user_id }) {
    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState({});
    const [merchant, setMerchant] = useState({});
    const [buyerStore, setBuyerStore] = useState({});
    const [merchantStore, setMerchantStore] = useState({});
    const [key, setKey] = useState(0);
    const [isB2BCustomer, setIsB2BCustomer] = useState(false);
    const [isMerchant, setIsMerchant] = useState(false);

    const fileTemplate = [
        { fileType: 0, file: "", fileName: "SSM (Form 9)" },
        { fileType: 1, file: "", fileName: "Incorporation Form (Form 24)" },
        { fileType: 2, file: "", fileName: "Incorporation Form (Form 49)" },
        { fileType: 3, file: "", fileName: "Bank Statement Header" },
        { fileType: 4, file: "", fileName: "Current Retail/Wholesale Poison License (Poison A/B)" },
        { fileType: 5, file: "", fileName: "Business License" }
    ]

    const [files, setFiles] = useState(fileTemplate)

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const { user } = await Api.getUser(user_id);
            setUser(user)
            setCustomer(user.customer)
            setMerchant(user.merchant)
            if (user.merchant) {
                setIsMerchant(true)
                setMerchantStore(user.merchant?.store)
            }
            if (user.customer.metadata) {
                setIsB2BCustomer(true)
                setBuyerStore(user.customer.metadata)
                let tempFiles = fileTemplate
                // Fill files data into "files" state
                for (let tempFile of tempFiles) {
                    for (let file of user.customer.metadata.files) {
                        if (file.fileType == tempFile.fileType) {
                            //let data = await Api.getFileData(file.fileId)
                            tempFile.file = file
                        }
                    }
                }
                setFiles(tempFiles)
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    function userChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...user };
        s[nam] = val;
        setUser(s)
    }

    function checkBoxChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.checked;
        const s = { ...user };
        if (val) {
            s[nam] = moment();
        } else {
            s[nam] = null;
        }
        setUser(s)
    }

    async function onSubmit() {
        try {
            if (await Api.updateUser(user_id, user)) {
                toast.success("User Successfully Updated", {
                    autoClose: 1000
                });
                getUser();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const approveStore = async () => {
        try {
            await Api.approveCustomerStore(customer.id);
            await getUser();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const disapproveStore = async () => {
        try {
            await Api.disapproveCustomerStore(customer.id);
            await getUser();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>User Details | DoctorOnCall</title>
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
                                            <span className="mini-click-non">Settings / User Details</span>
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

                                            {isMerchant && <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Merchant Information</a>
                                            </Tab>}

                                            {isB2BCustomer && <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>B2B Buyer Store Information</a>
                                            </Tab>}

                                            {isB2BCustomer && <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Uploaded File</a>
                                            </Tab>}
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
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <input type="checkbox" name="phone_verified_at" defaultChecked={user.phone_verified_at ? true : false} className="form-check" onClick={checkBoxChangeHandler}></input>
                                                                    </div>
                                                                    <div className="col">
                                                                        <label htmlFor="user-phone-verified" className="form-label">Phone Verified</label>
                                                                    </div>
                                                                </div>
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
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <input type="checkbox" name="email_verified_at" defaultChecked={user.email_verified_at ? true : false} className="form-check" onClick={checkBoxChangeHandler}></input>
                                                                    </div>
                                                                    <div className="col">
                                                                        <label htmlFor="user-email-verified" className="form-label">Email Verified</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="button" className="btn btn-primary w-25" onClick={onSubmit}>Update User Information</button>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        {isMerchant && <TabPanel>
                                            <section id="company-info-1" role="tabpanel" aria-labelledby="company-info" className="body">

                                                <div className="product-delivary">
                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="store-name" className="form-label">Store Name</label>
                                                        <input name="store_name" value={merchantStore?.store_name} type="text" className="form-control" />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-contact-number" className="form-label">Merchant Role</label>
                                                        <select value={parseInt(merchant?.merchant_role||0)} className="form-select" name="merchant_role" disabled>
                                                            <option value={0}>Admin</option>
                                                            <option value={1}>Finance</option>
                                                            <option value={2}>Operation</option>
                                                            <option value={3}>Marketing</option>
                                                        </select>
                                                    </div>

                                                    <button data-toggle="tooltip" title="View" className="btn btn-primary mg-t-15" onClick={() => navigate.push(`/admin/store/${merchant?.store.id}`)}>View Store</button>

                                                </div>
                                            </section>
                                        </TabPanel>}

                                        {isB2BCustomer && <TabPanel>
                                            <section id="company-info-1" role="tabpanel" aria-labelledby="company-info" className="body">

                                                <div className="product-delivary">
                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="store-name" className="form-label">Store Name</label>
                                                        <input name="store_name" value={buyerStore.store_name} type="text" className="form-control" />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-name" className="form-label">Company Name</label>
                                                        <input name="company_name" value={buyerStore.company_name} type="text" className="form-control" />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-registration-name" className="form-label">Company Registration Number</label>
                                                        <input name="company_registration" value={buyerStore.company_registration} type="text" className="form-control" />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-email" className="form-label">Company Email</label>
                                                        <input name="support_email" value={buyerStore.support_email} type="email" className="form-control" />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-contact-number" className="form-label">Company Contact No.</label>
                                                        <input name="support_phone" value={buyerStore.support_phone} type="phone" className="form-control" />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-contact-number" className="form-label">Store Type</label>
                                                        <div className="payment-details">
                                                            <select value={parseInt(buyerStore.store_type)} className="form-select" name="store_type">
                                                                {Buyers.map(({ name, index }) => <option value={index}>{name}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                            </section>
                                        </TabPanel>}

                                        {isB2BCustomer && <TabPanel>
                                            <section id="upload-file-1" role="tabpanel" aria-labelledby="upload-file-1" className="body">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="product-status-wrap">
                                                            <div className="d-flex align-content-center justify-content-between mb-3">
                                                                <h4 className="mb-0">Uploaded Files</h4>
                                                            </div>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th className="w-50">File Type</th>
                                                                        <th className="w-25">View</th>
                                                                        <th className="w-25">Download</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {files?.map((file, index) => {
                                                                        if ((buyerStore.store_type == 2 || buyerStore.store_type == 3) && file.fileType == 4) {
                                                                            // Do nothing
                                                                        } else {
                                                                            return <tr key={index}>
                                                                                <td>{file.fileName}</td>
                                                                                <td>
                                                                                    {file.file ?
                                                                                        <a href={basepath(`/api/admin/file/${file.file.id}?access_token=${Api.token}`)} className="btn btn-sm btn-outline-primary mb-md-0 mb-2" target="_blank">View</a>
                                                                                        :
                                                                                        <span>File Not Uploaded</span>
                                                                                    }
                                                                                </td>
                                                                                {/* <td>
                                                                                    {file.file ?
                                                                                        <a href={basepath(`/api/admin/file/${file.file.id}?access_token=${Api.token}`)} className="btn btn-sm btn-outline-primary mb-md-0 mb-2" download={file.file.filename}>Download</a>
                                                                                        :
                                                                                        <span>-</span>
                                                                                    }
                                                                                </td> */}
                                                                            </tr>
                                                                        }
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel>}
                                    </Tabs>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isB2BCustomer && <Card className="border-1">
                    <Card.Body>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-end">
                                    {(customer.buyer_approved_at == null) ?
                                        <button type="button" className="btn btn-warning" onClick={approveStore}>Approve Customer</button>
                                        :
                                        <button type="button" className="btn btn-success" onClick={disapproveStore}>Disapprove Customer</button>}
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>}

            </div>
        </div>
    </>
}

export async function getServerSideProps(context) {
    const { user_id } = context.params;
    return {
        props: { user_id }, // will be passed to the page component as props
    }
}