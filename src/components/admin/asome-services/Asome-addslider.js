import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Url from "./../../configure.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Paddslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            short_desc: "",
            image: "",
            file: null,
            status: 1,
            skill: [],
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeS = this.handleChangeS.bind(this);
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
    handleChangeS (e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({skill: value});
      }

    handleSubmit(e) {
        e.preventDefault();
        var firstFormData = new FormData();
        
        firstFormData.append("title", this.state.title);
        firstFormData.append("short_desc", this.state.short_desc);
        firstFormData.append("image", this.state.image);
        firstFormData.append("skill", this.state.skill);
        firstFormData.append("status", this.state.status);

        axios
            .post(Url.baseUrl + 'api/awesome-add', firstFormData, {})
            .then(res => {
                if (res.data.status === 200) {
                    console.log(res.data.status);
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/asome-list";
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgTitle: res.data.errors.title,
                        errMsgShortDesc: res.data.errors.subtitle,
                        errMsgImg: res.data.errors.image,
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
                                <h2 className="m-0">Add Awesome Services Slider</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Add Awesome Services Slider</li>
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
                                            <label htmlFor="short_desc">Short Description</label>
                                            <input type="text" name="short_desc" className="form-control" id="short_desc" placeholder="Short Description" onChange={this.handleInputChange} value={this.state.short_desc} />
                                            <span className="text-danger">{this.state.errMsgShortDesc}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" name="image" className="form-control" id="image" placeholder="Image" onChange={this.handleChange} />
                                            <span className="text-danger">{this.state.errMsgImg}</span>
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />

                                        <div className="form-group">
                                            <label htmlFor="skill">Skill</label>
                                            <select name="skill" multiple={true} className="form-control" id="skill" value={this.state.skill} onChange={this.handleChangeS}>
                                                <option value='PHP' >PHP</option>
                                                <option value='JAVASCRIPT' >JAVASCRIPT</option>
                                                <option value='JAVA' >JAVA</option>
                                                <option value='HTML' >HTML</option>
                                                <option value='CSS' >CSS</option>
                                                <option value='Bootstrap' >Bootstrap</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select name="status"  className="form-control" id="status" value={this.state.status} onChange={this.handleInputChange}>
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