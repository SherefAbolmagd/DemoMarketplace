import Head from 'next/head';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../../api/Market';
import { toast } from 'react-toastify';
import Buyers from '../../../json/buyer_types.json';

import basepath, { navigate } from '../../components/basepath';

export default function Register() {
    // hadnlign boostrap tab
    const tab_1 = useRef();
    const tab_2 = useRef();
    const tab_3 = useRef();

    const [storeDetails, setStoreDetails] = useState({
        store_name: "",
        company_name: "",
        company_registration: "",
        support_email: "",
        support_phone: "",
        store_type: 0,
        bank_account_name: "",
        bank_account_no: "",
        bank_id: -1,
        support_phone: "",
        merchant_role: 0,
        address_1: "",
        address_2: "",
        country: "Malaysia",
        state: "",
        city: "",
        postcode: "",
        latitude: "",
        longitude: "",
    });
    const [files, setFiles] = useState([
        { filetype: 0, file: "", filename: "SSM (Form 9)" },
        { filetype: 1, file: "", filename: "Incorporation Form (Form 24)" },
        { filetype: 2, file: "", filename: "Incorporation Form (Form 49)" },
        { filetype: 3, file: "", filename: "Bank Statement Header" },
        { filetype: 4, file: "", filename: "Current Retail/Wholesale Poison License (Poison A/B)" },
        { filetype: 5, file: "", filename: "Business License" }
    ])

    useEffect(() => {
        getStore();
    }, []);

    const getStore = async () => {
        try {
            await Api.getAuth();
            const { store } = await Api.getMetadata();
            if (store)
                setStoreDetails({ ...store });
        } catch (ex) {
            //toast.warning(ex.message)
        }
    }

    const [key, setKey] = useState(0);

    function storeChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...storeDetails };
        s[nam] = val;
        setStoreDetails(s)
    }

    async function onSubmit({ save = false }) {
        try {
            if (!storeDetails.store_name) {
                toast.warning("Please enter Store Name", {
                    autoClose: 1000,
                });
                return
            }

            if (!storeDetails.company_name) {
                toast.warning("Please enter Company Name", {
                    autoClose: 1000,
                });
                return
            }

            if (!storeDetails.company_registration) {
                toast.warning("Please enter Company Registration Number", {
                    autoClose: 1000,
                });
                return
            }

            if (!storeDetails.support_email) {
                toast.warning("Please enter Company Email", {
                    autoClose: 1000,
                });
                return
            }

            if (!storeDetails.support_phone) {
                toast.warning("Please enter Company Phone Number", {
                    autoClose: 1000,
                });
                return
            }

            if (!storeDetails.company_name) {
                toast.warning("Please enter Company Name", {
                    autoClose: 1000,
                });
                return
            }

            if (!files[0].file && !save) {
                toast.warning(`${files[0].filename} is required`, {
                    autoClose: 1000,
                });
                return
            }

            if (!files[1].file && !save) {
                toast.warning(`${files[1].filename} is required`, {
                    autoClose: 1000,
                });
                return
            }

            if (!files[2].file && !save) {
                toast.warning(`${files[2].filename} is required`, {
                    autoClose: 1000,
                });
                return
            }

            if (!files[3].file && !save) {
                toast.warning(`${files[3].filename} is required`, {
                    autoClose: 1000,
                });
                return
            }

            if (!files[4].file && !save) {
                if ((storeDetails.store_type == 2 || storeDetails.store_type == 3)) {
                    // Do Nothing
                } else {
                    toast.warning(`${files[4].filename} is required`, {
                        autoClose: 1000,
                    });
                    return
                }
            }

            if (!files[5].file && !save) {
                toast.warning(`${files[5].filename} is required`, {
                    autoClose: 1000,
                });
                return
            }

            let formData = new FormData();
            formData.append("storeDetails", JSON.stringify({ ...storeDetails, save }));

            files.forEach(file => {
                formData.append(`${file.filetype}`, file.file)
            })

            const { customer } = await Api.onboardMetadata(formData);
            if ( !save && customer) {
                await Api.logout();
                navigate.push("/marketplace/registerdone")
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const uploadFile = async (event) => {
        // Get Uploaded File
        const uploadedFile = event.target.files[0];

        // File Validation
        var t = uploadedFile.type.split('/').pop().toLowerCase();
        if (!['jpeg','jpg','png','pdf'].includes(t)) {
            toast.warning('Please select a valid file type');
            return;
        }
        if (uploadedFile.size > 8388608) {
            toast.warning('Max Upload size is 8MB only');
            return;
        }
        let nam = event.target.name;
        const tmpFiles = [...files];
        tmpFiles[nam].file = uploadedFile

        setFiles(tmpFiles)
    }

    const logout = () => {
        Api.logout();
        navigate.replace(basepath(`/`))
        return false;
    }

    return <>
        <Head>
            <title>Buyer Onboarding | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="bg-white">
            <nav>

                <div className="row mx-0" style={{ minHeight: '100vh' }}>

                    <div className="col-md-4 col-12 p-5 d-flex flex-column align-items-center position-relative" style={{ backgroundColor: '#F1F4FA' }}>
                        <div style={{ maxWidth: 310, paddingTop: '15%' }}>
                            <img className="main-logo align-self-md-start mb-4" src={basepath(`/img/logo/logo.png`)} alt="" />
                            <div>
                                <h3 className="fw-normal">Profile Update for Marketplace / Buyer Onboarding</h3>
                            </div>

                            <div className="nav nav-tabs pt-4 d-flex flex-column justify-content-between border-bottom-0 mb-4 overflow-auto text-nowrap" id="nav-tab" role="tablist">

                                <a className="fs-6 active mb-5 position-relative cursor" ref={tab_1}
                                    id="company-info-tab" data-bs-toggle="tab" data-bs-target="#company-info-1"
                                    role="tab" aria-controls="company-info-1" aria-selected="true" >
                                    <span className="border border-secondary rounded-circle number-border">1</span>&nbsp;&nbsp;<span className="fw-bold"> Company Information</span> <i className="fa fa-chevron-right fs-4 position-absolute" style={{ right: 0, color: '#666' }}></i>
                                </a>

                                <a className="fs-6 mb-2 position-relative cursor" ref={tab_2}
                                    id="upload-file-tab" data-bs-toggle="tab" data-bs-target="#upload-file-1" >
                                    <span className="border border-secondary rounded-circle number-border">2</span>&nbsp;&nbsp;<span className="fw-bold"> Upload File </span> <i className="fa fa-chevron-right fs-4 position-absolute" style={{ right: 0, color: '#666' }}></i>
                                </a>

                                <ul className="list-onboarding mb-5">
                                    <li>SSM (Form 9)</li>
                                    <li>Incorporation Form (Form 24)</li>
                                    <li>Incorporation Form (Form 49)</li>
                                    <li>Bank Statement Header</li>
                                    <li>Current Retail/Wholesale Poison Licence (Poison A/B)</li>
                                    <li>Business License</li>
                                </ul>

                                <a className="fs-6 mb-5 position-relative cursor" ref={tab_3}
                                    id="confirmation-tab" data-bs-toggle="tab" data-bs-target="#confirmation-1"
                                    role="tab" aria-controls="confirmation-1" aria-selected="false">
                                    <span className="border border-secondary rounded-circle number-border">3</span>&nbsp;&nbsp;<span className="fw-bold"> Confirmation </span> <i className="fa fa-chevron-right fs-4 position-absolute" style={{ right: 0, color: '#666' }}></i>
                                </a>
                            </div>

                            <div className="auth-footer position-absolute d-flex flex-column justify-content-center align-items-center">
                                <div>
                                    <p className="text-dark">Copyright © 2021 DoctorOnCall TM All rights reserved.</p>
                                    <p className="text-dark mb-0"><a href={basepath("/doc/policy")} target="_blank" className="text-decoration-underline">Privacy</a> | <a href={basepath("/doc/terms")} target="_blank" className="text-decoration-underline">Terms of Services</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-12 p-5 d-flex flex-column align-items-center position-relative">
                        <div style={{ maxWidth: 700, paddingTop: '15%' }}>
                            <div className="position-absolute" style={{ top: 10, right: 20 }}>
                                Need Assistance? <a href="" className="text-primary text-decoration-underline fw-bold"> Get Help</a>
                            </div>

                            <div className="tab-content" id="tab-content1">
                                <div className="tab-pane fade  show active" id="company-info-1" role="tabpanel" aria-labelledby="company-info-tab">

                                    <h3>Create Your Account</h3>
                                    <div id="loginForm">
                                        <div className="row">

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="store-name" className="form-label mb-2">Account Name<span className="text-danger"> *</span></label>
                                                <input name="store_name" value={storeDetails.store_name} type="text" className="form-control" onChange={storeChangeHandler} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="company-email" className="form-label mb-2">Company Email<span className="text-danger"> *</span></label>
                                                <input name="support_email" value={storeDetails.support_email} type="email" className="form-control" onChange={storeChangeHandler} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="company-name" className="form-label mb-2">Company Name<span className="text-danger"> *</span></label>
                                                <input name="company_name" value={storeDetails.company_name} type="text" className="form-control" onChange={storeChangeHandler} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="company-contact-number" className="form-label mb-2">Company Contact Number<span className="text-danger"> *</span></label>
                                                <div className="input-group">
                                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">+60</button>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="#">+60</a></li>
                                                        {/* <li><a className="dropdown-item" href="#">+2</a></li>
                                                        <li><a className="dropdown-item" href="#">+3</a></li> */}
                                                    </ul>
                                                    <input name="support_phone" value={storeDetails.support_phone} type="phone" className="form-control" onChange={storeChangeHandler} />
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="company-registration-name" className="form-label mb-2">Company Registration Number<span className="text-danger"> *</span></label>
                                                <input name="company_registration" value={storeDetails.company_registration} type="text" className="form-control" onChange={storeChangeHandler} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="company-contact-number" className="form-label mb-2">Account Type<span className="text-danger"> *</span></label>
                                                <div className="payment-details">
                                                    <select id="hello-single" defaultValue={storeDetails.store_type} className="form-select" name="store_type" onChange={storeChangeHandler}>
                                                        {Buyers.map(({ name, index }) => <option value={index}>{name}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-12 mb-4">
                                                <p className="text-muted text-xs mb-4">In order to process your registration, you are required to provide all information in fields marked with an asterisk (*).</p>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 mb-3 text-end text-md-start">
                                                    <button className="btn btn-outline-secondary" onClick={logout}>Back</button>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="text-end">
                                                        <button className="btn btn-outline-primary me-3" onClick={() => onSubmit({ save: true })}>Save</button>
                                                        <button className="btn btn-primary"
                                                            role="tab" aria-controls="company-info-1" onClick={() => { onSubmit({ save: true }); tab_2.current.click()}} >Next <i className="fa fa-arrow-right"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="upload-file-1" role="tabpanel" aria-labelledby="upload-file-tab">

                                    <h3>Upload Files</h3>
                                    <p className="mb-4 text-muted">Each document must not exceed 8MB. Files must be in a .png, .jpg, or .pdf format.</p>

                                    {files.map((file, index) => {
                                        if ((storeDetails.store_type == 2 || storeDetails.store_type == 3) && (file.filetype == 4)) {
                                            // Do Nothing
                                        } else {
                                            return <div className="row mb-4" key={index}>
                                                <div className="col-12 d-flex flex-md-row flex-column justify-content-md-between justify-content-center align-items-md-center mb-3">
                                                    <p className="mb-md-0">{file.file && <i className="fa fa-check-circle text-success fs-6"></i>}&nbsp;{file.filename}</p>
                                                    <div className="mb-md-0 mb-3">
                                                        {file.file ?
                                                            <div className="d-flex flex-column flex-md-row align-items-md-center">
                                                                <input type="file" id={`fileSelect${index}`} name={`${index}`} accept="image/*,.pdf" className="d-none" onChange={uploadFile} multiple={false} />
                                                                <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2">Select File</label>
                                                                <badge className="badge badge-files ms-md-3"><i className="fa fa-file text-primary me-3"></i> <span className="file-name">{file.file.name}</span>&emsp;&emsp;<span>{file.file.size}b</span></badge>
                                                            </div>
                                                            :
                                                            <>
                                                                <input type="file" id={`fileSelect${index}`} name={`${index}`} accept="image/*,.pdf" className="d-none" onChange={uploadFile} multiple={false} />
                                                                <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2">Select File</label>
                                                            </>}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    })}

                                    <div className="">
                                        <p className="text-muted text-sm mb-5">Files uploaded will be reviewed and approved by DoctorOnCall. Kindly upload valid/latest documents only.</p>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3 text-end text-md-start">
                                            <button className="btn btn-outline-secondary" onClick={() => tab_1.current.click()}>Previous Step</button>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="text-end">
                                                <button className="btn btn-outline-primary me-3" >Save</button>
                                                <button className="btn btn-primary" onClick={() => tab_3.current.click()}>Next <i className="fa fa-arrow-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="confirmation-1" role="tabpanel" aria-labelledby="confirmation-tab">

                                    <h3>Confirmation</h3>

                                    <p className="border-bottom fw-bold pb-2 mt-4">Company Confirmation</p>
                                    <div className="row mb-4">
                                        <div className="col-mb-6 col-12 mb-3">
                                            <label htmlFor="store-name" className="form-label">Buyer Name</label>
                                            <input disabled className="form-control" value={storeDetails.store_name} />
                                        </div>
                                        <div className="col-mb-6 col-12 mb-3">
                                            <label htmlFor="company-name" className="form-label">Company Name</label>
                                            <input disabled className="form-control" value={storeDetails.company_name} />
                                        </div>

                                        <div className="col-mb-6 col-12 mb-3">
                                            <label htmlFor="company-registration-name" className="form-label">Company Registration Name</label>
                                            <input disabled className="form-control" value={storeDetails.company_registration} />
                                        </div>
                                        <div className="col-mb-6 col-12 mb-3">
                                            <label htmlFor="company-email" className="form-label">Company Email</label>
                                            <input disabled className="form-control" value={storeDetails.support_email} />
                                        </div>

                                        <div className="col-mb-6 col-12 mb-3">
                                            <label htmlFor="company-contact-number" className="form-label">Company Contact No.</label>
                                            <div className="input-group">
                                                <span className="input-group-text" id="basic-addon1">+60</span>
                                                <input disabled className="form-control" value={storeDetails.support_phone} />
                                            </div>
                                        </div>

                                        <div className="col-mb-6 col-12 mb-3">
                                            <label htmlFor="company-contact-number" className="form-label">Buyer Type</label>
                                            <input disabled className="form-control" value={Buyers[storeDetails.store_type].name} />
                                        </div>
                                    </div>

                                    <p className="border-bottom fw-bold pb-2">Files Uploaded</p>

                                    {files.map((file, index) => {
                                        if ((storeDetails.store_type == 2 || storeDetails.store_type == 3) && (file.filetype == 4)) {
                                            // Do Nothing
                                        } else {
                                            return <div className="row mb-4" key={index}>
                                                <div className="col-12 d-flex flex-md-row flex-column justify-content-md-between justify-content-center align-items-md-center mb-3">
                                                    <p className="mb-md-0">{file.file && <i className="fa fa-check-circle text-success fs-6"></i>}&nbsp;{file.filename}</p>
                                                    <div className="mb-md-0 mb-3">
                                                        {file.file ?
                                                            <div className="d-flex flex-column flex-md-row align-items-md-center">
                                                                <input type="file" id={`fileSelect${index}`} name={`${index}`} accept="image/*,.pdf" className="d-none" onChange={uploadFile} multiple={false} />
                                                                <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2 d-none">Select File</label>
                                                                <badge className="badge badge-files ms-md-3"><i className="fa fa-file text-primary me-3"></i> <span className="file-name">{file.file.name}</span>&emsp;&emsp;<span>{file.file.size}b</span></badge>
                                                            </div>
                                                            :
                                                            <>
                                                                <input type="file" id={`fileSelect${index}`} name={`${index}`} accept="image/*,.pdf" className="d-none" onChange={uploadFile} multiple={false} />
                                                                <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2">Select File</label>
                                                            </>}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    })}

                                    <div className="">
                                        <p className="text-muted text-sm mb-5">Files uploaded will be reviewed by DoctorOnCall for a merchant account to be approved. Kindly upload valid/ latest documents only.</p>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3 text-end text-md-start">
                                            <button className="btn btn-outline-secondary" onClick={() => tab_2.current.click()}>Previous Step</button>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="text-end">
                                                {/* <button className="btn btn-outline-primary me-3" >Save</button> */}
                                                <button className="btn btn-primary" onClick={() => onSubmit({})}>Submit <i className="fa fa-arrow-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        {/* <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card my-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="breadcomb-wp">
                                        <div className="text-dark">
                                            <i className="icon jiran-analytics icon-wrap"></i>
                                            <span className="mini-click-non"><a href="#" onClick={logout}>Marketplace</a> / Buyer Onboarding</span>
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
                                        <TabList className="d-flex justify-content-between border-bottom-0 mb-3 overflow-auto text-nowrap">
                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Company Information</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Upload File</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Confirmation</a>
                                            </Tab>
                                        </TabList>

                                        <TabPanel>
                                            <section id="company-info-1" role="tabpanel" aria-labelledby="company-info" className="body">

                                                <div className="product-delivery">
                                                    <div className="mb-3">
                                                        <label htmlFor="store-name" className="form-label">Buyer Account Name<span className="text-danger"> *</span></label>
                                                        <input name="store_name" value={storeDetails.store_name} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-name" className="form-label">Buyer Company Name<span className="text-danger"> *</span></label>
                                                        <input name="company_name" value={storeDetails.company_name} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-registration-name" className="form-label">Company Registration Number<span className="text-danger"> *</span></label>
                                                        <input name="company_registration" value={storeDetails.company_registration} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-email" className="form-label">Company Email<span className="text-danger"> *</span></label>
                                                        <input name="support_email" value={storeDetails.support_email} type="email" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-contact-number" className="form-label">Company Contact No.<span className="text-danger"> *</span></label>
                                                        <input name="support_phone" value={storeDetails.support_phone} type="phone" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-contact-number" className="form-label">Buyer Type<span className="text-danger"> *</span></label>
                                                        <div className="payment-details">
                                                            <select id="hello-single" defaultValue={storeDetails.store_type} className="form-control" name="store_type" onChange={storeChangeHandler}>
                                                                {Buyers.map(({ name, index }) => <option value={index}>{name}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button className="btn btn-danger w-25" onClick={logout}>Back</button>&emsp;
                                                        <button className="btn btn-primary w-25" onClick={() => setKey(1)}>Next</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        <TabPanel>
                                            <section id="upload-file-1" role="tabpanel" aria-labelledby="upload-file-1" className="body">

                                                <div className="product-status-wrap">
                                                    <div className="d-flex align-content-center justify-content-between mb-3">
                                                        <h4 className="mb-0">Upload Files</h4>
                                                    </div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th className="w-50">File Type</th>
                                                                <th className="w-50">Upload File</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {files.map((file, index) => {
                                                                if ((storeDetails.store_type == 2 || storeDetails.store_type == 3) && (file.filetype == 4)) {
                                                                    // Do Nothing
                                                                } else {
                                                                    return <tr key={index}>
                                                                        <td>{file.filename}</td>
                                                                        <td>
                                                                            {file.file ? <>
                                                                                <input type="file" id={`fileSelect${index}`} name={`${index}`} accept="image/*,.pdf" className="d-none" onChange={uploadFile} multiple={false} />
                                                                                <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2">Select File</label>
                                                                                <span className="ms-3">{file.file.name}</span>
                                                                            </>
                                                                                :
                                                                                <>
                                                                                    <input type="file" id={`fileSelect${index}`} name={`${index}`} accept="image/*,.pdf" className="d-none" onChange={uploadFile} multiple={false} />
                                                                                    <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2">Select File</label>
                                                                                </>}
                                                                        </td>
                                                                    </tr>
                                                                }
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="text-center">
                                                    <button className="btn btn-danger w-25" onClick={() => setKey(0)}>Back</button>&emsp;
                                                    <button className="btn btn-primary w-25" onClick={() => setKey(2)}>Next</button>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        <TabPanel>
                                            <section id="confirmation-1" role="tabpanel" aria-labelledby="confirmation-1" className="body">

                                                <div className="product-confirmation">

                                                    <div className="container-fluid">

                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="product-delivary">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="store-name" className="form-label">Buyer Name</label>
                                                                        <input disabled className="form-control" value={storeDetails.store_name} />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label htmlFor="company-name" className="form-label">Company Name</label>
                                                                        <input disabled className="form-control" value={storeDetails.company_name} />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="company-registration-name" className="form-label">Company Registration Name</label>
                                                                        <input disabled className="form-control" value={storeDetails.company_registration} />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label htmlFor="company-email" className="form-label">Company Email</label>
                                                                        <input disabled className="form-control" value={storeDetails.support_email} />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="company-contact-number" className="form-label">Company Contact No.</label>
                                                                        <input disabled className="form-control" value={storeDetails.support_phone} />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="company-contact-number" className="form-label">Buyer Type</label>
                                                                        <input disabled className="form-control" value={storeDetails.store_type} value={Buyers[storeDetails.store_type]} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <br />
                                                        <div className="row">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <h4>Files</h4>
                                                                <ul>
                                                                    {files.map((file, index) => {
                                                                        if ((storeDetails.store_type == 2 || storeDetails.store_type == 3) && (file.filetype == 4)) {
                                                                            // Do Nothing
                                                                        } else {
                                                                            return <React.Fragment key={index}>
                                                                                <li>{file.filename} : {file.file ? "Uploaded" : "Not Uploaded Yet"}</li>
                                                                            </React.Fragment>
                                                                        }
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="text-center">
                                                            <button className="btn btn-danger w-25" onClick={() => setKey(1)}>Back</button>&emsp;
                                                            <button className="btn btn-primary w-25" onClick={() => onSubmit({})}>Submit</button>
                                                        </div>
                                                    </div>
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
        </div> */}
    </>
}