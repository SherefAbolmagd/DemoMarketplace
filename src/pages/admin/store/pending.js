import Head from 'next/head';
import Api from '../../../api/Admin';
import Pagination from '../../../components/Pagination.js';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import config from 'next/config';
import basepath, { navigate } from '../../../components/basepath';

export default function pendingList() {
    const router = useRouter()
    const [stores, setStoreList] = useState({ results: [] });
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });

    useEffect(() => {
        getStoreList();
    }, [paginate]);

    const getStoreList = async () => {
        try {
            const result = await Api.getPendingStoreList(paginate);
            setStoreList(result)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const deleteStore = async (store_id) => {
        try {
            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await Api.deleteStore(store_id);
                    Swal.fire(
                        'Deleted!',
                        'Store has been deleted.',
                        'success'
                    )
                }
            })
            await getStoreList();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const approveStore = async (store_id) => {
        try {
            await Api.approveStore(store_id);
            await getStoreList();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const disapproveStore = async (store_id) => {
        try {
            await Api.disapproveStore(store_id);
            await getStoreList();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const onPageChange = async ({ _page, _pagesize }) => {
        try {
            setPaginate({ _page, _pagesize })
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>

        <Head>
            <title>Pending Store List | DoctorOnCall</title>
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
                                            <i className="fa fa-user-md icon-wrap"></i>
                                            <span className="mini-click-non"><a href="#" className="">Admin</a> / Pending Store List</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 text-end">
                                    <a href="#">
                                        <i className="icon jiran-download"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mg-b-30">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="product-status-wrap">
                                <div className="d-flex align-content-center justify-content-between mb-3">
                                    <h4 className="mb-0">Pending Store List</h4>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            {/* <th>Logo</th> */}
                                            <th>Store Name</th>
                                            <th>Company Name</th>
                                            <th>Registration Number</th>
                                            <th>Store Type</th>
                                            <th>Email</th>
                                            <th>Telephone</th>
                                            <th>Store Approval</th>
                                            <th>Settings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stores.results.length ?
                                            stores.results.map((store, index) => {
                                                return <tr key={index}>
                                                    {/* <td>
                                                        <img src={`/api/image/${store.metadata.images[0]}`} alt="" />
                                                    </td> */}
                                                    <td>{store.store_name}</td>
                                                    <td>{store.company_name}</td>
                                                    <td>{store.company_registration}</td>
                                                    <td>
                                                        {{
                                                            0: <span className="text-success fw-bold">Retail Poison</span>,
                                                            1: <span className="text-primary fw-bold">Wholesale Poison</span>,
                                                            2: <span className="text-danger fw-bold">Retail Others</span>,
                                                            3: <span className="text-warning fw-bold">Wholesale Others</span>
                                                        }[store.store_type]}
                                                    </td>
                                                    <td>{store.support_email}</td>
                                                    <td>{store.support_phone}</td>
                                                    <td>
                                                        {store.store_approved_at ?
                                                            <button className="btn btn-danger btn-sm" onClick={() => disapproveStore(store.id)}>Disapprove</button> :
                                                            <button className="btn btn-success btn-sm" onClick={() => approveStore(store.id)}>Approve</button>
                                                        }
                                                    </td>
                                                    <td>
                                                        <button data-toggle="tooltip" title="View" className="btn btn-sm btn-primary" onClick={() => navigate.push(`/admin/store/${store.id}`)}><i className="fa fa-eye" aria-hidden="true"></i></button>
                                                        <button data-toggle="tooltip" title="Trash" className="btn btn-sm btn-danger ms-2" onClick={() => deleteStore(store.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    </td>
                                                </tr>
                                            }) : <tr><td className="text-danger text-center" colSpan="100%">No Store Available</td></tr>}
                                    </tbody>
                                </table>
                                <Pagination onPageChanged={onPageChange} _page={parseInt(stores._page)} _pagesize={parseInt(stores._pagesize)} totalItem={stores.total} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}