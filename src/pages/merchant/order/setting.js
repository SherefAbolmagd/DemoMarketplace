import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import Api from '../../../api/Merchant';
import { toast } from 'react-toastify';

export default function setting() {
    const [free_delivery, setFreeDelivery] = useState(0);   
    const [parcel, setParcel] = useState(0);   
    const [express, setExpress] = useState(0);   

    useEffect(async ()=>{
        try{
            const  {store} = await Api.getStore();

            setFreeDelivery(store.metadata.free_delivery || 0);
            setParcel(store.metadata.delivery_provider || 0);
            setExpress(store.metadata.express_provider || 0);
        }catch(ex){}
    },[])

    const onFreeChangeHandler= async (event) => {
        let nam = event.target.name;
        let check = event.target.checked;

        try{
            await Api.updateDeliverySetting({free_delivery:check ? 1 : 0});
            
            setFreeDelivery(check ? 1 : 0);

            toast.success("Free Delivery Updated")
        }catch(ex){
            toast.error("Free Delivery not Updated")
        }
    }

    // Handler for Product Details Input
    const onChangeHandler= async (event) => {
        let nam = event.target.name;
        let check = event.target.checked;

        const type = ["manual","free","ninjavan"];

        if(check){
            const delivery = type.findIndex(val=>val == nam)

            try{
                await Api.updateDeliveryProvider(delivery);
                
                setParcel(delivery);

                toast.success("Parcel Logistics Provider Updated")
            }catch(ex){
                toast.error("Parcel Logistics Provider not Updated")
            }

        }
    }

    const onExpressChangeHandler= async (event) => {
        let nam = event.target.name;
        let check = event.target.checked;

        const type = ["manual","free","lalamove"];

        if(check){
            const delivery = type.findIndex(val=>val == nam)

            try{
                await Api.updateExpressDeliveryProvider(delivery);
                
                setExpress(delivery);

                toast.success("Parcel Logistics Provider Updated")
            }catch(ex){
                toast.error("Parcel Logistics Provider not Updated")
            }

        }
    }

    return <>
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-md px-5 container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card my-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                    <div className="breadcomb-wp">
                                        {/* <div className="breadcomb-icon">
                                                    <i className="icon jiran-home"></i>
                                                </div> */}
                                        <div className="text-dark">
                                            <IoSettingsOutline />
                                            <span className="mini-click-non">Shipping Setting</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="containter justify-content-start">
                    <div className="row">
                        

                        {/* Left Panel */}
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card mb-3">

                                <div className="p-3 fw-bold">Shipping Channel</div>

                                <div className="card-tips"> Enable your desired shipping channel(s) below.</div>
                            </div>

                            <div className="card mb-3">
                                <div className="p-3 fw-bold"> General Logistics</div>

                                <div className="card-tips mx-1">Enable free delivery for generallogistics storewide</div>

                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" checked={free_delivery == 1} onChange={onFreeChangeHandler} name="free" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Free Delivery</label>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="p-3 fw-bold"> Parcel Logistics</div>

                                <div className="card-tips mx-1"> With these channels, you can enjoy fast, seamless and reliable logistics services with our delivery partners. Do note that you will need a printer to print out the automatically generated Air Waybills. </div>

                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" checked={parcel == 0} onChange={onChangeHandler} name="manual" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Self Delivery</label>
                                </div>

                                {/* <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">DHL eCommerce</label>
                                </div> */}

                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" disabled checked={parcel == 2} onChange={onChangeHandler} name="ninjavan" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Ninja Van</label>
                                </div>

                                {/* <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">J&T Express</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">City-Link Express</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Ikobana</label>
                                </div> */}

                            </div>

                            <div className="card mb-3">
                                <div className="p-3 fw-bold"> Express Logistics</div>

                                <div className="card-tips mx-1">Same day delivery channel. Provide your nearby customers with same day delivery service. </div>

                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" checked={express == 0} onChange={onExpressChangeHandler} name="manual" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Self Delivery</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-1" checked={express == 2} disabled onChange={onExpressChangeHandler} name="lalamove" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">LalaMove</label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
