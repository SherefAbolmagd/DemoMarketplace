import Head from 'next/head';
import Api from '../../../api/Merchant';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import Pagination from '../../../components/Pagination.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import config from 'next/config';
import basepath, { navigate } from '../../../components/basepath';
import product_categories from '../../../../json/product_categories.json';
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
            let products = await Api.listProducts(product_status, paginate, _search);
            products.results.forEach(product => {
                product.checked = false
            });
            setProducts(products)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Delete Product
    const deleteProduct = async (product_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            if (result.isConfirmed) {
                await Api.deleteProduct(product_id);
                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success'
                );
                await getProductList();
            }
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

    // Upload Excel File
    const importProduct = async (event) => {
        try {
            const uploadedFile = event.target.files[0];

            if(!uploadedFile)
                return

            let formData = new FormData();
            formData.append("UploadedFile", uploadedFile)

            if (await Api.importProduct(formData)) {
                toast.success("Product Uploaded", {
                    autoClose: 1000
                });
                await getProductList();
                fileRef.current.value = null;
            }
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

    // Bulk Publish Product
    const onBulkPublish = async () => {
        try {
            if (incompleteCount != 0) {
                await Swal.fire({
                    title: 'Can not be published',
                    text: `You have selected ${incompleteCount} products that have not been completed yet. Please completed them to continue`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, I understand'
                }).then((result) => {
                    if (result.isConfirmed) {
                        return
                    }
                })
            } else if (publishedCount != 0) {
                await Swal.fire({
                    title: 'Can not be published',
                    text: `You have selected ${checkedCount} products and ${publishedCount} is already published. Click ‘confirm’ to continue publish the other ${draftedCount} products`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            for (let index = 0; index < products.results.length; index++) {
                                if (products.results[index].checked == true && products.results[index].product_status == 1) {
                                    await Api.publishProduct(products.results[index].id);
                                }
                            }
                            Swal.fire(
                                'Published!',
                                'Product has been published.',
                                'success'
                            )
                            await getProductList();
                        }
                        catch (ex) {
                            toast.warning(ex.message)
                        }
                    }
                })
            } else {
                await Swal.fire({
                    title: `You will publish ${draftedCount} products`,
                    text: `Products can be seen and checked out by buyers after publishing.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            for (let index = 0; index < products.results.length; index++) {
                                if (products.results[index].checked == true && products.results[index].product_status == 1) {
                                    await Api.publishProduct(products.results[index].id);
                                }
                            }
                            Swal.fire(
                                'Published!',
                                'Product has been published.',
                                'success'
                            )
                            await getProductList();
                        }
                        catch (ex) {
                            toast.warning(ex.message)
                        }
                    }
                })
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Bulk Draft Product
    const onBulkDraft = async () => {
        try {
            if (incompleteCount != 0) {
                await Swal.fire({
                    title: 'Can not be drafted',
                    text: `You have selected ${incompleteCount} products that have not been completed yet. Please completed them to continue`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, I understand'
                }).then((result) => {
                    if (result.isConfirmed) {
                        return
                    }
                })
            } else if (draftedCount != 0) {
                await Swal.fire({
                    title: 'Can not be drafted',
                    text: `You have selected ${checkedCount} products and ${draftedCount} is already drafted. Click ‘confirm’ to continue draft the other ${publishedCount} products`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            for (let index = 0; index < products.results.length; index++) {
                                if (products.results[index].checked == true && products.results[index].product_status == 0) {
                                    await Api.draftProduct(products.results[index].id);
                                }
                            }
                            Swal.fire(
                                'Drafted!',
                                'Product has been drafted.',
                                'success'
                            )
                            await getProductList();
                        }
                        catch (ex) {
                            toast.warning(ex.message)
                        }
                    }
                })
            } else {
                await Swal.fire({
                    title: `Are you sure to draft ${publishedCount} selected products ?`,
                    text: `Drafted products can not be seen and checked out by buyers.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            for (let index = 0; index < products.results.length; index++) {
                                if (products.results[index].checked == true && products.results[index].product_status == 0) {
                                    await Api.draftProduct(products.results[index].id);
                                }
                            }
                            Swal.fire(
                                'Drafted!',
                                'Product has been drafted.',
                                'success'
                            )
                            await getProductList();
                        }
                        catch (ex) {
                            toast.warning(ex.message)
                        }
                    }
                })
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Bulk Delete Product
    const onBulkDelete = async (product_id) => {
        try {
            await Swal.fire({
                title: 'Delete Product',
                text: "Are you sure to delete the products? You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        for (let index = 0; index < products.results.length; index++) {
                            if (products.results[index].checked == true) {
                                await Api.deleteProduct(products.results[index].id);
                            }
                        }
                        Swal.fire(
                            'Deleted!',
                            'Product has been deleted.',
                            'success'
                        )
                        await getProductList();
                    }
                    catch (ex) {
                        toast.warning(ex.message)
                    }
                }
            })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Publish Product
    const onPublish = async (product_id) => {
        try {
            if (await Api.publishProduct(product_id)) {
                toast.success("Product Published", {
                    autoClose: 1000
                });
                await getProductList();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Draft Product
    const onDraft = async (product_id) => {
        try {
            if (await Api.draftProduct(product_id)) {
                toast.success("Product Drafted", {
                    autoClose: 1000
                });
                await getProductList();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const exportTemplate = Api.exportProductTemplate();

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
                                        <h4 className="mb-3 mb-md-0 fs-6">Products List</h4>
                                    </div>
                                    <div className="col-md-6 col-12 d-flex align-content-center justify-content-md-end">
                                        <a className="btn btn-success btn-sm" href={exportTemplate}>Download List Template</a>
                                        &emsp;
                                        <label htmlFor="addImageSelect">
                                            <a className="btn btn-success btn-sm">Upload List</a>
                                        </label>
                                        <input type="file" id="addImageSelect" name="ww" className="d-none" accept=".xlsx" onChange={importProduct} multiple={false} ref={fileRef} />
                                        &emsp;
                                        <a className="btn btn-primary ms-2 btn-sm" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/merchant/product/new`}>Add Product</a>
                                        <a className="btn btn-primary ms-2 btn-sm" onClick={() => onPublish("all")} >Publish All</a>
                                    </div>
                                </div>

                                <Tabs selectedIndex={[-1, 0, 1, 2].findIndex((v) => v === product_status)} onSelect={(index) => { setProductStatus([-1, 0, 1, 2][index]), setPaginate({ _page: 1, _pagesize: 20 }) }} >
                                    <TabList className="d-flex border-bottom-0 mb-3 text-nowrap">
                                        <Tab>
                                            <a>All Product</a>
                                        </Tab>

                                        <Tab>
                                            <a>Published</a>
                                        </Tab>

                                        <Tab>
                                            <a>Drafted</a>
                                        </Tab>

                                        <Tab>
                                            <a>Incomplete</a>
                                        </Tab>
                                    </TabList>

                                </Tabs>

                                <div className="row">
                                    <div class="col-sm-10">
                                        <input type="text" className="form-control" value={_search} onChange={ev => setSearch(ev.target.value)} />
                                    </div>
                                    <div class="col-sm-2">
                                        <button type="submit" class="btn btn-primary mb-2" onClick={() => { setPaginate({ _page: 1, _pagesize: 20 }) }}>Search Product</button>
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
                                            <th>Status</th>
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
                                                        <img className="img-table-product" src={Api.getImage(product.data.images[0])} alt="" />
                                                    </td>
                                                    <td className="d-flex align-items-start">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <span className="fw-bold cursor" style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal' }} onClick={() => navigate.push(`/merchant/product/${product.id}`)}>{product.data.name}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {(product.variants || []).length > 1 ?
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
                                                            0: <span className="text-danger">{product_categories[product.data.product_type||0].name}</span>,
                                                            1: <span className="text-warning">{product_categories[product.data.product_type||0].name}</span>,
                                                            2: <span className="text-primary">{product_categories[product.data.product_type||0].name}</span>,
                                                            3: <span className="text-success">{product_categories[product.data.product_type||0].name}</span>
                                                        }[product.data.product_type]}
                                                    </td>

                                                    <td>
                                                        {{
                                                            0: <div className="form-switch">
                                                                <input className="form-check-input me-1" type="checkbox" id="flexSwitchCheckDefault"
                                                                    checked={product.product_status == 0 ? true : false} onChange={() => onDraft(product.id)} />
                                                                <label className="form-check-label text-primary fw-bold" htmlFor="flexSwitchCheckDefault">Published</label>
                                                            </div>,
                                                            1: <div className="form-switch">
                                                                <input className="form-check-input me-1" type="checkbox" id="flexSwitchCheckDefault"
                                                                    checked={product.product_status == 0 ? true : false} onChange={() => onPublish(product.id)} />
                                                                <label className="form-check-label fw-bold" htmlFor="flexSwitchCheckDefault">Drafted</label>
                                                            </div>,
                                                            2: <span className="text-danger fw-bold">Missing Product Variant</span>
                                                        }[product.product_status]}
                                                    </td>

                                                    <td>
                                                        <button
                                                            data-toggle="tooltip"
                                                            title="Edit"
                                                            className="btn btn-sm btn-warning"
                                                            onClick={() => navigate.push(`/merchant/product/${product.id}`)}>
                                                            <i className="fa fa-pencil-square-o me-2" aria-hidden="true"></i>
                                                            View
                                                        </button>
                                                        <button
                                                            data-toggle="tooltip"
                                                            title="Delete"
                                                            className="btn btn-sm btn-danger ms-2"
                                                            onClick={() => deleteProduct(product.id)}>
                                                            <i className="fa fa-trash-o me-2" aria-hidden="true"></i>
                                                            Delete
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
                                    <button type="button" className="btn btn-sm btn-secondary ms-2" onClick={onBulkDelete}>Delete</button>
                                    {publishedCount != 0 && <button type="button" className="btn btn-sm btn-secondary ms-2" onClick={onBulkDraft}>Draft</button>}
                                    {draftedCount != 0 && <button type="button" className="btn btn-sm btn-primary ms-2" onClick={onBulkPublish}>Publish</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </>
}