import React, { Component } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import withRouter from './../../../withRouter';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Url from "./../../configure.js";

class Editslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            image: "",
            file: null,
            status: 0,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        axios
            .post(Url.baseUrl+`api/proservice-edit/${this.props.params.id}`)
            .then(response => {
                this.setState({
                    title: response.data.data.title,
                    description: response.data.data.description,
                    file: Url.baseUrl+'/public/uploads/professional-service/' + response.data.data.image,
                    status: response.data.data.status,
                })
            })
    }


    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ image: event.target.files[0] })
    }

    handleInputChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        var firstFormData = new FormData();
        firstFormData.append("id", this.props.params.id);
        firstFormData.append("title", this.state.title);
        firstFormData.append("description", this.state.description);
        firstFormData.append("image", this.state.image);
        firstFormData.append("status", this.state.status);

        axios
            .post(Url.baseUrl+'api/proservice-update', firstFormData, {})
            .then(res => {
                if (res.data.status === 200) {
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/proservice-list";
                    }, 2000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgTitle: res.data.errors.slider_title,
                        errMsgSubDesc: res.data.errors.description
                    });
                }
            })
            .catch(err => console.log(err));
    }
    render() { 
        return (
            <>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h2 className="m-0">Edit Pro Service</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Pro Service</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <form id="quickForm" onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input type="text" name="title" className="form-control" id="title" placeholder="Title" onChange={this.handleInputChange} value={this.state.title} />
                                            <span className="text-danger">{this.state.errMsgTitle}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea name="description" className="form-control" id="description" placeholder="Description" onChange={this.handleInputChange} value={this.state.description}></textarea>
                                            <span className="text-danger">{this.state.errMsgDesc}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" name="image" className="form-control" id="image" onChange={this.handleChange} />
                                            <span className="text-danger">{this.state.errMsgAtt}</span>
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />

                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select name="status" className="form-control" id="status" value={this.state.status} onChange={this.handleInputChange}>
                                                <option value='1'>Active</option>
                                                <option value='0'>Inactive</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="card-footer">
                                        <ToastContainer />
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        );
    };

}
export default withRouter(Editslider);