import Head from 'next/head';
import Api from '../../../api/Merchant';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Pagination from '../../../components/Pagination.js';
import Swal from 'sweetalert2';

export default function Webhook() {
    const router = useRouter()
    const [webhook, setWebhook] = useState({ results: [] });
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });

    useEffect(() => {
        getWebhookList();
    }, [paginate]);

    const getWebhookList = async () => {
        try {
            const webhook = await Api.getStoreWebhookList(paginate);
            setWebhook(webhook)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const deleteWebhook = async (product_id) => {
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
                    await Api.deleteStoreWebhook(product_id);
                    Swal.fire(
                        'Deleted!',
                        'Webhook has been deleted.',
                        'success'
                    )
                }
            })
            await getWebhookList();
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
            <title>Webhook List | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <div>
            <div className="breadcome-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="breadcome-list">
                                <div className="row">
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                        <div className="breadcomb-wp">
                                            {/* <div className="breadcomb-icon">
                                                        <i className="icon jiran-home"></i>
                                                    </div> */}
                                            <div className="text-dark">
                                                <i className="fa fa-user-md icon-wrap"></i>
                                                <span className="mini-click-non"><a href="#" className="">Merchant</a> / Developer / Webhook </span>
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
            </div>
            <div className="product-status mg-b-30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="product-status-wrap">
                                <div className="d-flex align-content-center justify-content-between mb-3">
                                    <h4 className="mb-0">Webhook List</h4>
                                    <div className="add-product">
                                        <a className="ms-2 mb-2" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/merchant/developer/add`}>Add Webhook</a>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            {/* <th>Logo</th> */}
                                            <th>Webhook Event</th>
                                            <th>Webhook URL</th>
                                            <th>Settings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {webhook.results.length > 0 ?
                                            webhook.results.map((wehbook, index) => {
                                                return <tr key={index}>
                                                    <td>{wehbook.webhook_event}</td>
                                                    <td>{wehbook.webhook_uri}</td>
                                                    <td>
                                                        {/* <button data-toggle="tooltip" title="Edit" className="btn btn-sm btn-warning" onClick={() => router.push(`/admin/developer/${wehbook.id}`)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button> */}
                                                        <button data-toggle="tooltip" title="Trash" className="btn btn-sm btn-danger ms-2" onClick={() => deleteWebhook(wehbook.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    </td>
                                                </tr>
                                            }) : <></>}
                                    </tbody>
                                </table>
                                <Pagination onPageChanged={onPageChange} _page={parseInt(webhook._page)} _pagesize={parseInt(webhook._pagesize)} totalItem={webhook.total} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}