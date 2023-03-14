import Head from 'next/head';
import Api from '../../../../api/Admin';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import Pagination from '../../../../components/Pagination.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import config from 'next/config';
import basepath, { navigate } from '../../../../components/basepath';
import product_categories from '../../../../../json/product_categories.json';
import Big from 'big.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function productList() {
    const fileRef = useRef();

    const [products, setProducts] = useState({ results: [] });
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });
    const CHECKBOX_STATES = {
        Checked: 'Checked',
        Indeterminate: 'Indeterminate',
        Empty: 'Empty',
    };
    const [checkedCount, setCheckedCount] = useState(0);
    const [publishedCount, setPublishedCount] = useState(0);
    const [draftedCount, setDraftedCount] = useState(0);
    const [incompleteCount, setIncompleteCount] = useState(0);
    const [checked, setChecked] = useState(CHECKBOX_STATES.Empty);
    const [product_status, setProductStatus] = useState(-1);
    const [_search, setSearch] = useState("");

    const Checkbox = ({ label, value, onChange }) => {
        const checkboxRef = useRef();
        let empty = 0
        let check = 0
        let draft = 0
        let publish = 0
        let incomplete = 0
        products.results.forEach(product => {
            if (product.checked == true) {
                check++;
                if (product.product_status == 0) {
                    publish++;
                } else if (product.product_status == 1) {
                    draft++;
                } else {
                    incomplete++
                }
            }
            if (product.checked == false) {
                empty++;
            }
        });
        if (empty != 0 && check != 0) {
            value = CHECKBOX_STATES.Indeterminate
        } else if (empty == 0) {
            value = CHECKBOX_STATES.Checked
        } else {
            value = CHECKBOX_STATES.Empty
        }

        setCheckedCount(check);
        setPublishedCount(publish);
        setDraftedCount(draft);
        setIncompleteCount(incomplete);

        useEffect(() => {
            if (value === CHECKBOX_STATES.Checked) {
                checkboxRef.current.checked = true;
                checkboxRef.current.indeterminate = false;
            } else if (value === CHECKBOX_STATES.Empty) {
                checkboxRef.current.checked = false;
                checkboxRef.current.indeterminate = false;
            } else if (value === CHECKBOX_STATES.Indeterminate) {
                checkboxRef.current.checked = false;
                checkboxRef.current.indeterminate = true;
            }
        }, [value]);

        return (
            <label className="align-middle">
                <input ref={checkboxRef} type="checkbox" onChange={onChange} />
                {label ?
                    <span className="ms-3">{label}</span>
                    : <></>}
            </label>
        );
    };

    const handleChange = () => {
        let updatedChecked;

        if (checked === CHECKBOX_STATES.Checked) {
            let tmpProducts = { ...products }
            tmpProducts.results.forEach(product => {
                product.checked = false
            });
            setProducts(tmpProducts)
            updatedChecked = CHECKBOX_STATES.Empty;
        } else if (checked === CHECKBOX_STATES.Empty) {
            let tmpProducts = { ...products }
            tmpProducts.results.forEach(product => {
                product.checked = true
            });
            setProducts(tmpProducts)
            updatedChecked = CHECKBOX_STATES.Checked;
        } else if (checked === CHECKBOX_STATES.Indeterminate) {
            let tmpProducts = { ...products }
            tmpProducts.results.forEach(product => {
                product.checked = true
            });
            setProducts(tmpProducts)
            updatedChecked = CHECKBOX_STATES.Checked;
        }

        setChecked(updatedChecked);
    };

    useEffect(() => {
        getProductList();
    }, [product_status, paginate]);

    // Get List of products
    const getProductList = async () => {
        try {
            let products = await Api.listApprovedProducts(product_status, paginate, _search);
            products.results.forEach(product => {
                product.checked = false
            });
            setProducts(products)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Page Change Handler
    const onPageChange = async ({ _page, _pagesize }) => {
        try {
            setPaginate({ _page, _pagesize })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    function selectOnce(event, index) {
        try {
            let tmpProducts = { ...products }
            tmpProducts.results[index].checked = !tmpProducts.results[index].checked
            setProducts(tmpProducts)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    //
    const onReject = async (product_id) => {
        try {
            if (await Api.rejectProduct(product_id)) {
                toast.success("Product Rejected", {
                    autoClose: 1000
                });
                await getProductList();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const onBulkReject = async () => {
        try {
            const product_ids = products.results.filter(({checked})=>checked).map(({id})=>id);
            await Api.bulkRejectProduct(product_ids);
            toast.success("Product Rejected", {
                autoClose: 1000
            });
            await getProductList();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Product List | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-fluid container-height">
            <div className="card mg-b-30 my-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="product-status-wrap">

                                <div className="row mb-3">
                                    <div className="col-md-6 col-12 d-flex align-content-center">
                                        <h4 className="mb-3 mb-md-0 fs-6">Products Pending Approval List</h4>
                                    </div>
                                    <div className="col-md-6 col-12 d-flex align-content-center justify-content-md-end">
                                    </div>
                                </div>

                                <table className="w-100">
                                    <thead>
                                        <tr>
                                            <th>
                                                <Checkbox
                                                    label=""
                                                    value={checked}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                            <th><div style={{ width: 60 }}></div></th>
                                            <th><div style={{ width: 300 }}>Product Name</div></th>
                                            <th><div style={{ width: 300 }}>Variant</div></th>
                                            <th>Type</th>
                                            <th>Settings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.results.length > 0 ?
                                            products.results.map((product, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" value="" checked={products.results[index].checked} id="flexCheckChecked" onChange={(event) => selectOnce(event, index)} />
                                                        {/* <span className="fw-bold">{index + 1}</span> */}
                                                    </td>
                                                    <td>
                                                        <img className="img-table-product" src={Api.getImage(product.data.images ? product.data.images [0] : null)} alt="" />
                                                    </td>
                                                    <td className="d-flex align-items-start">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <span className="fw-bold cursor" style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal' }} onClick={() => navigate.push(`/admin/product/store/${product.id}`)}>{product.data.name}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {product.variants.length > 1 ?
                                                            product.variants.map((variant, i) => {
                                                                return (<React.Fragment key={i}>
                                                                    <span style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal' }} key={i}>{i + 1}. {variant.data.name}</span><br />
                                                                </React.Fragment>)
                                                            })
                                                            :
                                                            <span className="">No Variant Available</span>
                                                        }
                                                    </td>
                                                    
                                                    <td>
                                                        {{
                                                            0: <span className="text-danger">{product_categories[product.data.product_type].name}</span>,
                                                            1: <span className="text-warning">{product_categories[product.data.product_type].name}</span>,
                                                            2: <span className="text-primary">{product_categories[product.data.product_type].name}</span>,
                                                            3: <span className="text-success">{product_categories[product.data.product_type].name}</span>
                                                        }[product.data.product_type]}
                                                    </td>

                                                    <td>
                                                        <button
                                                            data-toggle="tooltip"
                                                            title="Reject Product"
                                                            onClick={()=>onReject(product.id)}
                                                            className="btn btn-sm btn-danger ms-2">
                                                            <i className="fa fa-trash-o me-2" aria-hidden="true"></i>
                                                            Reject
                                                        </button>
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
                                <Pagination onPageChanged={onPageChange} _page={parseInt(products._page)} _pagesize={parseInt(products._pagesize)} totalItem={products.total} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {checkedCount != 0 && <div className="card mg-b-30 my-2 d-flex" id="stickyCard">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="px-3 d-flex justify-content-between">
                                <Checkbox
                                    label="Select All"
                                    value={checked}
                                    onChange={handleChange}
                                />

                                <div className="text-end" id="foooter">
                                    <span>{checkedCount} product selected</span>
                                    <button type="button" className="btn btn-sm btn-danger ms-2" onClick={onBulkReject}>Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </>
}