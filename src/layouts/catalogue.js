import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from '../components/Pagination.js';
import qs from 'query-string';
import api from "../api/Market";
import numeral from "numeral";
import React from "react";
import basepath from "../components/basepath.js";

import Categories from '../../json/product_categories.json'

import AddCart from '../components/market/addcart';

import ReactSlider from "react-slider";

export default function marketplace({ search, page }) {
    const [products, setProducts] = useState({ results: [], _page: page || 1, facets: {} });
    const [product, setProduct] = useState(null);
    const [paginate, setPaginate] = useState({ _page: page || 1, _pagesize: 20 });

    const [filters, setFilters] = useState([]);

    useEffect(() => {
        getProducts();
    }, [paginate, filters]);

    const getProducts = async () => {
        try {

            let res = await api.searchCatalogue({ _search: search, ...paginate, filters });

            setProducts(res);
        } catch (ex) {
            toast.warning(ex.message)
        }
    };

    // Page Change Handler
    const onPageChange = async ({ _page, _pagesize }) => {
        try {
            const query = qs.parse(window.location.search.replace("?", ""));
            query.page = _page;
            window.location.search = qs.stringify(query);

            //setPaginate({ _page, _pagesize })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // filters
    const onCheckedFilters = async (event, key, val) => {
        const checked = event.target.checked;

        if (checked) {
            filters.push(`${key}:"${val}"`)
        } else {
            let index = filters.findIndex((v) => v == `${key}:"${val}"`);
            if (index >= 0)
                filters.splice(index, 1);
        }

        setFilters([...filters]);
    }

    const { results, facets } = products;

    return (
        <>
            <AddCart {...{ product, setProduct }} />

            <div className="promo-bar d-md-block d-none">
                <span className="text-white fw-semi">Get Free Shipping for Order Above RM 500</span>
            </div>
            <div className="container-xl container-fluid mt-5 pt-3 position-relative">
                <div className="row">
                    <div className="col-lg-2 col-md-4 col-12 mb-5 mb-md-0">
                        <div className="left-sidebar">
                            <div className="accordion accordion-flush" id="main">

                                {/* <div className="accordion-item">
                                    <h2 className="accordion-header" id="categories-heading">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#categories" aria-expanded="false" aria-controls="categories">
                                            <span style={{ fontWeight: '600', fontSize: 16, color: "#3c3c3c" }}>Categories</span>
                                        </button>
                                    </h2>

                                    <div id="categories" className="accordion-collapse collapse show" aria-labelledby="categories-heading" data-bs-parent="#main">
                                        <div className="accordion-body px-0">

                                            <div className="accordion accordion-flush" id="sub-categories">

                                                {Categories.map(({ name, sub }, i) => i < 2 ? <div className="accordion-item">
                                                    <h2 className="accordion-header" id="poison-heading">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#cat${i}`} aria-expanded="false" aria-controls={"cat" + i}>
                                                            <span>{name}</span>
                                                        </button>
                                                    </h2>

                                                    <div id={"cat" + i} className="accordion-collapse collapse" aria-labelledby="poison-heading" data-bs-parent="#sub-categories">
                                                        <div className="accordion-body px-0">
                                                            <div>
                                                                {sub.map((name, x) => <p><a className=" mb-0" href={basepath(`/marketplace/categories/${name}`)}>{name}</a></p>)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : null)}
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="accordion-item">
                                    <h2 className="accordion-header" id="product-form-heading">
                                        <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#product-form" aria-expanded="false" aria-controls="product-form">
                                            <span style={{ fontWeight: '600', fontSize: 16, color: "#3c3c3c" }}>Product Form</span>
                                        </button>
                                    </h2>

                                    <div id="product-form" className="accordion-collapse collapse show" aria-labelledby="product-form-heading" data-bs-parent="#main">
                                        <div className="accordion-body px-0">

                                            <div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="tablet" />
                                                    <label className="form-check-label " htmlFor="tablet">
                                                        Tablet
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="liquid" />
                                                    <label className="form-check-label " htmlFor="liquid">
                                                        Liquid
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="powder" />
                                                    <label className="form-check-label " htmlFor="powder">
                                                        Powder
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="accordion-item">
                                    <h2 className="accordion-header" id="price-heading">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#price" aria-expanded="false" aria-controls="price">
                                            <span style={{ fontWeight: '600', fontSize: 16, color: "#3c3c3c" }}>Price (RM)</span>
                                        </button>
                                    </h2>

                                    <div id="price" className="accordion-collapse collapse show" aria-labelledby="price-heading" data-bs-parent="#main">
                                        <div className="accordion-body px-0">

                                            <div>
                                                <ReactSlider
                                                    className="price-slider"
                                                    thumbClassName="slider-thumb"
                                                    trackClassName="slider-track"
                                                    defaultValue={[0, 100]}
                                                    ariaLabel={['Lower thumb', 'Upper thumb']}
                                                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                                    pearling
                                                    minDistance={10}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}


                                {Object.keys(facets).map((key) =>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="brands-heading">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${key}`} aria-expanded="false" aria-controls={key}>
                                                <span style={{ fontWeight: '600', fontSize: 16, color: "#3c3c3c", textTransform: "capitalize" }}>{key.replace("_", " ")}</span>
                                            </button>
                                        </h2>
                                        <div id={key} className="accordion-collapse collapse show" aria-labelledby="brands-heading" data-bs-parent="#main">
                                            <div className="accordion-body px-0">

                                                {Object.keys(facets[key]).map(key2 =>
                                                    <div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" checked={filters.find(v => v == `${key}:"${key2}"`)} value={key2} id={key2} onChange={(ev) => onCheckedFilters(ev, key, key2)} />
                                                            <label className="form-check-label " htmlFor={key2}>
                                                                {key2}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-10 col-md-8 col-12 ps-md-4">
                        {/* <h3 className="fw-normal mb-4">
                            Explore by Categories
                        </h3> */}
                        <div className="row">
                            <div className="col-lg-4 col-12 mb-3">
                                <div className="card cat-card d-flex flex-row justify-content-evenly align-items-center" style={{ backgroundColor: '#F7F7F7' }}>
                                    <div className="pe-2">
                                        <p className="fw-semi">
                                            Can't find what you're looking for?
                                        </p>
                                        <p className="fw-semi mb-0">
                                            Learn More <i className="fa fa-chevron-right"></i>
                                        </p>
                                    </div>
                                    <img
                                        className="cat-icon me-3"
                                        style={{ borderRadius: '5%' }}
                                        src={basepath("/img/shop/b2.jpg")}
                                        alt="banner"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-12 mb-3">
                                <div className="card cat-card d-flex flex-row justify-content-evenly align-items-center" style={{ backgroundColor: '#F1F4FA' }}>
                                    <div className="pe-2">
                                        <p className="fw-semi">
                                            Stock up your covid test-kits with us
                                        </p>
                                        <p className="fw-semi mb-0">
                                            Learn More <i className="fa fa-chevron-right"></i>
                                        </p>
                                    </div>
                                    <img
                                        className="cat-icon me-3"
                                        style={{ borderRadius: '5%' }}
                                        src={basepath("/img/shop/b3.jpg")}
                                        alt="banner"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-12 mb-3">
                                <div className="card cat-card d-flex flex-row justify-content-evenly align-items-center" style={{ backgroundColor: '#FFDBA1' }}>
                                    <div className="pe-2">
                                        <p className="fw-semi">
                                            Stock up your inventory in just one click
                                        </p>
                                        <p className="fw-semi mb-0">
                                            Learn More <i className="fa fa-chevron-right"></i>
                                        </p>
                                    </div>
                                    <img
                                        className="cat-icon me-3"
                                        style={{ borderRadius: '5%' }}
                                        src={basepath("/img/shop/b4.jpg")}
                                        alt="banner"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="fw-semi my-4">Featured Products</h3>
                            <div className="d-flex align-items-center">
                                <span className="d-md-block d-none">Sort by</span>&nbsp;&nbsp;&nbsp;
                                <div className="dropdown">
                                    <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Relevance
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#">Relevance</a></li>
                                        <li><a className="dropdown-item" href="#">Popular</a></li>
                                        <li><a className="dropdown-item" href="#">Top Sales</a></li>
                                        <li><a className="dropdown-item" href="#">Highest Rated</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {results.map((item, index) => {
                                return (
                                    <div
                                        className="col-lg-3 col-md-4 col-6 pb-4"
                                        key={index}
                                    >
                                        <div className="product-image-wrapper">
                                            <div className="productinfo position-relative d-flex flex-column justify-content-between">
                                                {item.discount &&
                                                    <div className="discount-badge">
                                                        <span className="price">
                                                            {" "}
                                                            -{numeral(item.discount || 0).format("0,0")}%
                                                        </span>
                                                    </div>
                                                }
                                                <div>
                                                    <a
                                                        className="mb-2"
                                                        href={basepath(`/marketplace/product/${item.uuid}`)}
                                                    >
                                                        <div className="mb-3">
                                                            <img
                                                                className="img-fluid"
                                                                style={{
                                                                    objectFit: "contain",
                                                                }}
                                                                src={api.getImage(item.data.images[0])}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <p className="fw-semi mb-1 position-relative">

                                                            {item.data.name}&nbsp;
                                                            {/*item.data.product_type == 0 &&
                                                            <span className="med-badge">
                                                                <svg viewBox="0 0 384 512">
                                                                    <path d="M301.26 352l78.06-78.06c6.25-6.25 6.25-16.38 0-22.63l-22.63-22.63c-6.25-6.25-16.38-6.25-22.63 0L256 306.74l-83.96-83.96C219.31 216.8 256 176.89 256 128c0-53.02-42.98-96-96-96H16C7.16 32 0 39.16 0 48v256c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-80h18.75l128 128-78.06 78.06c-6.25 6.25-6.25 16.38 0 22.63l22.63 22.63c6.25 6.25 16.38 6.25 22.63 0L256 397.25l78.06 78.06c6.25 6.25 16.38 6.25 22.63 0l22.63-22.63c6.25-6.25 6.25-16.38 0-22.63L301.26 352zM64 96h96c17.64 0 32 14.36 32 32s-14.36 32-32 32H64V96z"></path>
                                                                </svg>
                                                            </span>
                                                        */}
                                                            <p className="variant mt-0 mb-2">
                                                                {item.no_stock ? <span className="text-danger">Out of Stock</span> : <>{item.variants[item.variants.length - 1].data.name}</>}
                                                            </p>
                                                        </p>
                                                        <a href={basepath(`/marketplace/store/${item.store_uuid}`)}>
                                                            <span className="store-name">
                                                                {item.store_name}
                                                            </span>
                                                        </a>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span className="price d-block">
                                                        From RM{" "}
                                                        {numeral(item.final_price).format("0,0.00")}
                                                    </span>
                                                    {item.discount &&
                                                        <span className="text-decoration-line-through price text-muted fw-normal">
                                                            From RM{" "}
                                                            {numeral(item.price).format("0,0.00")}
                                                        </span>
                                                    }
                                                    <button onClick={() => setProduct(item)} className={`btn w-100 mt-3 ${item.no_stock ? `btn-secondary` : `btn-primary`}`} disabled={item.no_stock} >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="col-12">
                            <Pagination onPageChanged={onPageChange} _page={parseInt(page || 1)} _pagesize={20} totalItem={products.total} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
