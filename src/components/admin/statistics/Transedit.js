import React, { Component } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import withRouter from './../../../withRouter';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Url from "./../../configure.js";

class Ouredit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            cost_reduction_per: '',
            efficiency_per: '',
            client_satisfaction_per: '',
            image: "",
            image1: "",
            file: null,
            file1: null,
        };
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        axios
            .post(Url.baseUrl + `api/transforming-edit/${this.props.params.id}`)
            .then(response => {
                this.setState({
                    title: response.data.data.title,
                    file: Url.baseUrl + '/public/uploads/transforming/' + response.data.data.image,
                    file1: Url.baseUrl + '/public/uploads/transforming/' + response.data.data.image1,
                    description: response.data.data.description,
                    cost_reduction_per: response.data.data.cost_reduction_per,
                    efficiency_per: response.data.data.efficiency_per,
                    client_satisfaction_per: response.data.data.client_satisfaction_per,
                })
            })
    }
    handleChangeFirst(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            file1: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ image: event.target.files[0] })
    }
    handleChangeSecond(event) {
        this.setState({
            file1: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ image1: event.target.files[0] })
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
        firstFormData.append("image", this.state.image);
        firstFormData.append("image1", this.state.image1);
        firstFormData.append("description", this.state.description);
        firstFormData.append("cost_reduction_per", this.state.cost_reduction_per);
        firstFormData.append("efficiency_per", this.state.efficiency_per);
        firstFormData.append("client_satisfaction_per", this.state.client_satisfaction_per);

        axios
            .post(Url.baseUrl + 'api/transforming-update', firstFormData)
            .then(res => {
                if (res.data.status === 200) {
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/trans-list";
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgTitle: res.data.errors.title,
                        errMsgDescription: res.data.errors.description,
                        errMsg1: res.data.errors.cost_reduction_per,
                        errMsg2: res.data.errors.efficiency_per,
                        errMsg3: res.data.errors.client_satisfaction_per,
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
                                <h2 className="m-0">Edit Transforming</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Transforming</li>
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
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cost_reduction_per">Cost reduction</label>
                                            <input type="text" name="cost_reduction_per" className="form-control" id="cost_reduction_per" placeholder="Cost reduction %" onChange={this.handleInputChange} value={this.state.cost_reduction_per} />
                                            <span className="text-danger">{this.state.errMsg1}</span>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="efficiency_per">Efficiency</label>
                                            <input type="text" name="efficiency_per" className="form-control" id="efficiency_per" placeholder="Efficiency %" onChange={this.handleInputChange} value={this.state.efficiency_per} />
                                            <span className="text-danger">{this.state.errMsg2}</span>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="client_satisfaction_per">Client satisfaction</label>
                                            <input type="text" name="client_satisfaction_per" className="form-control" id="client_satisfaction_per" placeholder="Client satisfaction %" onChange={this.handleInputChange} value={this.state.client_satisfaction_per} />
                                            <span className="text-danger">{this.state.errMsg3}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" name="image" className="form-control" id="image" placeholder="Image" onChange={this.handleChangeFirst} />
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />
                                        <div className="form-group">
                                            <label htmlFor="image1">Image Second</label>
                                            <input type="file" name="image1" className="form-control" id="image1" placeholder="Image" onChange={this.handleChangeSecond} />
                                        </div>
                                        <img src={this.state.file1} style={{ width: "100px" }} />
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
export default withRouter(Ouredit);