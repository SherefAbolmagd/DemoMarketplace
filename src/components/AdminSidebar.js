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
                        <li className={route.pathname.startsWith("/admin/operation") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <i className={`fa fa-tasks icon-wrap ${route.pathname.startsWith("/admin/operation") ? "text-primary" : ""}`}></i>
                                <span className="mini-click-non">Operation</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/admin/operation/order" ? "text-primary" : ""} title="Vendor List" href={basepath(`/admin/operation/order`)}> <span className="mini-sub-pro">Order List</span></a></li>
                                <li><a className={route.pathname == "/admin/operation/platform" ? "text-primary" : ""} title="Vendor List" href={basepath(`/admin/operation/platform`)}> <span className="mini-sub-pro">Platform Report</span></a></li>
                                <li><a className={route.pathname == "/admin/operation/store" ? "text-primary" : ""} title="Vendor List" href={basepath(`/admin/operation/store`)}> <span className="mini-sub-pro">Store Report</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/admin/store") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <i className={`fa fa-user-md icon-wrap ${route.pathname.startsWith("/admin/store")? "text-primary" : ""}`}></i>
                                <span className="mini-click-non">Store</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname.startsWith("/admin/store") ? "text-primary" : ""} title="Approved List" href={basepath(`/admin/store`)}> <span className="mini-sub-pro">Approved List</span></a></li>
                                <li><a className={route.pathname.startsWith("/admin/store/pending") ? "text-primary" : ""} title="Pending List" href={basepath(`/admin/store/pending`)}> <span className="mini-sub-pro">Pending List</span></a></li>
                                <li><a className={route.pathname.startsWith("/admin/store/deleted") ? "text-primary" : ""} title="Deleted List" href={basepath(`/admin/store/deleted`)}> <span className="mini-sub-pro">Deleted List</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/admin/product") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <FiBox />
                                <span className="mini-click-non">Master Product</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">

                                <li><a className={route.pathname == "/admin/product" ? "text-primary" : ""} title="Dashboard" href={basepath(`/admin/product`)}> <span className="mini-sub-pro">Master Products</span></a></li>

                                <li><a className={route.pathname == "/admin/product/new" ? "text-primary" : ""} title="Dashboard" href={basepath(`/admin/product/new`)}> <span className="mini-sub-pro">Add New Product</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/admin/product/store") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <FiBox />
                                <span className="mini-click-non">Propose Product</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/admin/product/store/pending" ? "text-primary" : ""} title="Dashboard" href={basepath(`/admin/product/store/pending`)}> <span className="mini-sub-pro">Pending Product</span></a></li>
                                <li><a className={route.pathname == "/admin/product/store/rejected" ? "text-primary" : ""} title="Dashboard" href={basepath(`/admin/product/store/rejected`)}> <span className="mini-sub-pro">Rejected Product</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/admin/coupon") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <RiCoupon2Line />
                                <span className="mini-click-non">Coupon</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/admin/coupon" ? "text-primary" : ""} title="My Coupon" href={basepath(`/admin/coupon`)}> <span className="mini-sub-pro">My Coupon</span></a></li>
                                <li><a className={route.pathname == "/admin/coupon/new" ? "text-primary" : ""} title="Add New Coupon" href={basepath(`/admin/coupon/new`)}> <span className="mini-sub-pro">Add New Coupon</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/admin/report") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <BsGraphUp />
                                <span className="mini-click-non">Report</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname.startsWith("/admin/report/refund") ? "text-primary" : ""} title="Dashboard" href={basepath(`/admin/report/refund`)}> <span className="mini-sub-pro">Refund</span></a></li>
                                <li><a className={route.pathname.startsWith("/admin/report/settlement") ? "text-primary" : ""} title="Dashboard" href={basepath(`/admin/report/settlement`)}> <span className="mini-sub-pro">Settlement</span></a></li>
                                <li><a className={route.pathname.startsWith("/admin/report/payment") ? "text-primary" : ""} title="Dashboard" href={basepath(`/admin/report/payment`)}> <span className="mini-sub-pro">Payment</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/admin/user") ? "active" : ""}>
                            <a className="" href={basepath(`/admin/user`)}>
                                <i className={`fa fa-shopping-cart icon-wrap ${route.pathname.startsWith("/admin/user") ? 'text-primary' : ""}`}></i>
                                <span className="mini-click-non">User</span>
                            </a>
                        </li>

                        <li className={route.pathname.startsWith("/admin/customer") ? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <i className={`fa fa-user-md icon-wrap ${route.pathname.startsWith("/admin/customer") ? "text-primary" : ""}`}></i>
                                <span className="mini-click-non">Customer</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname  == "/admin/customer" ? "text-primary" : ""} title="Pharmacy List" href={basepath(`/admin/customer`)}> <span className="mini-sub-pro">Customer List</span></a></li>
                                <li><a className={route.pathname == "/admin/customer/pending" ? "text-primary" : ""} title="Pending List" href={basepath(`/admin/customer/pending`)}> <span className="mini-sub-pro">Pending List</span></a></li>
                                <li><a className={route.pathname == "/admin/customer/approved" ? "text-primary" : ""} title="Approved List" href={basepath(`/admin/customer/approved`)}> <span className="mini-sub-pro">Approved List</span></a></li>
                            </ul>
                        </li>

                        <li className={route.pathname.startsWith("/admin/developer")? "active" : ""}>
                            <a className="has-arrow" href="#">
                                <i className="fa fa-sliders icon-wrap"></i>
                                <span className="mini-click-non">Developer</span>
                            </a>
                            <ul className="submenu-angle shadow-sm" aria-expanded="false">
                                <li><a className={route.pathname == "/admin/developer/webhook" ? "text-primary" : ""} title="Store" href={basepath(`/admin/developer/webhook`)}> <span className="mini-sub-pro">Webhook</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
    </div>

}