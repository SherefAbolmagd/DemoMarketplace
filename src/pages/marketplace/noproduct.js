import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Accordion, Button, Modal } from "react-bootstrap";

import api from "../../api/Market";
import Event from "../../api/Event";

import numeral from "numeral";
import React from "react";

export default function marketplace() {
    const [products, setProducts] = useState({ results: [] });
    const [width, setWidth] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [variant, setVariant] = useState({});

    useEffect(() => {
        getProducts();
        setWidth(window.innerWidth);
    }, []);

    const getProducts = async () => {
        try {
            const res = await api.getBusinessCatalogue({});

            setProducts(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    const addCart = async (variant_id) => {
        try {
            await api.addCart({ variant_id, quantity });

            toast.success("Item Added to Cart", {
                autoClose: 1000,
            });

            Event.emit("update_cart");
        } catch (ex) {
            console.log(ex);
        }
    };

    const { results, _page, _pagesize } = products;
    return (
        <>
            <Head>
                <title>Marketplace | DoctorOnCall</title>
                <meta name="description" content="" />
            </Head>

            <div className="container-md container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 col-12">
                        <p className="fw-normal mb-4">A total of <strong>0 Products</strong> Found</p>
                        <div className="d-flex justify-content-center pt-4">
                            <img src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/product/medicine.svg`} width="250" alt="" />
                        </div>
                        <div className="d-flex justify-content-center pt-4">
                            <h4>Sorry ! No Product Found</h4>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p>We could not find any products related to your search.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
