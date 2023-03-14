import Head from 'next/head';
import Error from 'next/error';
import moment from 'moment';
import { Form, Row, Col, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Api from '../../../api/Merchant';
import { toast } from 'react-toastify';
import { navigate } from '../../../components/basepath';

export default function updateCoupon({ coupon_id }) {
    const [coupon, setCoupon] = useState({
        enable: true
    })
    const [not_found, setNotFound] = useState(false);

    useEffect(() => {
        getCoupon();
    }, [])

    const getCoupon = async () => {
        try {
            const { coupon } = await Api.getCoupon(coupon_id);
            let tempcoupon = coupon;
            tempcoupon.expired_at = moment(tempcoupon.expired_at).format('yyyy-MM-DD');

            setCoupon(tempcoupon)
        } catch (ex) {
            toast.warning(ex.message)
            if (ex.status == 404) {
                setNotFound(true)
            }
        }
    }

    const onChange = (ev) => {
        let tempcoupon = coupon;
        const value = ev.target.value;
        const name = ev.target.name;

        if (name == "discount_rate") {
            tempcoupon[name] = parseFloat(value);
        } else {
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

            const res = await Api.updateCoupon(coupon);

            if (res) {
                toast.success("Coupon Successfully Updated", {
                    autoClose: 1000,
                });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    if (not_found) {
        return <Error statusCode="404" title="The coupon did not exist" />
    }

    return <Container>
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
                                            <span className="mini-click-non">Operation / Update Coupon</span>
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
                                                <a>Update Coupon</a>
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
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Coupon Used</Form.Label>
                                                        <Form.Control type="number" name="count" defaultValue={coupon.count} disabled/>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} className="form-check form-switch">
                                                        <Form.Check type="checkbox" name="enable" onClick={onChangeCheckbox} defaultChecked={coupon.enable} id="flexSwitchCheckDefault" label="Enable Coupon *" />
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
    </Container>
}

export async function getServerSideProps(context) {
    const { coupon_id } = context.params;

    return {
        props: { coupon_id }, // will be passed to the page component as props
    }
}