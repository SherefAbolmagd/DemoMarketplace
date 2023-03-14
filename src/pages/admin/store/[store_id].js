import Head from 'next/head';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import Api from '../../../api/Admin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Big from 'big.js';

import BankList from '../../../../json/malaysia_banks.json';
import basepath, { navigate } from '../../../components/basepath';


export default function storeDetails({ store_id }) {
    const router = useRouter();
    const [store, setStore] = useState({ details:{} });
    const [key, setKey] = useState(0);
    const [merchants, setMerchants] = useState({ results: [] });
    const [products, setProducts] = useState({ results: [] })

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
        getStore();
    }, []);

    const getStore = async () => {
        try {
            const { store } = await Api.getStoreAdmin(store_id)
            const merchantList = await Api.getStoreMerchantsAdmin(store_id)
            const productList = await Api.getStoreProductsAdmin(store_id)
            setStore(store)
            setMerchants(merchantList.results.merchants);
            setProducts(productList)

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

    const onUpdateStoreType = async (store_id, store_type) => {
        try {
            if (await Api.updateStoreType(store_id, store_type)) {
                toast.success("Store Type Updated")
            }
            await getStore();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    function storeTypeChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...store };
        s[nam] = val;
        setStore(s)
    }

    return <>
        <Head>
            <title>Store Detail | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card my-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                    <div className="breadcomb-wp">
                                        {/* <div className="breadcomb-icon">
                                                            <i className="icon jiran-home"></i>
                                                        </div> */}
                                        <div className="text-dark">
                                            <i className="icon jiran-home icon-wrap"></i>
                                            <span className="mini-click-non">Admin / Store </span>
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
                                                <a>Bank Information</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Upload File</a>
                                            </Tab>

                                            <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Merchant List</a>
                                            </Tab>

                                            {/* <Tab className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Product List</a>
                                            </Tab> */}

                                        </TabList>

                                        <TabPanel>
                                            <section id="company-info-1" role="tabpanel" aria-labelledby="company-info" className="body">

                                                <div className="product-delivary">
                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="store-name" className="form-label">Store Name</label>
                                                        <input name="store_name" value={store?.store_name} type="text" className="form-control" readOnly />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-name" className="form-label">Company Name</label>
                                                        <input name="company_name" value={store?.company_name} type="text" className="form-control" readOnly />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-registration-name" className="form-label">Company Registration Number</label>
                                                        <input name="company_registration" value={store?.company_registration} type="text" className="form-control" readOnly />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-email" className="form-label">Company Email</label>
                                                        <input name="support_email" value={store?.support_email} type="email" className="form-control" readOnly />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-contact-number" className="form-label">Company Contact No.</label>
                                                        <input name="support_phone" value={store?.support_phone} type="phone" className="form-control" readOnly />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="company-contact-number" className="form-label">Store Type</label>
                                                        <div className="payment-details">
                                                            <select value={store?.store_type} className="form-select" name="store_type" onChange={storeTypeChangeHandler}>
                                                                <option value={0}>Retail Poison</option>
                                                                <option value={1}>Wholesale Poison</option>
                                                                <option value={2}>Retail Other</option>
                                                                <option value={3}>Wholesale Other</option>
                                                            </select>
                                                        </div>
                                                        <button className="btn btn-primary btn-sm mt-2" onClick={() => onUpdateStoreType(store.id, store.store_type)}>Update Store Type</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        <TabPanel>
                                            <section id="bank-info-1" role="tabpanel" aria-labelledby="bank-info-1" className="body">

                                                <div className="product-delivary">

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="bank-account" className="form-label">Bank Account for Settlement</label>
                                                        <input name="bank_account_name" value={store?.bank_account_name} type="text" className="form-control" readOnly />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label htmlFor="bank-account-no" className="form-label">Bank Account No</label>
                                                        <input name="bank_account_no" value={store?.bank_account_no} type="text" className="form-control" readOnly />
                                                    </div>

                                                    <div className="form-group mg-t-15">
                                                        <label className="form-label">List Bank</label>
                                                        <select defaultValue={store.bank_id} className="form-select" name="bank_id" disabled>
                                                            <option value={-1}>Select Bank</option>
                                                            {BankList.map((bank, index) => <option value={bank.code} key={index}>{bank.name}</option>)}
                                                        </select>
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
                                                                        <th className="w-25">View</th>
                                                                        {/* <th className="w-25">Download</th> */}
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
                                                                                    {file.file ?
                                                                                        <a href={basepath(`/api/admin/file/${file.file.fileId}?access_token=${Api.token}`)} className="btn btn-sm btn-outline-primary mb-md-0 mb-2" target="_blank">View</a>
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
                                        </TabPanel>

                                        <TabPanel>
                                            <section id="bank-info-1" role="tabpanel" aria-labelledby="bank-info-1" className="body">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="product-status-wrap">
                                                            <div className="d-flex align-content-center justify-content-between mb-3">
                                                                <h4 className="mb-0">Merchant List</h4>

                                                            </div>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Role</th>
                                                                        <th>Email</th>
                                                                        <th>Telephone</th>
                                                                        <th>Settings</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {merchants?.length > 0 ?
                                                                        merchants.map((merchant, index) => {
                                                                            return <tr key={index}>
                                                                                <td>{merchant.user.full_name}</td>
                                                                                <td>
                                                                                    {{
                                                                                        0: <span className="text-success fw-bold">Admin</span>,
                                                                                        1: <span className="text-primary fw-bold">Finance</span>,
                                                                                        2: <span className="text-danger fw-bold">Operation</span>,
                                                                                        3: <span className="text-primary fw-bold">Marketing</span>
                                                                                    }[merchant.merchant_role]}</td>
                                                                                <td>{merchant.user.email}</td>
                                                                                <td>{merchant.user.phone}</td>
                                                                                <td>
                                                                                    <button data-toggle="tooltip" title="Edit" className="btn btn-sm btn-warning" onClick={() => navigate.push(`/admin/user/${merchant.user.id}`)}>
                                                                                        <i className="fa fa-pencil-square-o me-2" aria-hidden="true"></i>
                                                                                        View Merchant
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        }) : <tr><td className="text-danger text-center" colSpan="100%">No Merchant Available</td></tr>}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel>

                                        {/* <TabPanel>
                                            <section id="bank-info-1" role="tabpanel" aria-labelledby="bank-info-1" className="body">

                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="product-status-wrap">
                                                            <div className="d-flex align-content-center justify-content-between mb-3">
                                                                <h4 className="mb-0">Product List</h4>

                                                            </div>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Product Name</th>
                                                                        <th>Status</th>
                                                                        <th>Stock</th>
                                                                        <th>Variant</th>
                                                                        <th>Price</th>
                                                                        <th>Type</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {products?.results?.length > 0 ?
                                                                        products.results.map((product, index) => {
                                                                            return <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{product.data.name}</td>
                                                                                <td>
                                                                                    {{
                                                                                        0: <span className="text-success fw-bold">Published</span>,
                                                                                        1: <span className="text-primary fw-bold">Drafted</span>,
                                                                                        2: <span className="text-danger fw-bold">Missing Product Variant</span>
                                                                                    }[product.product_status]}
                                                                                </td>
                                                                                <td className="text-danger">Out Of Stock</td>
                                                                                <td>
                                                                                    {product.variants.length !== 0 ?
                                                                                        product.variants.map((variant, i) => {
                                                                                            return (<React.Fragment key={i}>
                                                                                                <span key={i}>{variant.data.name}</span><br />
                                                                                            </React.Fragment>)
                                                                                        })
                                                                                        :
                                                                                        <span className="text-danger">No Variant Available</span>
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {product.variants.length !== 0 ?
                                                                                        product.variants.map((variant, i) => {
                                                                                            return (<React.Fragment key={i}>
                                                                                                <span>RM {Big(variant.data.price).toFixed(2)}</span><br />
                                                                                            </React.Fragment>)
                                                                                        })
                                                                                        :
                                                                                        <span className="text-danger">-</span>
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {{
                                                                                        0: <span className="text-danger">Poison</span>,
                                                                                        1: <span className="text-warning">Product</span>,
                                                                                        2: <span className="text-primary">Service</span>
                                                                                    }[product.data.product_type]}
                                                                                </td>
                                                                            </tr>
                                                                        })
                                                                        :
                                                                        <>
                                                                            <tr>
                                                                                <td colSpan="9" className="text-center">No Data Available</td>
                                                                            </tr>
                                                                        </>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </TabPanel> */}

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

export async function getServerSideProps(context) {
    const { store_id } = context.params;
    return {
        props: { store_id }, // will be passed to the page component as props
    }
}