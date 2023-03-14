import Head from 'next/head';
import Api from '../../../api/Admin';
import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/Pagination.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import basepath, { navigate } from '../../../components/basepath';

export default function userList() {
    const router = useRouter()
    const [users, setUsers] = useState({ results: [] });
    const [paginate, setPaginate] = useState({ _page: 1, _pagesize: 20 });

    useEffect(() => {
        listUsers();
    }, [paginate]);

    const listUsers = async () => {
        try {
            const result = await Api.listUsers(paginate);
            setUsers(result)
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const deleteUser = async (user_id) => {
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
                    await Api.deleteUser(user_id);
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                    )
                }
            })
            listUsers();
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    const onPageChange = async({_page, _pagesize}) => {
        try {
            setPaginate({ _page, _pagesize})
        } catch (ex) {
            toast.warning(ex.message)
        }
    }

    return <>

        <Head>
            <title>User List | DoctorOnCall</title>
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
                                                <span className="mini-click-non"><a href="#" className="">Admin</a> / User List</span>
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
                                    <h4 className="mb-0">User List</h4>
                                    <div className="add-product">
                                        <a className="ms-2 mb-2" href={`${process.env.NEXT_PUBLIC_BASEPATH||""}/admin/user/add`}>Add User</a>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Email Verified</th>
                                            <th>Phone</th>
                                            <th>Phone Verified</th>
                                            <th>Created At</th>
                                            <th>Settings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.results.length > 0 ?
                                            users.results.map((user, index) => {
                                                return <tr key={index}>
                                                    <td>{user.full_name}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.email_verified_at}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.phone_verified_at}</td>
                                                    <td>{user.created_at}</td>
                                                    <td>
                                                        <button data-toggle="tooltip" title="Edit" className="btn btn-sm btn-warning" onClick={() => navigate.push(`/admin/user/${user.id}`)}>
                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                        </button>
                                                        <button data-toggle="tooltip" title="Trash" className="btn btn-sm btn-danger ms-2" onClick={() => deleteUser(user.id)}>
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            }) : <tr><td className="text-danger text-center" colSpan="100%">No User Available</td></tr>}
                                    </tbody>
                                </table>
                                <Pagination onPageChanged={onPageChange} _page={parseInt(users._page)} _pagesize={parseInt(users._pagesize)} totalItem={users.total}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}