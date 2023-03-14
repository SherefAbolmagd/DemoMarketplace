import Head from 'next/head';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import Api from '../../../api/Merchant';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import basepath, { navigate } from '../../../components/basepath';

export default function createWebhook() {
    const router = useRouter()

    const [webhook, setWebhooks] = useState({
        webhook_event: "order_draft",
        webhook_uri: "",
    });

    const [key, setKey] = useState(0);

    function webHookHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...webhook };
        s[nam] = val;
        setWebhooks(s);
    }

    async function onSubmit() {
        try {
            if (await Api.createStoreWebhook(webhook)) {
                toast.success("Webhook Successfully Create", {
                    autoClose: 1000,
                    onClose: navigate.push("/merchant/developer/webhook")
                });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>Webhook| DoctorOnCall</title>
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
                                            <span className="mini-click-non">Settings / Store Details</span>
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
                                    <div
                                        id="controlled-tab-example"
                                        selectedIndex={key}
                                        onSelect={(k) => setKey(k)}>

                                        <div className="d-flex justify-content-evenly border-bottom-0 mb-3">
                                            <div className="border-0 pb-2 px-1 text-center cursor">
                                                <a>Webhook Information</a>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <div className="mb-3">
                                                    <label htmlFor="select_event" className="form-label">Select Event Type<span className="text-danger"> *</span></label>
                                                    <div>
                                                        <select defaultValue={webhook.webhook_event} className="form-select" name="webhook_event" onChange={webHookHandler}>
                                                            <option disabled="disabled">Please Select Event</option>
                                                            <option value="order_draft">Order Draft</option>
                                                            <option value="order_pending">Order Pending</option>
                                                            <option value="order_processed">Order Processed</option>
                                                            <option value="order_voucher">Order Voucher</option>
                                                            <option value="order_accepted">Order Accepted</option>
                                                            <option value="order_rejected">Order Rejected</option>
                                                            <option value="order_cancelled">Order Cancelled</option>
                                                            <option value="order_shipped">Order Shipped</option>
                                                            <option value="order_delivered">Order Delivered</option>
                                                            <option value="order_disputed">Order Disputed</option>
                                                            <option value="order_returned">Order Returned</option>
                                                            {/* <option value="ninjavan_create_order">Debug : NinjaVan Create Order</option>
                                                            <option value="ninjavan_webhook">Debug : NinjaVan Webhook</option> */}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="name">Target Url</label>
                                                    <input type="text" className="form-control" value={webhook.webhook_uri} name="webhook_uri" onChange={webHookHandler} required />
                                                </div>

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