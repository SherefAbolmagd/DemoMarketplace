import Head from 'next/head';
import Api from '../../../../api/Merchant';
import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Row, Col, Button, Table } from 'react-bootstrap';
import Pagination from '../../../../components/Pagination.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import basepath, { navigate } from '../../../../components/basepath';
import product_categories from '../../../../../json/product_categories.json';
import Big from 'big.js';

export default function InventoryList() {
    const [inventories, setInventory] = useState({ results: [], _page: 1, _pagesize: 20 });
    // const { results, _page, _pagesize, total } = inventories;
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });

    useEffect(() => {
        listInventories();
    }, [paginate])

    const listInventories = async () => {
        try {
            const res = await Api.listInventories({ _page: paginate._page, _pagesize: paginate._pagesize })
            setInventory(res);
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    // Page Change Handler
    const onPageChanged = ({ _page, _pagesize }) => {
        setPaginate({ _page, _pagesize });
    }

    const onUpdateStatus = async (ev, inventory_id) => {
        try {
            const checked = ev.target.checked;
            const status = checked ? 1 : 0;

            await Api.updateInventoryStatus({ inventory_ids: [inventory_id], status });
            setPaginate({ _page: 1, _pagesize: 20 });
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const onDelete = async (inventory_id) => {
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
                await Api.deleteInventory({ inventory_ids: [inventory_id] })

                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success'
                );

                listInventories();
            }
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>
        <Head>
            <title>My Inventory | DoctorOnCall</title>
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
                                        <div className="text-dark">
                                            <i className="fa fa-tasks icon-wrap"></i>
                                            <span className="mini-click-non">Inventory / Inventory List</span>
                                        </div>
                                    </div>
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
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h4 className="mb-0">Inventory List</h4>
                                    <a href={basepath("/merchant/product/inventory/add")}>
                                        <button className="btn btn-primary" style={{ float: "right" }}
                                        >Add Inventory</button>
                                    </a>
                                </div>
                                <table className="w-100" hover responsive>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 50 }}>
                                                <Form.Group >
                                                    <Form.Check type="checkbox" />
                                                </Form.Group>
                                            </th>
                                            <th>Product</th>
                                            <th>Variant</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Status</th>
                                            <th style={{ width: 300 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventories.results.map(({ id, product_name, variant_name, price, has_stock, stock, inventory_status }) => <tr>
                                            <td>
                                                <Form.Group>
                                                    <Form.Check type="checkbox" />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <span>{product_name}</span>
                                            </td>
                                            <td>
                                                <span>{variant_name}</span>
                                            </td>
                                            <td>
                                                <span>{Big(price || 0).toFixed(2)}</span>
                                            </td>
                                            <td>
                                                <span>{has_stock ? Big(stock || 0).toFixed(0) : ""}</span>
                                            </td>
                                            <td>
                                                <div className="form-switch">
                                                    <input className="form-check-input me-1" type="checkbox" id="flexSwitchCheckDefault"
                                                        checked={!!inventory_status} onChange={ev => onUpdateStatus(ev, id)} />
                                                    <label className={`form-check-label ${inventory_status ? "text-primary" : "text-warning"} fw-bold`} htmlFor="flexSwitchCheckDefault">{inventory_status ? "Published" : "Draft"}</label>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <Button variant="primary" as="a" href={basepath(`/merchant/product/inventory/${id}`)}>Edit</Button>
                                                    &emsp;
                                                    <Button variant="danger" onClick={() => onDelete(id)} >Delete</Button>
                                                </div>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination onPageChanged={onPageChanged} _page={parseInt(inventories._page || 1)} _pagesize={parseInt(inventories._pagesize || 20)} totalItem={inventories.total} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}