import Head from "next/head";
import dynamic from 'next/dynamic'
import Carousel from "react-bootstrap/Carousel";
import { Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import numeral from "numeral";
import api from "../../../api/Market";
import Event from "../../../api/Event";
import basepath, { navigate } from '../../../components/basepath';
import Error from 'next/error';

import ProductType from '../../../../json/product_categories.json';

import AddCart from '../../../components/market/addcart';

import Marked from 'marked';

export default function productdetails({ uuid }) {
    const [products, setProducts] = useState({ results: [] });
    const [product, setProduct] = useState({ variants: [], data:{ contents:{en:[]}, images:[] } });

    const [related, setRelated] = useState(null);

    const [variant, setVariant] = useState({});
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [bulkPrice, setBulkPrice] = useState("0.00");

    // Check whether the product existed or not
    const [hasNoProduct, setHasNoProduct] = useState(false);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const { product } = await api.getCatalogueProduct(uuid);

            setProduct(product);
            setVariant(product.variants[0]);
            setItem(product.variants[0].inventories[0]);

            // TO FIX LATER

            // if (product.variants[0].data.bulk_pricing) {
            //     setBulkPrice(product.variants[0].data.price)
            // }

            // if (product.variants[0].data.MOQ) {
            //     setQuantity(parseInt(product.variants[0].data.MOQ))
            // }
        } catch (ex) {
            toast.warning(ex.message)
            if (ex.status == 404)
                setHasNoProduct(true)
        }
    };

    const addCart = async () => {
        if (!variant) {
            toast.warning("No Variant selected", {
                autoClose: 1000,
            });
            return;
        }
        let inventory_id = item.id;
        //let quantity = 1;

        // TO FIX LATER

        // // MOQ Validation
        // if (variant.data.MOQ) {
        //     if (variant.data.MOQ != -1 && quantity < variant.data.MOQ) {
        //         toast.warning("Quantity must be higher than Minimum Order Quantity", {
        //             autoClose: 1000,
        //         });
        //         return
        //     }
        // }

        // // Stock Validation
        // if (variant.stock) {
        //     if (variant.stock != -1 && quantity > variant.stock) {
        //         toast.warning("Quantity must be lower than items left", {
        //             autoClose: 1000,
        //         });
        //         return
        //     }
        // }

        try {
            await api.addCart({ inventory_id, quantity });
            toast.success("Item Added to Cart", {
                autoClose: 1000,
            });

            Event.emit("update_cart");
        } catch (ex) {
            toast.warning(ex.message);
        }
    };

    const product_type = product?.data?.product_type ? parseInt(product?.data?.product_type) : 0;
    const product_category = product?.data?.product_category ? parseInt(product?.data?.product_category) : 0;

    const { data:{contents} } = product;

    if (hasNoProduct) {
        return <Error statusCode="404" title="The product did not existed" />
    } else {
        return (
            <>
                <Head>
                    <title>Market Place | DoctorOnCall</title>
                    <meta name="description" content="" />
                </Head>

                <AddCart {...{ product: related, setProduct: setRelated }} />

                {/* <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><a href={`${process.env.NEXT_PUBLIC_BASEPATH||""}/marketplace`}> Home</a></li>
                                    <li>/</li>
                                    <li><a className="active"> Product Details</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

                <div className="promo-bar d-md-block d-none">
                    <span className="text-white fw-semi">Get Free Shipping for Order Above RM 500</span>
                </div>
                <div className="container-md container-fluid mt-5">
                    <div className="mt-3">
                        <div className="head-route">
                            <p>
                                <a href={basepath("")}>Home</a>
                                &nbsp;&nbsp;{" / "}&nbsp;&nbsp;
                                {ProductType[product_type].name}
                                { product_category ?

                                    <span>
                                        &nbsp;&nbsp;{"/"}&nbsp;&nbsp;
                                        <a href={basepath(`/marketplace/categories/product_category}`)}>{product_category}</a>
                                    </span>

                                    : null
                                }
                                &nbsp;&nbsp;{"/"}&nbsp;&nbsp;
                                <span className="text-capitalize">{product?.data?.name ?? "Product Name"}</span></p>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <div className="view-product border">
                                    <Carousel>
                                        {product?.data?.images.length > 0 ?
                                            product.data.images.map(
                                                (image, index) => {
                                                    return (
                                                        <Carousel.Item key={index}>
                                                            <div>
                                                                {product.no_stock && <h4 className="position-absolute"
                                                                    style={{
                                                                        top: "50%",
                                                                        left: "50%",
                                                                        transform: "translate(-50%, -50%)",
                                                                        backgroundColor: "black",
                                                                        padding: 20,
                                                                        borderRadius: 4,
                                                                        color: "white"
                                                                    }}>Out of Stock</h4>}
                                                                <img
                                                                    className="img-fluid gallery-img"
                                                                    src={api.getImage(image)}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </Carousel.Item>
                                                    );
                                                }
                                            )
                                            :
                                            <img
                                                className="img-fluid gallery-img"
                                                src={basepath("/img/shop/1.png")}
                                                alt=""
                                            />
                                        }
                                    </Carousel>
                                    {/* <h3>ZOOM</h3> */}
                                    <div className="m-2 mb-4">
                                        <div className="row">
                                            {product?.data?.images.length > 0 ?
                                                product.data.images.map(
                                                    (image, index) => (
                                                        <div key={index} className="col-3">
                                                            <div className="border rounded-2">
                                                                <img
                                                                    className="img-fluid mini-gallery"
                                                                    src={api.getImage(image)}
                                                                    alt="product"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                :
                                                <div className="col-3">
                                                    <div className="border rounded-2">
                                                        <img
                                                            className="img-fluid mini-gallery"
                                                            src={basepath("/img/shop/1.png")}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8 col-12">
                                <div className="product-information row">
                                    <div className="col-12 d-flex justify-content-between align-items-center">
                                        <h1 className="my-0 product-name text-md-start text-center">
                                            {product?.data?.name ?? "Product Name"}
                                        </h1>
                                        <i className="fa fa-share-alt"></i>
                                    </div>

                                    <div className="col-12">
                                        {/* <p className="text-start">
                                            Sold By <a className="text-primary" href={basepath(`/marketplace/store/${product?.store_uuid}`)}>{product?.store_name || ""}</a>
                                        </p> */}
                                        {/*
                                            product.data?.product_type == 0 &&
                                            <p className="text-start">
                                                <span className="med-badge">
                                                    <svg viewBox="0 0 384 512">
                                                        <path d="M301.26 352l78.06-78.06c6.25-6.25 6.25-16.38 0-22.63l-22.63-22.63c-6.25-6.25-16.38-6.25-22.63 0L256 306.74l-83.96-83.96C219.31 216.8 256 176.89 256 128c0-53.02-42.98-96-96-96H16C7.16 32 0 39.16 0 48v256c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-80h18.75l128 128-78.06 78.06c-6.25 6.25-6.25 16.38 0 22.63l22.63 22.63c6.25 6.25 16.38 6.25 22.63 0L256 397.25l78.06 78.06c6.25 6.25 16.38 6.25 22.63 0l22.63-22.63c6.25-6.25 6.25-16.38 0-22.63L301.26 352zM64 96h96c17.64 0 32 14.36 32 32s-14.36 32-32 32H64V96z"></path>
                                                    </svg>
                                                </span>
                                                <a href="#" className="text-primary"> Prescription Required</a>
                                            </p>
                                        */}
                                    </div>
                                    <div className="col-12 pb-4 text-start">
                                        {variant.discount ? (
                                            <span>
                                                <span className="text-decoration-line-through text-muted">
                                                    {!variant.no_stock ? `RM ${numeral(variant?.price).format("0,0.00")}` : "Out of Stock"}
                                                </span>&nbsp;&nbsp;
                                                <span className="product-price">
                                                    {!variant.no_stock ? `RM ${numeral(variant?.final_price).format("0,0.00")}` : "Out of Stock"}
                                                </span>
                                            </span>
                                        ) : (
                                            <span>
                                                <span className="product-price">
                                                    {!variant.no_stock ? `RM ${numeral(item?.price).format("0,0.00")}` : "Out of Stock"}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                    {/* <div className="col-6 pb-3 d-flex justify-content-md-end align-items-center">
                                        <span className="pt-3 text-muted">Need <a className="text-decoration-underline text-primary" href="#">financing</a>?</span>
                                    </div> */}

                                    {/*<div className="col-12 mb-3">
                                    <p className="mb-2"><b>Voucher</b></p>
                                    <div className="d-flex align-items-center">
                                        <div className="border-danger variant-box me-3">
                                            <p className="mb-0 text-danger">Test</p>
                                        </div>
                                        <div className="border-danger variant-box">
                                            <p className="mb-0 text-danger">Test</p>
                                        </div>
                                    </div>
                                </div>*/}

                                    <div className="col-12 pt-4 border-top">

                                        {/* <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 col-sm-2">
                                                    <p className=" text-start text-79">
                                                        Shipping
                                                    </p>
                                                </div>
                                                <div className="col-12 col-sm-10">
                                                    <p className=" text-start">
                                                        Cold chain item (Express Delivery Only)
                                                    </p>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 col-sm-2">
                                                    <p className=" text-start text-79">
                                                        Policy
                                                    </p>
                                                </div>
                                                <div className="col-12 col-sm-10">
                                                    <a href="/marketplace/doc/return" target="_blank">
                                                        <p className="text-start text-primary">
                                                            Return/Cancellation Policy
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {variant?.data?.MOQ &&
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12 col-sm-2">
                                                        <p className=" text-start text-79">
                                                            Minimum Order
                                                        </p>
                                                    </div>
                                                    <div className="col-12 col-sm-10">
                                                        <p className=" text-start">
                                                            {variant.data.MOQ}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {/* <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 col-sm-2">
                                                    <p className=" text-start text-79">
                                                        Processing
                                                    </p>
                                                </div>
                                                <div className="col-12 col-sm-10">
                                                    <p className=" text-start">
                                                        1-2 business days
                                                    </p>
                                                </div>
                                            </div>
                                        </div> */}

                                        {variant?.data?.bulk_pricing &&
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12 col-sm-2">
                                                        <p className=" text-start text-79">
                                                            Wholesale
                                                        </p>
                                                    </div>
                                                    <div className="col-12 col-sm-10">
                                                        <p className=" text-start">
                                                            {variant?.data?.bulk_pricing?.map((x, i) => {
                                                                if (i != (variant.data.bulk_pricing.length - 1)) {
                                                                    return `Buy (${x.min_quantity} - ${variant.data.bulk_pricing[i + 1]["min_quantity"] - 1}) RM${x.price}, `
                                                                } else {
                                                                    return `Buy (>=${x.min_quantity}) RM${x.price}  `
                                                                }
                                                            }
                                                            )}
                                                            <a className="text-primary cursor" onClick={() => setIsShow(true)}>View More</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {product?.variants.length >= 1 &&
                                            <div className="col-12 mb-2">
                                                <div className="row">
                                                    <div className="col-12 col-sm-2 d-flex align-items-center">
                                                        <p className="mb-md-0  text-start text-79">
                                                            Variants
                                                        </p>
                                                    </div>
                                                    <div className="col-12 col-sm-10">
                                                        <div className="d-flex align-items-center">
                                                            {product.variants.map(
                                                                (item, i) => (

                                                                    <button
                                                                        key={i}
                                                                        className={`btn variant-box me-3 
                                                                        ${item.no_stock == 0 ? `btn-outline-secondary` : `btn-outline-primary`} 
                                                                        ${variant.id == item.id ?
                                                                                "active"
                                                                                : ""
                                                                            }`}
                                                                        disabled={item.no_stock}
                                                                        onClick={() => {
                                                                            if (item.data.bulk_pricing) {
                                                                                setVariant(item)
                                                                                let price = item.data.price
                                                                                item.data.bulk_pricing.map((x, i) => {
                                                                                    if (quantity >= x.min_quantity) {
                                                                                        price = x.price
                                                                                    }
                                                                                })
                                                                                setItem(item.inventories[0])
                                                                                setBulkPrice(price)
                                                                            } else {
                                                                                setVariant(
                                                                                    item
                                                                                )
                                                                                setItem(item.inventories[0])
                                                                            }
                                                                            if (item.data.MOQ) {
                                                                                setQuantity(parseInt(item.data.MOQ))
                                                                            } else {
                                                                                setQuantity(1)
                                                                            }
                                                                        }
                                                                        }
                                                                    >
                                                                        <p className="variant-button-text mb-0">
                                                                            {
                                                                                item
                                                                                    .data
                                                                                    .name
                                                                            }
                                                                        </p>
                                                                    </button>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        <div className="col-12">
                                            <div className="row border-bottom pb-5 mb-5">
                                                <div className="col-12 col-sm-2 d-flex align-items-center">
                                                    <p className="mb-md-0 text-start text-79">
                                                        Quantity
                                                    </p>
                                                </div>
                                                <div className="col-12 col-sm-10">
                                                    <div className="d-flex">
                                                        <button
                                                            className="bg-white border rounded-start border-end-0 p-2 px-3 fw-bold"
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                if (variant.data.MOQ) {
                                                                    if (quantity > variant.data.MOQ) {
                                                                        setQuantity(
                                                                            quantity - 1
                                                                        );
                                                                    }
                                                                } else {
                                                                    if (quantity > 1) {
                                                                        setQuantity(
                                                                            quantity - 1
                                                                        );
                                                                    }
                                                                }
                                                                if (variant?.data?.bulk_pricing) {
                                                                    let price = variant.data.price
                                                                    variant.data.bulk_pricing.map((x, i) => {
                                                                        if ((quantity - 1) >= x.min_quantity) {
                                                                            price = x.price
                                                                        }
                                                                    })
                                                                    setBulkPrice(price)
                                                                }
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                        <input type="number" value={quantity}
                                                            className="form-control border text-center no-arrow" style={{ height: 42, width: 86 }}
                                                            onChange={(e) => setQuantity(e.target.valueAsNumber)} />
                                                        <button
                                                            className="bg-white border rounded-end border-start-0 p-2 px-3 fw-bold"
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                if (variant?.data?.bulk_pricing) {
                                                                    setQuantity(
                                                                        quantity + 1
                                                                    );
                                                                    let price = variant.data.price
                                                                    variant.data.bulk_pricing.map((x, i) => {
                                                                        if ((quantity + 1) >= x.min_quantity) {
                                                                            price = x.price
                                                                        }
                                                                    })
                                                                    setBulkPrice(price)
                                                                } else {
                                                                    setQuantity(
                                                                        quantity + 1
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-5">
                                                <div className="col-12">
                                                    <h4 className="mb-4 fw-bold">
                                                        Available from these Sellers
                                                    </h4>
                                                    <div className="d-flex align-items-center overflow-auto pb-4" style={{ width: 800 }}>
                                                        {variant?.inventories?.map((inventory, i) => (
                                                            <div className="seller-card me-md-3 mb-3 mb-md-0">
                                                                <div className="card bg-light">
                                                                    <div className="card-body">
                                                                        <div className="row mb-4">
                                                                            <div className="col-4">
                                                                                <input type="checkbox" className="_checkbox" id={inventory.id} checked={inventory.id == item.id} onClick={() => setItem(inventory)}/>
                                                                                <label for={inventory.id} className="_label">
                                                                                    <div id="tick_mark"></div>
                                                                                </label>
                                                                            </div>
                                                                            <div className="col-8 ps-0">
                                                                                <h4 className="mb-2 fw-bold">RM {inventory.price}</h4>
                                                                                <p className="mb-0" style={{ fontSize: 9 }}><img className="me-1" width="14" src="/img/shop/lorry.png" alt="" /> Get by 12-14 Nov</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-4">
                                                                                <img src="/img/shop/1.png" width="60" className="rounded-3 img-fluid" alt="" />
                                                                            </div>
                                                                            <div className="col-8 ps-0">
                                                                                <p className="mb-2">{inventory.store_name}</p>
                                                                                <button className="btn btn-sm btn-outline-primary">Premium Seller</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 mt-5 d-flex align-items-center justify-content-md-start justify-content-center">
                                                <button
                                                    onClick={() => { addCart(variant); navigate.push("/marketplace/cart") }}
                                                    className={`btn ${variant.no_stock ? `btn-outline-secondary` : `btn-outline-primary`} border-2 px-4 py-2 me-3 d-flex justify-content-center align-items-center`}
                                                    style={{ width: 200, height: 50 }}
                                                    disabled={variant.no_stock}
                                                >
                                                    Buy Now
                                                </button>
                                                <button
                                                    onClick={() => addCart(variant)}
                                                    className={`btn ${variant.no_stock ? `btn-secondary` : `btn-primary`} px-4 py-2 d-flex justify-content-center align-items-center`}
                                                    style={{ width: 200, height: 50 }}
                                                    disabled={variant.no_stock}
                                                >
                                                    <i className="fa fa-shopping-cart"></i>{" "}
                                                    &nbsp;&nbsp;Add to Cart
                                                </button>
                                            </div>
                                            <div className="col-12 mb-3 mt-5 border-top pt-3">
                                                <div className="row">
                                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                                        <img src={basepath("/img/icon/shield.svg")} className="img-fluid me-3" alt="" />
                                                        <span>Authentic</span>
                                                    </div>
                                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                                        <img src={basepath("/img/icon/lorry.svg")} className="img-fluid me-3" alt="" />
                                                        <span>Free Delivery</span>
                                                    </div>
                                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                                        <img src={basepath("/img/icon/clock.svg")} className="img-fluid me-3" alt="" />
                                                        <span>Express Delivery</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="row mb-5">
                            <div className="col-12">
                                <p className="fw-bold mt-4">
                                    Similar Products
                                </p>
                                <div className="d-flex align-items-center">
                                    <div className="m-2" style={{ width: 170 }}>
                                        <div
                                            className="border shadow-sm mb-4"
                                            style={{ borderRadius: 8 }}
                                        >
                                            {product?.data?.images && (
                                                <img
                                                    className="img-fluid"
                                                    style={{ borderRadius: 8 }}
                                                    src={api.getImage(
                                                        product.data.images[0]
                                                    )}
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                        <p>{product?.data?.name}</p>
                                        <div className="mt-4">
                                            <p className="fw-bold mb-1">
                                                {" "}
                                                RM{" "}
                                                {variant?.data?.price ??
                                                    product?.data?.price}
                                            </p>
                                            <button className="btn btn-outline-danger w-100">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="row my-5">
                            <div className="col-12">
                                <h5 className="mb-4 fw-bold">View Store</h5>
                                <div className="d-flex justify-content-start align-items-center">
                                    <img src={basepath("/img/shop/1.png")} className="img-fluid rounded-circle me-4" style={{ width: 60 }} alt="" />
                                    <div>
                                        <p className="fw-bold mb-1">{product?.store_name || "Store Name"}</p>
                                        <p className="mb-0"><i className="fa fa-map-marker"></i> State</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="row my-5">
                            <div className="col-12">
                                <h5 className="mb-4 fw-bold">From The Same Store</h5>
                                <div className="row">
                                    {products.results.map((item, i) =>
                                        <div key={i} className="col-md-3 col-6 pb-4">
                                            <div className="product-image-wrapper">
                                                <div className="productinfo position-relative">
                                                    <a
                                                        className="mb-2"
                                                        href={basepath(`/marketplace/product/${item.uuid}`)}
                                                    >
                                                        <img
                                                            className="img-fluid mb-4"
                                                            style={{
                                                                height: 100,
                                                                objectFit: "contain",
                                                            }}
                                                            src={api.getImage(item.data.images[0])}
                                                            src={basepath("/img/shop/1.png")}
                                                            alt=""
                                                        />
                                                        <p className="fw-semi mb-1 position-relative">

                                                            {item.data.name}&nbsp;
                                                            <p className="variant mt-0 mb-2">
                                                                {
                                                                    item.variants[0]
                                                                        .data.name
                                                                }
                                                            </p>
                                                        </p>
                                                    </a>
                                                    <div className="">
                                                        <span className="price">
                                                            {numeral(item.final_price).format("0,0.00")}
                                                        </span>
                                                        {" "}
                                                        {item.discount &&
                                                            <span className="text-decoration-line-through price text-muted fw-normal" style={{ fontSize: 10 }}>
                                                                {numeral(item.price).format("0,0.00")}
                                                            </span>
                                                        }

                                                        <a
                                                            onClick={() => setRelated(item)}
                                                            className="btn btn-primary w-100 my-3"
                                                        >
                                                            Add to Cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div> */}

                        <div className="category-tab mt-3 row">
                            {/* <div className="col-12">
                                <ul className="nav nav-tabs">
                                    { contents["en"].map(({label}, index)=>
                                        <li className={index == 0 ? "active" : ""}>
                                            <a href={`#${label.replace(/[^A-Z0-9]/gi,"_")}`} data-toggle="tab">
                                                {label}
                                            </a>
                                        </li>
                                    )}

                                </ul>
                            </div>

                            <div className="tab-content">
                                { contents["en"].map(({label, text}, index)=>
                                    <div className={`tab-pane ${index == 0 && "active"}`} id={label.replace(/[^A-Z0-9]/gi,"_")}>
                                        <div className="col-12">
                                            <div className="p-2" style={{ minHeight: 140 }} dangerouslySetInnerHTML={{ __html: Marked.parse(text || "No product description available") }} />
                                        </div>
                                    </div>
                                )}

                            </div> */}

                                { contents["en"].map(({label, text}, index)=>
                                    <>
                                        <h2>{label}</h2>
                                        <div className="p-2" dangerouslySetInnerHTML={{ __html: Marked.parse(text || "No product description available") }} />
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export async function getServerSideProps(context) {
    const { uuid } = context.params;
    return {
        props: { uuid }, // will be passed to the page component as props
    };
}
