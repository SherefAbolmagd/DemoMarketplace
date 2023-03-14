import Head from 'next/head';
import moment from 'moment';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Api from '../../../api/Admin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import basepath, { navigate } from '../../../components/basepath';

export default function createCoupon() {
    const router = useRouter()
    const [coupon, setCoupon] = useState({
        name: "",
        discount_rate: 0,
        discount_amount: 0,
        enable: true,
        limit: 0,
        expired_at: "",
        min_amount: 0,
        charge_type: 0
    })

    const onChange = (ev) => {
        let tempcoupon = coupon;
        const value = ev.target.value;
        const name = ev.target.name;

        if(name == "discount_rate"){
            tempcoupon[name] = parseFloat(value);
        }else{
            tempcoupon[name] = value;
        }
        
        setCoupon(tempcoupon);
    }

    const onChangeCheckbox = (ev) => {
        let tempcoupon = coupon;
        const name = ev.target.name;
        tempcoupon[name] = ev.target.checked
        setCoupon(tempcoupon);
    }

    async function onSubmit() {
        try {
            // Validation
            if (!Number.isInteger(Number(coupon.limit))) {
                toast.warning("Coupon Limit must be whole number")
                return
            }

            const res = await Api.createCoupon(coupon);

            if (res) {
                toast.success("Coupon Successfully Create", {
                    autoClose: 1000,
                    onClose: navigate.push(`/admin/coupon/${res.coupon.id}`)
                });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Coupon| DoctorOnCall</title>
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
                                            <span className="mini-click-non">Operation / New Coupon</span>
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
                                    <div>
                                        <div className="d-flex justify-content-evenly border-bottom-0 mb-3">
                                            <div className="border-0 pb-2 px-1 cursor">
                                                <a>Add New Coupon</a>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Name *</Form.Label>
                                                        <Form.Control name="name" onChange={onChange} defaultValue={coupon.name} placeholder="Enter Coupon Name" />
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Discount Rate (%)</Form.Label>
                                                        <Form.Control type="number" name="discount_rate" onChange={onChange} defaultValue={coupon.discount_rate} placeholder="Enter Discount Rate" />
                                                    </Form.Group>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Discount Amount (RM)</Form.Label>
                                                        <Form.Control type="number" name="discount_amount" onChange={onChange} defaultValue={coupon.discount_amount} placeholder="Enter Discount Amount" />
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Coupon Limit * (0 for no limit)</Form.Label>
                                                        <Form.Control type="number" name="limit" onChange={onChange} defaultValue={coupon.limit} />
                                                    </Form.Group>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Coupon Charge Type *</Form.Label>
                                                        <Form.Control as="select" name="charge_type" onChange={onChange} defaultValue={coupon.charge_type}>
                                                            <option value={0}>All</option>
                                                            <option value={1}>FPX</option>
                                                            <option value={2}>Wallet</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Coupon Expiry Date *</Form.Label>
                                                        <Form.Control type="date" name="expired_at" onChange={onChange} defaultValue={coupon.expired_at} />
                                                    </Form.Group>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Coupon Min Amount (RM) * (0 for no minimum amount)</Form.Label>
                                                        <Form.Control type="number" name="min_amount" onChange={onChange} defaultValue={coupon.min_amount} />
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} className="form-check form-switch">
                                                        <Form.Check type="checkbox" name="enable" onChange={onChangeCheckbox} defaultChecked={coupon.enable} id="flexSwitchCheckDefault" label="Enable Coupon *" />
                                                    </Form.Group>
                                                </Row>

                                                <div className="text-center">
                                                    <button className="btn btn-primary w-25" onClick={onSubmit}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}