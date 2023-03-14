import Head from "next/head";
import { Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from '../../../components/Pagination.js';
import { RiShoppingBagFill } from "react-icons/ri";

import numeral from "numeral";
import api from "../../../api/Market";
import Event from "../../../api/Event";
import basepath from '../../../components/basepath';
import Error from 'next/error';

export default function storeDetails({ uuid }) {
    const [store, setStore] = useState({});
    const [products, setProducts] = useState({ results: [] });
    const [quantity, setQuantity] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [variant, setVariant] = useState({});
    const [product, setProduct] = useState({});
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });

    // Check whether the store existed or not
    const [hasNoStore, setHasNoStore] = useState(false);

    useEffect(() => {
        getStore();
    }, [paginate]);

    const getStore = async () => {
        try {
            const store = await api.getStore(uuid);
            setStore(store);
            const res = await api.getStoreProduct(uuid, paginate)
            setProducts(res);
        } catch (ex) {
            toast.warning(ex.message)
            if (ex.status == 404) {
                setHasNoStore(true)
            }
        }
    };

    const addCart = async (variant_details) => {
        try {
            // MOQ Validation
            if (variant_details.data.MOQ) {
                if (variant_details.data.MOQ != -1 && quantity < variant_details.data.MOQ) {
                    toast.warning("Quantity must be higher than Minimum Order Quantity", {
                        autoClose: 1000,
                    });
                    setIsShow(false)
                    return
                }
            }

            await api.addCart({ variant_id: variant_details.id, quantity, operation:1 });

            toast.success("Item Added to Cart", {
                autoClose: 1000,
            });

            Event.emit("update_cart");
            setIsShow(false)
        } catch (ex) {
            toast.warning(ex.message)
        }
    };

    // Page Change Handler
    const onPageChange = async ({ _page, _pagesize }) => {
        try {
            setPaginate({ _page, _pagesize })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const { results, _page, _pagesize } = products;

    if (hasNoStore) {
        return <Error statusCode="404" title="The store did not existed" />
    } else {
        return (
            <>
                <Head>
                    <title>Market Place | DoctorOnCall</title>
                    <meta name="description" content="" />
                </Head>

                <Modal show={isShow} onHide={() => setIsShow(false)} aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header onClick={() => setIsShow(false)}>
                        {product?.variants?.length > 1 ?
                            <Modal.Title>Select Variant and Quantity</Modal.Title>
                            :
                            <Modal.Title>Select Quantity</Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        {product?.variants?.length > 1 ?
                            product?.variants?.map((x, index) => (
                                <div className="row mb-2">
                                    <div className="col-9 mb-2" key={index}>
                                        <div className="align-items-center">
                                            <button
                                                className={`btn variant-box btn-outline-primary me-2 word_break
                                        ${variant.id == x.id ?
                                                        "active"
                                                        : ""
                                                    }`}
                                                onClick={() => {
                                                    setVariant(x)
                                                    if (x.data.MOQ) {
                                                        setQuantity(parseInt(x.data.MOQ))
                                                    } else {
                                                        setQuantity(1)
                                                    }
                                                }}
                                            > <p className="mb-0">
                                                    {
                                                        x.data.name
                                                    }
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-3 mb-2" key={index}>
                                        <div className="align-items-center">
                                            <p className="mb-0 word_break">
                                                RM {x.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <></>}
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <span className="">
                                            Quantity
                                        </span>
                                    </div>
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
                                                setQuantity(quantity + 1);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center my-3">
                            <a
                                onClick={() =>
                                    addCart(variant)
                                }
                                className="btn btn-primary"
                            >
                                Add to Cart
                            </a>
                            <button className="btn btn-secondary ms-2" onClick={() => setIsShow(false)}>
                                Cancel
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="container-md container-fluid mt-5">
                    <div className="mt-3">
                        <div className="head-route">
                            <p><a href={basepath("")}>Home</a>&nbsp;&nbsp;{" > "}&nbsp;&nbsp;<a href="/">Medicines</a>&nbsp;&nbsp;{" > "}&nbsp;&nbsp;<span className="text-capitalize">{store?.store?.store_name ?? "Store Name"}</span></p>
                        </div>
                        <div className="row">
                            {/* <div className="col-md-3 col-12">
                                <div className="view-store border">
                                    <img
                                        className="img-fluid"
                                        src="/img/shop/1.png"
                                        // src={api.getImage(
                                        //     image
                                        // )}
                                        alt=""
                                    />
                                </div>
                            </div> */}

                            <div className="col-md-9 col-12">
                                <div className="product-information row">
                                    <div className="col-12">
                                        <h1 className="my-0 product-name text-md-start text-center">
                                            {store?.store?.store_name ??
                                                "Store Name"}
                                        </h1>
                                    </div>

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
                                        <div className="row">
                                            <div className="col-12 col-sm-3">
                                                <p className="mb-2 text-start fw-bold">
                                                    Total Products
                                                </p>
                                            </div>
                                            <div className="col-12 col-sm-9">
                                                <p className="mb-2 text-start">
                                                    {products.total}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="col-12 mt-5 d-flex align-items-center justify-content-md-start justify-content-center">
                                    <a
                                        type="button"
                                        onClick={() => addCart(variant)}
                                        className="btn btn-outline-primary border-2 px-md-5 px-4 py-2 me-3"
                                    >
                                        Buy Now
                                    </a>
                                    <a
                                        type="button"
                                        onClick={() => addCart(variant)}
                                        className="btn btn-primary px-md-5 px-4 py-2"
                                    >
                                        <i className="fa fa-shopping-cart"></i>{" "}
                                        &nbsp;&nbsp;Add to Cart
                                    </a>
                                </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5">
                                <div className="border-bottom mb-3">
                                    <h5>Products</h5>
                                </div>
                                <div className="row">
                                    {results.map((item, index) => (
                                        <div
                                            className="col-lg-3 col-md-4 col-6 pb-4"
                                            key={index}
                                        >
                                            <div className="product-image-wrapper">
                                                <div className="productinfo">
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
                                                            alt=""
                                                        />
                                                        <p className="">
                                                            {item.data.name}
                                                        </p>
                                                        {/* <span className="variant">
                                                    {
                                                        item.variants[0]
                                                            .data.name
                                                    }
                                                </span> */}
                                                    </a>
                                                    <div className="mt-2">
                                                        {item.discount &&
                                                            <span className="text-decoration-line-through price">
                                                                RM{" "}
                                                                {numeral(item.price).format("0,0.00")}
                                                            </span>
                                                        }
                                                        {" "}
                                                        <span className="price">
                                                            RM{" "}
                                                            {numeral(item.final_price).format("0,0.00")}
                                                        </span>

                                                        <a
                                                            onClick={() => {
                                                                setIsShow(true);
                                                                setVariant(item.variants[0]);
                                                                setQuantity(1);
                                                                setProduct(item)
                                                                if (item.variants[0].data.MOQ) {
                                                                    setQuantity(parseInt(item.variants[0].data.MOQ))
                                                                } else {
                                                                    setQuantity(1)
                                                                }

                                                            }}
                                                            className="btn btn-primary w-100 my-3"
                                                        >
                                                            Add to Cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="col-12">
                                    <Pagination onPageChanged={onPageChange} _page={parseInt(products._page)} _pagesize={parseInt(products._pagesize)} totalItem={products.total} />
                                </div>

                            </div>
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
