import React, { Component } from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import axios from "axios";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import Url from "./../../configure.js";

class PortfolioDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdetail: []
        };
    }
    componentDidMount() {
        this.fetchData()
        setTimeout(function () {
            $("#example").DataTable({
                pagingType: "full_numbers",
                pageLength: 10,
                processing: true,
                destroy: true,
            });
        }, 1000);
    }
    fetchData = () => {
        axios.get(Url.baseUrl + "api/get-portfoliodetail")
            .then(response => {
                this.setState({
                    pdetail: response.data.data
                })
            })
    }

    deleteDt = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(Url.baseUrl + `api/delete-portfoliodetail/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            this.fetchData()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }


    render() {
        return (
            <div className="container-fluid py-4">
                <div className="table-responsive p-0 pb-2">
                    <div className="search">
                        <Link to='/admin/portfoliodt-add' className='btn btn-info btn-sm me-2' style={{ float: "right" }}>
                            Add Portfolio Detail
                        </Link>
                    </div>
                    <table id="example" className="table align-items-center justify-content-center mb-0">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Project Info.</th> 
                                <th>Development Approach</th> 
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.pdetail.map((pdt,i) => (<tr key={(pdt.id)}>
                                <td>{i+1}</td>
                                <td>{pdt.project_info.substring(0,50)}</td>  
                                <td>{pdt.dev_appro.substring(0,50)}</td>  
                                <td>
                                    <Link to={`/admin/portfoliodt-edit/${pdt.id}`} className='btn btn-primary btn-sm me-2'>
                                        Edit
                                    </Link>
                                    <Button className="btn btn-danger btn-sm" onClick={() => this.deleteDt(pdt.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>))}


                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PortfolioDetail;