import { useRouter } from 'next/router';
import Api from '../api/Merchant';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineUser, AiOutlineBank } from "react-icons/ai";
import Event from '../api/Event';
import basepath, { navigate } from "./basepath";

export default function Header() {
    const route = useRouter();
    const [store, setStore] = useState({});

    useEffect(async () => {
        if(await Api.checkAuth())
            getStore();
    }, []);

    const getStore = async () => {
        try {
            if(!route.pathname.startsWith("/merchant"))
                return

            const { store } = await Api.getStore();
            setStore(store)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const logout = async () => {
        try {
            await Api.logout()
            toast.success("Sucessfully Logout", {
                autoClose: 1000,
                onClose: navigate.replace("/merchant")
            });
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    Event.on('failed_auth',()=>{
        console.log("Failed Auth, merchant");
        navigate.replace("/merchant");
    });

    return <>
        <div className="header-top-area shadow-sm d-none d-md-block">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="header-top-wraper">
                            <div className="row">
                                <div className="col-md-2 col-12 d-flex flex-row justify-content-evenly align-items-center">
                                    <div className="text-center my-1">
                                        <a href={basepath("/merchant/home")}>
                                            <img className="img-fluid" style={{ width: 50 }} src={basepath("/img/logo/logo.png")} alt="" />
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="col-md-10 col-12 d-none d-md-block justify-content-end">
                                    <div className="header-right-info">
                                        <ul className="nav navbar-nav flex-row mai-top-nav header-right-menu">
                                            <li className="nav-item">
                                                <a className="nav-link dropdown d-flex justify-content-center align-items-center" href="#" id="profileDropdown"
                                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                     <AiOutlineUser />
                                                    <span className="admin-name me-2">{store?.store_name ?? ""}</span>
                                                </a>
                                                <ul aria-labelledby="profileDropdown" id="authorDropdown"
                                                    className="dropdown-header-top author-log dropdown-menu shadow-sm">
                                                    {/* <li>
                                                        <a href="#"><span
                                                            className="icon jiran-user author-log-ic"></span> My
                                                    Profile</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><span
                                                            className="icon jiran-settings author-log-ic"></span>
                                                    Settings</a>
                                                    </li> */}
                                                    <li>
                                                        <a onClick={() => logout()}><span
                                                            className="icon jiran-unlocked author-log-ic"></span>
                                                    Log Out</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  Mobile Menu start  */}
        <div className="mobile-menu-area shadow-sm">
            <div className="container-fluid">
            <img src={basepath("/img/logo/logo.png")} className="img-fluid mean-logo" alt=""/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="mobile-menu">
                            <nav id="dropdown">
                                <ul className="mobile-menu-nav">

                                    {route.pathname.startsWith("/merchant") ?
                                        <>
                                            <li>
                                                <a data-toggle="collapse" data-target="#Charts">
                                                    <i className="fa fa-tasks icon-wrap"></i>
                                                    <span className="mini-click-non">Operation</span>
                                                </a>
                                                <ul className="collapse dropdown-header-top">
                                                    <li>
                                                        <a title="Dashboard" href={basepath("/merchant/order")}> <span className="mini-sub-pro">Orders</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Dashboard" href={basepath("/merchant/product")}> <span className="mini-sub-pro">Products</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Dashboard" href={basepath("/merchant/coupon")}> <span className="mini-sub-pro">Discount Coupons</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Dashboard" href={basepath("/merchant/report")}> <span className="mini-sub-pro">Reports</span></a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a className="" href={basepath("/marketplace")}>
                                                    <i className="fa fa-shopping-cart icon-wrap"></i>
                                                    <span className="mini-click-non">Marketplace</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a data-toggle="collapse" data-target="#Miscellaneousmob">
                                                    <i className="fa fa-sliders icon-wrap"></i>
                                                    <span className="mini-click-non">Settings</span>
                                                </a>
                                                <ul id="Miscellaneousmob" className="collapse dropdown-header-top">
                                                    <li>
                                                        <a title="Account" href="#"> <span className="mini-sub-pro">Account</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Store" href={basepath("/merchant/store")}> <span className="mini-sub-pro">Store</span></a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </>
                                        :
                                        route.pathname.startsWith("/admin") &&
                                        <>
                                            <li>
                                                <a data-toggle="collapse" data-target="#Chartsmob" href={basepath("/admin/order")}>
                                                    <i className="fa fa-user-md icon-wrap"></i>
                                                    <span className="mini-click-non">Operation</span>
                                                </a>
                                                <ul id="Chartsmob" className="collapse dropdown-header-top">
                                                    <li>
                                                        <a title="Vendor List" href={basepath("/admin/order")}> <span className="mini-sub-pro">Order List</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Vendor List" href={basepath("/admin/report/platform")}> <span className="mini-sub-pro">Platform Report</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Vendor List" href={basepath("/admin/report/store")}> <span className="mini-sub-pro">Stores Report</span></a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a data-toggle="collapse" data-target="#Tablesmob" href={basepath("/admin/store")}>
                                                    <i className="fa fa-user-md icon-wrap"></i>
                                                    <span className="mini-click-non">Store</span>
                                                </a>
                                                <ul id="Tablesmob" className="collapse dropdown-header-top">
                                                    <li>
                                                        <a title="Active List" href={basepath("/admin/store")}> <span className="mini-sub-pro">Active List</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Pending List" href={basepath("/admin/store/pending")}> <span className="mini-sub-pro">Pending List</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Deleted List" href={basepath("/admin/store/deleted")}> <span className="mini-sub-pro">Deleted List</span></a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a className="" href={basepath("/admin/user")}>
                                                    <i className="fa fa-shopping-cart icon-wrap"></i>
                                                    <span className="mini-click-non">User</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a data-toggle="collapse" data-target="#formsmob" href={basepath("/admin/store")}>
                                                    <i className="fa fa-user-md icon-wrap"></i>
                                                    <span className="mini-click-non">Store</span>
                                                </a>
                                                <ul id="formsmob" className="collapse dropdown-header-top">
                                                    <li>
                                                        <a title="Store List" href={basepath("/admin/store")}> <span className="mini-sub-pro">Store List</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Pharmacy List" href={basepath("/admin/store/pharmacy")}> <span className="mini-sub-pro">Pharmacy List</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Distributor List" href={basepath("/admin/store/distributor")}> <span className="mini-sub-pro">Distributor List</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Deleted Store" href={basepath("/admin/store/deleted")}> <span className="mini-sub-pro">Deleted Store</span></a>
                                                    </li>
                                                    <li>
                                                        <a title="Pending Store" href={basepath("/admin/store/pending")}> <span className="mini-sub-pro">Pending Store</span></a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </>}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  Mobile Menu end  */}
    </>

}