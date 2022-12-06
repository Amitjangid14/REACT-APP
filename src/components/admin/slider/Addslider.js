import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Url from "./../../configure.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Addslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider_title: "",
            slider_subtitle: "",
            btnurl: "",
            attachment: "",
            file: null,
            status: 1,
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        this.setState({attachment: event.target.files[0]})
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
        firstFormData.append("slider_title",this.state.slider_title);
        firstFormData.append("slider_subtitle",this.state.slider_subtitle);
        firstFormData.append("btnurl",this.state.btnurl);
        firstFormData.append("attachment",this.state.attachment);
        firstFormData.append("status",this.state.status);

        axios
            .post(Url.baseUrl+'api/addslider', firstFormData, {})
            .then(res => {
                if (res.data.status === 200) {
                    console.log(res.data.status);
                    toast.success('successfull') 
                    setTimeout(() => {
                        window.location="/admin/sliderlist"; 
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                  ) {
                    this.setState({
                      errMsgTitle: res.data.errors.slider_title,
                      errMsgSubTitle: res.data.errors.slider_subtitle,
                      errMsgAtt: res.data.errors.attachment,
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
                                <h2 className="m-0">Add Slider</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Add Slider</li>
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
                                            <label htmlFor="slider_title">Slider Title</label>
                                            <input type="text" name="slider_title" className="form-control" id="slider_title" placeholder="Slider Title" onChange={this.handleInputChange} value={this.state.slider_title} />
                                            <span className="text-danger">{this.state.errMsgTitle}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="slider_subtitle">Slider Subtitle</label>
                                            <input type="text" name="slider_subtitle" className="form-control" id="slider_subtitle" placeholder="Slider Subtitle" onChange={this.handleInputChange} value={this.state.slider_subtitle}/>
                                            <span className="text-danger">{this.state.errMsgSubTitle}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="btnurl">Button Url</label>
                                            <input type="text" name="btnurl" className="form-control" id="btnurl" placeholder="Button Url" onChange={this.handleInputChange} value={this.state.btnurl} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="attachment">Slider Image</label>
                                            <input type="file" name="attachment" className="form-control" id="attachment" placeholder="Slider Image" onChange={this.handleChange} />
                                            <span className="text-danger">{this.state.errMsgAtt}</span>
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />

                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select name="status" className="form-control" id="status" value={this.state.status} onChange={this.handleInputChange}>
                                                <option value='1' >Active</option>
                                                <option value='0' >Inactive</option>
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