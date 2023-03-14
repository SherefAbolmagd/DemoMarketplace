import Head from 'next/head';
import Api from '../../../api/Admin';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Pagination from '../../../components/Pagination.js';
import basepath, { navigate } from '../../../components/basepath';
import config from 'next/config';
import Swal from 'sweetalert2';

export default function index() {
    const [couponslist, setCoupons] = useState([]);
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getCouponList();
    }, [paginate]);

    const getCouponList = async () => {
        try {
            const { results, total } = await Api.listCoupons({ _page: paginate._page, _pagesize: paginate._pagesize });
            setTotal(total)
            setCoupons(results)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const deleteCoupon = async (coupon_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            if (result.isConfirmed) {
                await Api.deleteCoupon(coupon_id);
                Swal.fire(
                    'Deleted!',
                    'Coupon has been deleted.',
                    'success'
                );
                await setPaginate({ _page: 1, _pagesize: 20 });
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Page Change Handler
    const onPageChanged = ({ _page, _pagesize }) => {
        setPaginate({ _page, _pagesize });
    }

    return <>
        <Head>
            <title>Coupon List | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div className="container-fluid">
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
                                            <i className="fa fa-tasks icon-wrap"></i>
                                            <span className="mini-click-non">Operation / Coupon List</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 text-end">
                                    <a href="#">
                                        <i className="icon jiran-download fw-bold"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="product-status-wrap">
                                <div className="d-flex align-content-center justify-content-between mb-3">
                                    <h4 className="mb-0">Coupon List</h4>
                                    <div className="">
                                        {/* <a className="btn btn-primary ms-2 mb-md-0 mb-2" href={`${process.env.NEXT_PUBLIC_BASEPATH||""}/merchant/product/new`}>Add Coupon</a> */}
                                    </div>
                                </div>
                                <table className="w-100">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Coupon Name</th>
                                            <th>Discount (%)</th>
                                            <th>Discount (RM)</th>
                                            <th>Coupon Type</th>
                                            <th>Charge Type</th>
                                            <th>Status</th>
                                            <th>Minimum Amount (RM)</th>
                                            <th>Expired Date</th>
                                            <th>Usage</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {couponslist.length > 0 ?
                                            couponslist.map((coupon, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>{coupon.name}</td>
                                                    <td>{coupon.discount_rate}</td>
                                                    <td>{coupon.discount_amount}</td>
                                                    <td>
                                                        {{
                                                            0: <span className="text-success fw-bold">Platform-wide</span>,
                                                            1: <span className="text-primary fw-bold">Storewide</span>,
                                                        }[coupon.coupon_type]}
                                                    </td>
                                                    <td>
                                                        {{
                                                            0: <span className="text-success fw-bold">All</span>,
                                                            1: <span className="text-primary fw-bold">FPX</span>,
                                                            2: <span className="text-danger fw-bold">Wallet</span>
                                                        }[coupon.charge_type]}
                                                    </td>
                                                    <td>
                                                        {{
                                                            true: <span className="text-success fw-bold">Enabled</span>,
                                                            false: <span className="text-primary fw-bold">Disable</span>,
                                                        }[coupon.enable]}
                                                    </td>
                                                    <td>{coupon.min_amount}</td>
                                                    <td>{moment(coupon.expired_at).format("MMM Do YY")}</td>
                                                    <td>{coupon.count}/{coupon.limit == 0 ? <>&infin;</> : coupon.limit}</td>
                                                    <td>
                                                        <Button variant="primary" as="a" href={basepath(`/admin/coupon/${coupon.id}`)}>Edit</Button>
                                                        &emsp;
                                                        <Button variant="danger" onClick={() => deleteCoupon(coupon.id)} ><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
                                                    </td>
                                                </tr>
                                            })
                                            :
                                            <>
                                                <tr>
                                                    <td colSpan="7" className="text-center">No Data Available</td>
                                                </tr>
                                            </>}
                                    </tbody>
                                </table>
                                <Pagination onPageChanged={onPageChanged} _page={parseInt(paginate._page || 1)} _pagesize={parseInt(paginate._pagesize || 20)} totalItem={total} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

