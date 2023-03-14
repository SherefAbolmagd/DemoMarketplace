import Head from 'next/head';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import Api from '../../../api/Merchant';
import { toast } from 'react-toastify';
import BankList from '../../../../json/malaysia_banks.json';
import { getStates, getCities, getPostcodes } from "malaysia-postcodes";
import basepath from '../../../components/basepath';
import { useDropzone } from 'react-dropzone'

export default function Register() {
    const [store, setStore] = useState({});
    const [address, setAddress] = useState({});
    const [merchant_role, setMerchant_role] = useState({});
    const [key, setKey] = useState(0);
    const [files, setFiles] = useState([
        { fileType: 0, file: "", fileName: "SSM (Form 9)" },
        { fileType: 1, file: "", fileName: "Incorporation Form (Form 24)" },
        { fileType: 2, file: "", fileName: "Incorporation Form (Form 49)" },
        { fileType: 3, file: "", fileName: "Bank Statement Header" },
        { fileType: 4, file: "", fileName: "Current Retail/Wholesale Poison License (Poison A/B)" },
        { fileType: 5, file: "", fileName: "Business License" }
    ])

    useEffect(() => {
        getStore();
    }, []);

    const getStore = async () => {
        try {
            const { store, address, merchant_role } = await Api.getStore();
            setStore(store)
            setAddress(address)
            setMerchant_role(merchant_role)
            let tempFiles = files
            // Fill files data into "files" state
            for (let tempFile of tempFiles) {
                for (let file of store.metadata.files) {
                    if (file.fileType == tempFile.fileType) {
                        //let data = await Api.getFileData(file.fileId)
                        tempFile.file = file
                    }
                }
            }
            setFiles(tempFiles)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    function storeChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...store };
        s[nam] = val;
        setStore(s)
    }

    function addressChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...address };
        s[nam] = val;

        if (nam == "state") {
            s.country = "Malaysia";
            s.city = getCities(val)[0];
            s.postcode = getPostcodes(val, s.city)[0];
        }
        setAddress(s)
    }

    const updateFile = async (event) => {
        const uploadedFile = event.target.files[0];
        const uploadedFileId = parseInt(event.target.name);

        // File Validation
        var t = uploadedFile.type.split('/').pop().toLowerCase();
        if (t != "jpeg" && t != "jpg" && t != "png" && t != "bmp" && t != "gif" && t != "pdf") {
            toast.warning('Please select a valid file type');
            return;
        }
        if (uploadedFile.size > 10485760) {
            toast.warning('Max Upload size is 10MB only');
            return;
        }

        let formData = new FormData();
        formData.append("file_id", uploadedFileId)
        formData.append("uploadedFile", uploadedFile)
        if (await Api.updateFile(formData)) {
            toast.success("File Updated", {
                autoClose: 1000
            });
            getStore();
        }
    }

    const uploadFile = async (event) => {
        // Get Uploaded File
        const uploadedFile = event.target.files[0];

        // File Validation
        var t = uploadedFile.type.split('/').pop().toLowerCase();
        if (t != "jpeg" && t != "jpg" && t != "png" && t != "bmp" && t != "gif" && t != "pdf") {
            toast.warning('Please select a valid file type');
            return;
        }
        if (uploadedFile.size > 10485760) {
            toast.warning('Max Upload size is 10MB only');
            return;
        }

        const uploadedFileType = event.target.name;

        let formData = new FormData();
        formData.append("fileType", uploadedFileType)
        formData.append("uploadedFile", uploadedFile)
        await Api.uploadFile(formData)
        toast.success("File Uploaded", {
            autoClose: 1000
        });
        getStore();
        setKey(0)
    }

    async function onSubmit() {
        try {
            let req = { ...store };
            
            let form = new FormData();
            
            if (store.metadata.store_image?.data_url) {
                form.append("image_file", store.metadata.store_image);
            }
            
            delete req.metadata.store_image; 

            form.append("json", JSON.stringify(req));

            if (await Api.updateStore(form)) {
                toast.success("Store Successfully Updated", {
                    autoClose: 1000
                });
                getStore();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    async function onSubmitAddress() {
        try {
            if (await Api.updateStoreAddress(address)) {
                toast.success("Address Successfully Updated", {
                    autoClose: 1000
                });
                getStore();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onDrop = async (files) => {
        for (let file of files) {
            file.data_url = await toBase64(file);
        }
        let metadata = store.metadata;
        metadata.store_image = files[0];
        setStore({ ...store, metadata });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ multiple: false, onDrop })

    return <>
        <Head>
            <title>Store | DoctorOnCall</title>
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
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="product-cart-inner">
                                    <Tabs selectedIndex={key} onSelect={(k) => setKey(k)}>
                                        <TabList className="d-flex justify-content-between border-bottom-0 mb-3 overflow-auto text-nowrap">
                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Company Information</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Store Address</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Bank Information</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Upload File</a>
                                            </Tab>

                                        </TabList>

                                        <TabPanel>
                                            <section id="company-info-1" role="tabpanel" aria-labelledby="company-info" className="body">

                                                <div className="product-delivary">
                                                    <label className="form-label">Upload Photo</label>
                                                    <div className="mb-3" style={{ display: "flex", flexDirection: "row", overflowX: "auto" }} >
                                                        {store?.metadata?.store_image ?
                                                            <Button {...getRootProps()} variant="outline-dark" style={{ marginRight: 20 }}>
                                                                <Row className="mb-3" style={{ width: 200 }}>
                                                                    <img src={store?.metadata?.store_image?.data_url || Api.getImage(store?.metadata?.store_image.path)} alt="..." style={{ width: "100%" }} />
                                                                </Row>
                                                                <Button variant="danger" style={{ width: "100%" }}>Update</Button>
                                                                <input {...getInputProps()} />
                                                            </Button>
                                                            :
                                                            <Button {...getRootProps()} variant="outline-dark" style={{ marginRight: 20 }}>
                                                                <Row className="mb-3" style={{ width: 200 }}>
                                                                    <img src={basepath("/img/camera.png")} alt="..." style={{ width: "100%" }} />
                                                                </Row>
                                                                <Button style={{ width: "100%" }}>Add Photo</Button>
                                                                <input {...getInputProps()} />
                                                            </Button>}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="store-name" className="form-label">Store Name</label>
                                                        <input name="store_name" value={store?.store_name} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-name" className="form-label">Company Name</label>
                                                        <input name="company_name" value={store?.company_name} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-registration-name" className="form-label">Company Registration Number</label>
                                                        <input name="company_registration" value={store?.company_registration} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-email" className="form-label">Company Email</label>
                                                        <input name="support_email" value={store?.support_email} type="email" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-contact-number" className="form-label">Company Contact No.</label>
                                                        <input name="support_phone" value={store?.support_phone} type="phone" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-contact-number" className="form-label">Store Type</label>
                                                        <div className="payment-details">
                                                            <select value={parseInt(store?.store_type)} className="form-select" name="store_type" onChange={storeChangeHandler}>
                                                                <option value={0}>Retail Poison</option>
                                                                <option value={1}>Wholesale Poison</option>
                                                                <option value={2}>Retail Other</option>
                                                                <option value={3}>Wholesale Other</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="company-contact-number" className="form-label">Merchant Role</label>
                                                        <select value={parseInt(merchant_role)} className="form-select" name="merchant_role" onChange={(event) => setMerchant_role(event.target.value)}>
                                                            <option value={0}>Admin</option>
                                                            <option value={1}>Finance</option>
                                                            <option value={2}>Operation</option>
                                                            <option value={3}>Marketing</option>
                                                        </select>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="button" className="btn btn-primary w-25" onClick={onSubmit}>Update Company Information</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        <TabPanel>
                                            <section id="bank-info-1" role="tabpanel" aria-labelledby="bank-info-1" className="body">

                                                <div className="product-delivary">

                                                    <div className="mb-3">
                                                        <label htmlFor="store-full-address" className="form-label">Address 1</label>
                                                        <textarea className="form-control" style={{ height: 80 }} placeholder="" name="address_1" value={address?.address_1} onChange={addressChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="store-full-address" className="form-label">Address 2</label>
                                                        <textarea className="form-control" style={{ height: 80 }} placeholder="" name="address_2" value={address?.address_2} onChange={addressChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="store-postcode" className="form-label">Country</label>
                                                        <input name="country" value={address?.country} readOnly type="text" className="form-control" onChange={addressChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="store-postcode" className="form-label">State</label>
                                                        <select defaultValue={address?.state} className="form-select" name="state" onChange={addressChangeHandler}>
                                                            {getStates().map((state) => <option value={state}>{state}</option>)}
                                                        </select>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="store-postcode" className="form-label">City</label>
                                                        <select disabled={!address?.state} defaultValue={address?.city} className="form-select" name="city" onChange={addressChangeHandler}>
                                                            {getCities(address?.state || "").map((city) => <option value={city}>{city}</option>)}
                                                        </select>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="store-postcode" className="form-label">Postcode</label>
                                                        <select disabled={!address?.state && !address?.postcode} defaultValue={address?.postcode} className="form-select" name="postcode" onChange={addressChangeHandler}>
                                                            {getPostcodes(address?.state || "", address?.city || "").map((postcode) => <option value={postcode}>{postcode}</option>)}
                                                        </select>
                                                    </div>

                                                    <div className="text-center">
                                                        <button className="btn btn-primary w-25" onClick={onSubmitAddress}>Update Store Address</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        <TabPanel>
                                            <section id="bank-info-1" role="tabpanel" aria-labelledby="bank-info-1" className="body">

                                                <div className="product-delivary">

                                                    <div className="mb-3">
                                                        <label htmlFor="bank-account" className="form-label">Bank Account for Settlement</label>
                                                        <input name="bank_account_name" value={store?.bank_account_name} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="bank-account-no" className="form-label">Bank Account No</label>
                                                        <input name="bank_account_no" value={store?.bank_account_no} type="text" className="form-control" onChange={storeChangeHandler} />
                                                    </div>

                                                    <div className="mb-5">
                                                        <label className="form-label">List Bank</label>
                                                        <select defaultValue={store.bank_id} className="form-select" name="bank_id" onChange={storeChangeHandler}>
                                                            <option value={-1} selected>Select Bank</option>
                                                            {BankList.map((bank, index) => <option value={bank.code} key={index}>{bank.name}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="text-center">
                                                        <button className="btn btn-primary w-25" onClick={onSubmit}>Update Bank Information</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        <TabPanel>
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
                                                                        <th className="w-50">Upload File</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {files.map((file, index) => {
                                                                        if ((store.store_type == 2 || store.store_type == 3) && file.fileType == 4) {
                                                                            // Do nothing
                                                                        } else {
                                                                            return <tr key={index}>
                                                                                <td>{file.fileName}</td>
                                                                                <td>
                                                                                    {file.file ? <>
                                                                                        <input type="file" id={`fileSelect${index}`} name={file.file.id} className="d-none" onChange={updateFile} multiple={false} />
                                                                                        <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2">Select File</label>
                                                                                        <a href={basepath(`/api/store/file/${file.file.fileId}?access_token=${Api.token}`)} className="btn btn-sm btn-outline-primary ms-2 mb-md-0 mb-2" target="_blank">View</a>
                                                                                        {/* <a href={basepath(`/api/file/${file.file.id}`)} className="btn btn-sm btn-outline-primary ms-2 mb-md-0 mb-2" download={file.file.path.split('\\').pop().split('/').pop()}>Download</a> */}
                                                                                    </>
                                                                                        :
                                                                                        <>
                                                                                            <input type="file" id={`fileSelect${index}`} name={`${file.fileType}`} accept="image/*,.pdf" className="d-none" onChange={uploadFile} multiple={false} />
                                                                                            <label htmlFor={`fileSelect${index}`} className="btn btn-sm btn-outline-primary mb-md-0 mb-2">Upload File</label>
                                                                                        </>}
                                                                                </td>
                                                                            </tr>
                                                                        }
                                                                    })}
                                                                </tbody>
                                                            </table>
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
        </div>
    </>
}