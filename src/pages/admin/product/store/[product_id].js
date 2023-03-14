import Head from 'next/head';
import { Card } from 'react-bootstrap';
import Api from '../../../../api/Admin';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Toggle from 'react-toggle'
import Editor from "rich-markdown-editor";
import product_categories from '../../../../../json/product_categories.json';
import Error from 'next/error';

export default function Register({ product_id }) {
    const router = useRouter();
    const productState = {
        details: {
            name: "",
            description: "",
            price: "",
            variants: [],
            attributes: [],
            images: [],
            discount_rate: "",
            discount_amount: "",
            product_type: -1,
        }
    };
    const productVariantState = {
        details: {
            name: "",
            price: "",
            barcode: "",
            shipping: {
                width: "",
                height: "",
                length: "",
                weight: ""
            },
            value: "",
            freeshipping: false
        },
        stock:null
    };
    const [variants, setVariants] = useState([]);
    const [product, setProduct] = useState({ ...productState });
    const [variant, setVariant] = useState({ ...productVariantState });
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [hasVariant, setHasVariant] = useState(false);

    // Check whether the product existed or not
    const [hasNoProduct, setHasNoProduct] = useState(false);

    useEffect(() => {
        getProduct();
    }, []);

    // Get Product
    const getProduct = async () => {
        try {
            const { product } = await Api.getProduct(product_id);
            setProduct(product)
            setVariants(product.variants)

            if (product.variants.length > 1) {
                setHasVariant(true)
            } else {
                setVariant(product.variants[0])
                setHasVariant(false)
            }
        } catch (ex) {
            toast.warning(ex.message)
            if (ex.status == 404) {
                setHasNoProduct(true)
            }
        }
    }

    if (hasNoProduct) {
        return <Error statusCode="404" title="The product did not existed" />
    } else {
        return <>
            <Head>
                <title>Store | DoctorOnCall</title>
                <meta name="description" content="" />
            </Head>

            <div className="container-md px-5 container-fluid container-height">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-3">
                            <div className="card-body">
                                <div className="text-dark">
                                    <i className="fa fa-tasks" style={{ color: '#2196F3' }}></i>
                                    <span className="mini-click-non"> <a href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/merchant/product`}>Product</a> / <a>{product.id}</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="row my-3">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <Card className="border-1">
                                    <Card.Body>
                                        <Card.Title className="mb-0 fw-bold fs-6">Edit Product</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <Card className="border-1">
                                    <Card.Title className="mb-0 p-3 fw-bold fs-6">Product Basic Information</Card.Title>
                                    <Card.Body>
                                        <p className="fw-bold fs-6">Product Image</p>
                                        <div className="row my-2">
                                            {product.data.images.map((image, index) => {
                                                return <div key={index} className="col-lg-3 col-md-3 col-sm-3 col-12 d-flex justify-content-center">
                                                    <div>
                                                        <img src={`${Api.getImage(image)}?${new Date().getTime()}`} alt="" style={{ height: 200, width: 200, objectFit: "contain" }} />
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="name">Product Name<span className="text-danger"> *</span></label>
                                                    <input type="text" className="form-control" placeholder="" value={product.data.name} name="name" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="description">Description<span className="text-danger"> *</span></label>
                                                    <div className="p-2 ps-4 border" style={{ minHeight: 140 }} >
                                                        <Editor
                                                            key={product?.data.description ? 'notLoadedYet' : 'loaded'}
                                                            placeholder="Describe your product.."
                                                            defaultValue={product?.data.description}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                {!hasVariant &&
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="">Price<span className="text-danger"> *</span></label>
                                                        <input type="number" className="form-control" placeholder="RM" name="price"
                                                            value={variant.data.price}
                                                            onWheelCapture={e => {
                                                                e.target.blur()
                                                            }}
                                                            required />
                                                    </div>
                                                }

                                                <div className="mb-3">
                                                    <label className="form-label">Variant</label>
                                                    <p className="fw-bold">
                                                        <Toggle className="align-middle me-2"
                                                            checked={hasVariant}
                                                            name="variant"/>
                                                        <span className="align-middle">Enable Variant</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="name">Product Brand<span className="text-danger"> *</span></label>
                                                    <input type="text" className="form-control" placeholder="" value={product.data.brand} name="brand" required />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="product_type">Type<span className="text-danger"> *</span></label>
                                                    <select name="product_type" className="form-select pro-edt-select form-control-primary" value={product.data.product_type} required>
                                                        <option value={-1}>Select Type</option>
                                                        {product_categories.map(({ name }, i) => (<option value={i}>{name}</option>))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="attributes">Category</label>
                                                    <select name="product_category" className="form-select pro-edt-select form-control-primary" value={product.data.product_category || 0}
                                                        required={[0, 1].includes(product.data.product_type)}>
                                                        {product.data.product_type >= 0 ? product_categories[product.data.product_type].sub.map((cat, i) => (
                                                            <option value={i}>{cat}</option>
                                                        )) : null}
                                                    </select>
                                                </div>

                                                {!hasVariant && <>
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="discount_rate">Discount Rate</label>
                                                        <input type="text" className="form-control" placeholder="%" value={variant.data.discount_rate} name="discount_rate" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="barcode">Product Barcode</label>
                                                        <input type="text" className="form-control" placeholder="" value={variant.data.barcode} name="barcode" />
                                                    </div>
                                                </>}
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <Card className="border-1">
                                    <Card.Body>
                                        <div className="row">
                                            <p className="fw-bold fs-6">Sales Information</p>
                                            {hasVariant ?
                                                <div className="product-status">
                                                    <div className="product-status-wrap">
                                                        <div className="row mb-3">
                                                            <div className="col-md-6 col-12 d-flex align-content-center">
                                                                <h4 className="mb-3 mb-md-0 fs-6">Variants List</h4>
                                                            </div>
                                                        </div>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Price</th>
                                                                    <th>Barcode</th>
                                                                    <th>Specification</th>
                                                                    <th>Width</th>
                                                                    <th>Height</th>
                                                                    <th>Length</th>
                                                                    <th>Weight</th>
                                                                    <th>Setting</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {variants.length > 0 ?
                                                                    variants.map(variant => {
                                                                        return <tr key={variant.id}>
                                                                            <td>{variant.data.name}</td>
                                                                            <td>{variant.data.price}</td>
                                                                            <td>{variant.data.barcode}</td>
                                                                            <td><ul>
                                                                                {
                                                                                    variant.data.specification ? variant.data.specification.map((specification, i) => {
                                                                                        return (
                                                                                            <li key={i}>{specification.specificationName} : {specification.specificationValue}</li>
                                                                                        )
                                                                                    }) : <>-</>}
                                                                            </ul></td>
                                                                            <td>{variant.data.shipping.width}</td>
                                                                            <td>{variant.data.shipping.height}</td>
                                                                            <td>{variant.data.shipping.length}</td>
                                                                            <td>{variant.data.shipping.weight}</td>
                                                                            <td>
                                                                            </td>
                                                                        </tr>
                                                                    }) : <></>}
                                                            </tbody>
                                                        </table>

                                                        {isAdding && <h4>Add New Product Variant</h4>}
                                                        {isEditing && <h4>Update Product Variant</h4>}
                                                        {(isAdding || isEditing) && <>
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="">Variant Name</label>
                                                                        <input type="text" className="form-control" value={variant.data.name} name="name" required />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="">Variant Price</label>
                                                                        <input type="number" className="form-control" name="price"
                                                                            value={variant.data.price}
                                                                            onWheelCapture={e => {
                                                                                e.target.blur()
                                                                            }}
                                                                            required />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="">Variant Barcode (Optional)</label>
                                                                        <input type="text" className="form-control" value={variant.data.barcode} name="barcode"/>
                                                                    </div>


                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="discount_rate">Discount Rate (%)</label>
                                                                        <input type="text" className="form-control" value={variant.data.discount_rate} name="discount_rate" />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="discount_amount">Discount Amount (RM)</label>
                                                                        <input type="text" className="form-control" value={variant.data.discount_amount} name="discount_amount" />
                                                                    </div>

                                                                </div>
                                                                <div className="col-12 mb-3">
                                                                    <div className=" border-bottom border-light"></div>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="form-label" className="fw-bold mb-2">Shipping</label>
                                                                {product.data.product_type != 3 &&
                                                                    <>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Weight<span className="text-danger"> *</span></label>
                                                                                <input type="number" className="form-control" name="weight" placeholder="kg"
                                                                                    value={variant.data.shipping.weight}
                                                                                    onWheelCapture={e => {
                                                                                        e.target.blur()
                                                                                    }}
                                                                                    required />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Length<span className="text-danger"> *</span></label>
                                                                                <input type="number" className="form-control" name="length" placeholder="cm"
                                                                                    value={variant.data.shipping.length}
                                                                                    onWheelCapture={e => {
                                                                                        e.target.blur()
                                                                                    }}
                                                                                    required />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Width<span className="text-danger"> *</span></label>
                                                                                <input type="number" className="form-control" name="width" placeholder="cm"
                                                                                    value={variant.data.shipping.width}
                                                                                    onWheelCapture={e => {
                                                                                        e.target.blur()
                                                                                    }}
                                                                                    required />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Height<span className="text-danger"> *</span></label>
                                                                                <input type="number" className="form-control" name="height" placeholder="cm"
                                                                                    value={variant.data.shipping.height}
                                                                                    onWheelCapture={e => {
                                                                                        e.target.blur()
                                                                                    }}
                                                                                    required />
                                                                            </div>
                                                                        </div>
                                                                    </>}
                                                                <label className="form-label" className="fw-bold my-2">Options</label>
                                                                
                                                                
                                                                

                                                                {product.data.product_type == 3 && <>
                                                                    <div className="col-12 mb-3">
                                                                        <div className=" border-bottom border-light"></div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <label className="form-label" className="fw-bold mb-2">Voucher</label>
                                                                        <div className="col-12">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Voucher Value</label>
                                                                                <input type="number" className="form-control" name="value"
                                                                                    value={variant.data.value}
                                                                                    onWheelCapture={e => {
                                                                                        e.target.blur()
                                                                                    }}
                                                                                    required />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>}
                                                            </div>

                                                            <div className="row mb-3">
                                                                <label className="fw-bold mb-2">
                                                                    <Toggle className="align-middle me-2"
                                                                        checked={variant?.stock}
                                                                        name="isStock"/>
                                                                    <span className="align-middle">Stock</span>
                                                                </label>
                                                                {variant?.stock && <>
                                                                    <div className="col-12 mb-3">
                                                                        <div className=" border-bottom border-light"></div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Stock Quantity</label>
                                                                                <input type="number" className="form-control" name="stock"
                                                                                    value={variant?.stock || 0}
                                                                                    required />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>}
                                                            </div>

                                                            <div className="row mb-3">
                                                                <label className="fw-bold mb-2">
                                                                    <Toggle className="align-middle me-2"
                                                                        checked={variant?.data.isMOQ}
                                                                        name="isMOQ" />
                                                                    <span className="align-middle">Minimum Order Quantity</span>
                                                                </label>
                                                                {variant?.data.isMOQ && <>
                                                                    <div className="col-12 mb-3">
                                                                        <div className=" border-bottom border-light"></div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Minimum Quantity</label>
                                                                                <input type="number" className="form-control" name="MOQ"
                                                                                    value={variant?.data.MOQ}
                                                                                    onWheelCapture={e => {
                                                                                        e.target.blur()
                                                                                    }}
                                                                                    required />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>}
                                                            </div>

                                                            <div className="row mb-3">
                                                                <label className="fw-bold mb-2">
                                                                    <Toggle className="align-middle me-2"
                                                                        checked={variant?.data.isWholesale}
                                                                        name="wholesale" />
                                                                    <span className="align-middle">Bulk Pricing</span>
                                                                </label>
                                                                {variant?.data.isWholesale && variant.data.bulk_pricing &&
                                                                    variant.data.bulk_pricing.map((bulk_pricing, i) => {
                                                                        return (<React.Fragment key={i}>
                                                                            <div className="col-md-5 col-12">
                                                                                <div className="mb-3">
                                                                                    <label className="form-label" htmlFor="">Min Quantity</label>
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="number"
                                                                                        name="min_quantity"
                                                                                        value={bulk_pricing.min_quantity}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-5 col-12">
                                                                                <div className="mb-3">
                                                                                    <label className="form-label" htmlFor="">Price</label>
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="number"
                                                                                        name="price"
                                                                                        value={bulk_pricing.price}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-2 col-12 flex-row-reverse d-flex align-items-end mb-3">
                                                                            </div>
                                                                            
                                                                        </React.Fragment>);
                                                                    })}
                                                            </div>

                                                            <div className="row mb-3">
                                                                <label className="fw-bold mb-2">
                                                                    <Toggle className="align-middle me-2"
                                                                        checked={variant.data.isSpec}
                                                                        name="spec" />
                                                                    <span className="align-middle">Product Specification</span>
                                                                </label>
                                                                {variant.data.isSpec && variant.data.specification.map((x, i) => {
                                                                    return (<React.Fragment key={i}>
                                                                        <div className="col-md-5 col-12">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Name</label>
                                                                                <input
                                                                                    className="form-control"
                                                                                    type="text"
                                                                                    name="specificationName"
                                                                                    value={x.specificationName}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-5 col-12">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor="">Value</label>
                                                                                <input
                                                                                    className="form-control"
                                                                                    type="text"
                                                                                    name="specificationValue"
                                                                                    value={x.specificationValue}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-2 col-12 flex-row-reverse d-flex align-items-end mb-3">
                                                                        </div>
                                                                        
                                                                    </React.Fragment>);
                                                                })}
                                                            </div>
                                                        </>}

                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    <div className="row mb-3">
                                                        <p className="fw-bold fs-6">Shipping</p>
                                                        {product.data.product_type != 3 && <>

                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="">Weight<span className="text-danger"> *</span></label>
                                                                    <input type="number" className="form-control" placeholder="kg" name="weight"
                                                                        value={variant.data.shipping.weight}
                                                                        required />
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="">Length<span className="text-danger"> *</span></label>
                                                                    <input type="number" className="form-control" placeholder="cm" name="length"
                                                                        value={variant.data.shipping.length}
                                                                        required />
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="">Width<span className="text-danger"> *</span></label>
                                                                    <input type="number" className="form-control" placeholder="cm" name="width"
                                                                        value={variant.data.shipping.width}
                                                                        required />
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="">Height<span className="text-danger"> *</span></label>
                                                                    <input type="number" className="form-control" placeholder="cm" name="height"
                                                                        value={variant.data.shipping.height}
                                                                        required />
                                                                </div>
                                                            </div>
                                                        </>
                                                        }
                                                        <label className="form-label" className="fw-bold my-2">Options</label>
                                                    

                                                        {product.data.product_type == 3 && <>
                                                            <div className="col-12 mb-3">
                                                                <div className=" border-bottom border-light"></div>
                                                            </div>
                                                            <div className="row">
                                                                <label className="form-label" className="fw-bold mb-2">Voucher</label>
                                                                <div className="col-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="">Voucher Value</label>
                                                                        <input type="number" className="form-control" name="value"
                                                                            value={variant.data.value}
                                                                            required />
                                                                    </div>
                                                                </div>
                                                            </div></>}
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="fw-bold mb-2">
                                                            <Toggle className="align-middle me-2"
                                                                checked={variant?.stock}
                                                                name="isStock" />
                                                            <span className="align-middle">Stock</span>
                                                        </label>
                                                        {variant?.stock && <>
                                                            <div className="col-12 mb-3">
                                                                <div className=" border-bottom border-light"></div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="">Stock Quantity</label>
                                                                        <input type="number" className="form-control" name="stock"
                                                                            value={variant?.stock || 0}
                                                                            required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>}
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="fw-bold mb-2">
                                                            <Toggle className="align-middle me-2"
                                                                checked={variant?.data.isMOQ}
                                                                name="isMOQ"/>
                                                            <span className="align-middle">Minimum Order Quantity</span>
                                                        </label>
                                                        {variant?.data.isMOQ && <>
                                                            <div className="col-12 mb-3">
                                                                <div className=" border-bottom border-light"></div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="">Minimum Quantity</label>
                                                                        <input type="number" className="form-control" name="MOQ"
                                                                            value={variant?.data.MOQ}
                                                                            required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>}
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="fw-bold mb-2">
                                                            <Toggle className="align-middle me-2"
                                                                checked={variant?.data.isWholesale}
                                                                name="wholesale" />
                                                            <span className="align-middle">Bulk Pricing</span>
                                                        </label>
                                                        {variant?.data.isWholesale &&
                                                            variant?.data?.bulk_pricing?.map((bulk_pricing, i) => {
                                                                return (<React.Fragment key={i}>
                                                                    <div className="col-md-5 col-12">
                                                                        <div className="mb-3">
                                                                            <label className="form-label" htmlFor="">Min Quantity</label>
                                                                            <input
                                                                                className="form-control"
                                                                                type="number"
                                                                                name="min_quantity"
                                                                                value={bulk_pricing.min_quantity}
                                                                                onBlur={e => ValidateMinQuantity(e, i)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-5 col-12">
                                                                        <div className="mb-3">
                                                                            <label className="form-label" htmlFor="">Price</label>
                                                                            <input
                                                                                className="form-control"
                                                                                type="number"
                                                                                name="price"
                                                                                value={bulk_pricing.price}
                                                                                onBlur={e => ValidateBulkPrice(e, i)}
                                                                            />
                                                                        </div>
                                                                    </div>                                                                    
                                                                </React.Fragment>);
                                                            })}
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="fw-bold mb-2">
                                                            <Toggle className="align-middle me-2"
                                                                checked={variant?.data.isSpec}
                                                                name="spec" />
                                                            <span className="align-middle">Product Specification</span>
                                                        </label>
                                                        {variant.data.isSpec &&
                                                            variant?.data?.specification?.map((x, i) => {
                                                                return (<React.Fragment key={i}>
                                                                    <div className="col-md-5 col-12">
                                                                        <div className="mb-3">
                                                                            <label className="form-label" htmlFor="">Name</label>
                                                                            <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                name="specificationName"
                                                                                value={x.specificationName}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-5 col-12">
                                                                        <div className="mb-3">
                                                                            <label className="form-label" htmlFor="">Value</label>
                                                                            <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                name="specificationValue"
                                                                                value={x.specificationValue}
                                                                            />
                                                                        </div>
                                                                    </div>                                                                    
                                                                </React.Fragment>);
                                                            })}
                                                    </div>
                                                </>}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <div className="row mb-3 d-flex " id="stickyCard">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <Card className="border-1">
                                    <Card.Body>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="text-end">
                                                    {/* {(product.product_status == 0) && <button type="button" className="btn btn-warning" onClick={onDraft}>Draft Product</button>}
                                                    {(product.product_status == 1) && <button type="button" className="btn btn-success" onClick={onPublish}>Publish Product</button>}
                                                    <button type="button" className="btn btn-primary ms-2" onClick={onSubmit}>Save Product</button> */}
                                                    {/*<button type="button" className="btn btn-danger">Discard
														</button>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    }
}

export async function getServerSideProps(context) {
    const { product_id } = context.params;

    return {
        props: { product_id }, // will be passed to the page component as props
    }
}