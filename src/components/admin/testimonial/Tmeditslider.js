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
            name: "",
            designation: "",
            testimonial: "",
            image: "",
            file: null,
            status: 1,
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        axios
            .post(Url.baseUrl+`api/gettmslideredit/${this.props.params.id}`)
            .then(response => {
                this.setState({
                    name: response.data.data.name,
                    designation: response.data.data.designation,
                    testimonial: response.data.data.testimonial,
                    file: Url.baseUrl+'/public/uploads/testimonial/' + response.data.data.image,
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
        firstFormData.append("name",this.state.name);
        firstFormData.append("designation",this.state.designation);
        firstFormData.append("testimonial",this.state.testimonial);
        firstFormData.append("image",this.state.image);
        firstFormData.append("status",this.state.status);

        axios
            .post(Url.baseUrl+'api/updatetmslider', firstFormData, {})
            .then(res => {
                if (res.data.status === 200) {
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/tmsliderlist";
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgname: res.data.errors.name,
                      errMsgDg: res.data.errors.designation,
                      errMsgTm: res.data.errors.testimonial
                    });
                }
            })
            .catch(err => console.log(err));
    }
    render() { 
        let option_id = [1, 0];
        let options = [{ name: 'Active' }, { name: 'Inctive' }];
        return (
            <>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h2 className="m-0">Edit Slider</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Slider</li>
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
                                            <label htmlFor="name">Name</label>
                                            <input type="text" name="name" className="form-control" id="name" placeholder="Name" onChange={this.handleInputChange} value={this.state.name} />
                                            <span className="text-danger">{this.state.errMsgname}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="designation">Designation</label>
                                            <input type="text" name="designation" className="form-control" id="designation" placeholder="Designation" onChange={this.handleInputChange} value={this.state.designation}/>
                                            <span className="text-danger">{this.state.errMsgSubDes}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="testimonial">Testimonial</label>
                                            <input type="text" name="testimonial" className="form-control" id="testimonial" placeholder="Testimonial" onChange={this.handleInputChange} value={this.state.testimonial} />
                                            <span className="text-danger">{this.state.errMsgTm}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" name="image" className="form-control" id="image" onChange={this.handleChange} />
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />

                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select name="status" className="form-control" id="status" value={this.state.status} onChange={this.handleInputChange}>
                                                {option_id.map(id =>
                                                    <option key={id} value={id}>{options[id].name}</option>
                                                )}
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