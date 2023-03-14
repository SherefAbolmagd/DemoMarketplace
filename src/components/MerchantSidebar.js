import { useRouter } from 'next/router';
import {
    FiTruck, FiTag, FiTool, FiCreditCard,
    FiShoppingCart, FiBox,
    FiMenu
} from "react-icons/fi";
import { BiStore, BiUser } from "react-icons/bi";
import { BsGraphUp, BsFileText } from "react-icons/bs";
import { RiCoupon2Line } from "react-icons/ri";

import basepath from './basepath';

export default function Sidebar() {
    const route = useRouter();

    return <div className="left-sidebar-pro">
        <nav id="sidebar" className="shadow-sm">
            <div className="left-custom-menu-adp-wrap comment-scrollbar">
                <nav className="sidebar-nav left-sidebar-menu-pro">
                    <ul className="metismenu" id="menu1">                              
                        <li className={route.pathname.startsWith("/merchant/order") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <FiTruck />
                                <span className="mini-click-non">Shipment</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/order" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/order?status=3`)}> <span className="mini-sub-pro">My Shipments</span></a></li>
                                <li><a className={route.pathname  == "/merchant/order/setting" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/order/setting`)}> <span className="mini-sub-pro">Shiping Setting</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/merchant/order") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <BsFileText />
                                <span className="mini-click-non">Order</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/order" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/order?status=-1`)}> <span className="mini-sub-pro">Orders</span></a></li>

                                <li><a className={route.pathname == "/merchant/order" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/order?status=5`)}> <span className="mini-sub-pro">Cancellation</span></a></li>
                                <li><a className={route.pathname == "/merchant/order" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/order?status=8`)}> <span className="mini-sub-pro">Return/Refund</span></a></li> 
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/merchant/inventory") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <FiBox />
                                <span className="mini-click-non">Inventory</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/product/inventory" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/product/inventory`)}> <span className="mini-sub-pro">My Inventory</span></a></li>

                                <li><a className={route.pathname == "/merchant/product/inventory/add" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/product/inventory/add`)}> <span className="mini-sub-pro">Import Inventory</span></a></li>
                            </ul>
                        </li>

                        {/* <li className={route.pathname.startsWith("/merchant/coupon") ? "active" : ""}
                            <a className="has-arrow" href="#">
                                <FiTag />
                                <span className="mini-click-non">Marketing Centre</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/coupon" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/coupon`)}> <span className="mini-sub-pro">Discount Coupons</span></a></li>
                            </ul>
                        </li> */}

                        <li className={route.pathname.startsWith("/merchant/finance") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <FiCreditCard />
                                <span className="mini-click-non">Finance</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/finance" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/finance`)}> <span className="mini-sub-pro">My Income</span></a></li>

                                {/* <li><a> <span className="mini-sub-pro">My Balance</span></a></li>

                                <li><a> <span className="mini-sub-pro">Bank Accounts</span></a></li> */}
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/merchant/report") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <BsGraphUp />
                                <span className="mini-click-non">Data</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/report" ? "text-primary" : ""} title="Dashboard" href={basepath(`/merchant/report`)}> <span className="mini-sub-pro">Reports</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/merchant/store") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <BiStore />
                                <span className="mini-click-non">Shop</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/store" ? "text-primary" : ""} title="Store" href={basepath(`/merchant/store`)}> <span className="mini-sub-pro">Store Details</span></a></li>
                                <li><a className={route.pathname == "/merchant/store/list" ? "text-primary" : ""} title="Store List" href={basepath(`/merchant/store/list`)}> <span className="mini-sub-pro">Store List</span></a></li>
                                <li><a className={route.pathname == "/merchant/store/merchant" ? "text-primary" : ""} title="Store Merchant" href={basepath(`/merchant/store/merchant`)}> <span className="mini-sub-pro">Store Merchant</span></a></li>
                                {/* <li><a className={route.pathname == "/merchant/store/account" ? "text-primary" : ""} title="Store" href={basepath(`/merchant/store/account`)}> <span className="mini-sub-pro">Account</span></a></li> */}
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/merchant/coupon") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <RiCoupon2Line />
                                <span className="mini-click-non">Coupon</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/coupon" ? "text-primary" : ""} title="My Coupon" href={basepath(`/merchant/coupon`)}> <span className="mini-sub-pro">My Coupon</span></a></li>
                                <li><a className={route.pathname == "/merchant/coupon/new" ? "text-primary" : ""} title="Add New Coupon" href={basepath(`/merchant/coupon/new`)}> <span className="mini-sub-pro">Add New Coupon</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/merchant/developer") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <FiTool />
                                <span className="mini-click-non">Developer</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/merchant/developer/webhook" ? "text-primary" : ""} title="Store" href={basepath(`/merchant/developer/webhook`)}> <span className="mini-sub-pro">Webhook</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
    </div>

}