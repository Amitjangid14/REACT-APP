import React, { Component } from "react";
import axios from "axios";
import Url from "./../../configure.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserHistory } from 'history'
export const history = createBrowserHistory();

export default class Addcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            title: "", 
            subtitle: "", 
            description: "", 
            description1: "", 
            advantage_1: "", 
            advantage_2: "", 
            advantage_3: "", 
            advantage_4: "", 
            advantage_5: "", 
            image: "",
            image2: "",
            title2: "",
            description2: "",
        };
        this.handleChange =  this.handleChange.bind(this);
        this.handleInputChange =  this.handleInputChange.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this)
        console.log(this.props)
    }

    handleInputChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ image: event.target.files[0] })
    }
    handleChangeSecond(event) {
        this.setState({
            file1: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ image2: event.target.files[0] })
    }

    handleSubmit(e) {
        e.preventDefault();
        var firstFormData = new FormData(); 
        firstFormData.append("name",this.state.name);
        firstFormData.append("title",this.state.title);
        firstFormData.append("subtitle",this.state.subtitle);
        firstFormData.append("description",this.state.description);
        firstFormData.append("description1",this.state.description1);
        firstFormData.append("advantage_1",this.state.advantage_1);
        firstFormData.append("advantage_2",this.state.advantage_2);
        firstFormData.append("advantage_3",this.state.advantage_3);
        firstFormData.append("advantage_4",this.state.advantage_4);
        firstFormData.append("advantage_5",this.state.advantage_5);
        firstFormData.append("image",this.state.image);
        firstFormData.append("image2",this.state.image2);
        firstFormData.append("title2",this.state.title2);
        firstFormData.append("description2",this.state.description2);

        axios
            .post(Url.baseUrl+'api/service-add',firstFormData, {})
            .then(res => {
                if (res.data.status === 200) {
                    console.log(res.data.status);
                    toast.success('successfull') 
                    setTimeout(() => {
                        window.history.back(); 
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                  ) {
                    this.setState({
                        errMsgName: res.data.errors.name,
                        errMsgT: res.data.errors.title,
                        errMsgSub: res.data.errors.subtitle,
                        errMsgDes: res.data.errors.description,
                        errMsgDes1: res.data.errors.description1,
                        errMsgAD1: res.data.errors.advantage_1,
                        errMsgAD2: res.data.errors.advantage_2,
                        errMsgAD3: res.data.errors.advantage_3,
                        errMsgAD4: res.data.errors.advantage_4,
                        errMsgAD5: res.data.errors.advantage_5,
                        errMsgT2: res.data.errors.title2,
                        errMsgDes2: res.data.errors.description2,
                        errMsgImg: res.data.errors.image,
                        errMsgImg2: res.data.errors.image2,
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
                                <h2 className="m-0">Add Service</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Add Service</li>
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
                                            <label htmlFor="name">Service Name</label>
                                            <input type="text" name="name" className="form-control" id="name" placeholder="Service Name" onChange={this.handleInputChange} value={this.state.name} />
                                            <span className="text-danger">{this.state.errMsgName}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input type="text" name="title" className="form-control" id="title" placeholder="Title" onChange={this.handleInputChange} value={this.state.title} />
                                            <span className="text-danger">{this.state.errMsgT}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="Subtitle">Subtitle</label>
                                            <input type="text" name="subtitle" className="form-control" id="Subtitle" placeholder="Subtitle" onChange={this.handleInputChange} value={this.state.subtitle} />
                                            <span className="text-danger">{this.state.errMsgSub}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea className="form-control" placeholder="Description" name="description" onChange={this.handleInputChange} value={this.state.description}></textarea>
                                            <span className="text-danger">{this.state.errMsgDes}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description1">Description Second</label>
                                            <textarea className="form-control" placeholder="Description Second" name="description1" onChange={this.handleInputChange} value={this.state.description1}></textarea>
                                            <span className="text-danger">{this.state.errMsgDes1}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="advantage_1">Advantage 1</label>
                                            <input type="text" name="advantage_1" className="form-control" id="advantage_1" placeholder="Advantage 1" onChange={this.handleInputChange} value={this.state.advantage_1} />
                                            <span className="text-danger">{this.state.errMsgAD1}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="advantage_2">Advantage 2</label>
                                            <input type="text" name="advantage_2" className="form-control" id="advantage_2" placeholder="Advantage 2" onChange={this.handleInputChange} value={this.state.advantage_2} />
                                            <span className="text-danger">{this.state.errMsgAD2}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="advantage_3">Advantage 3</label>
                                            <input type="text" name="advantage_3" className="form-control" id="advantage_3" placeholder="Advantage 3" onChange={this.handleInputChange} value={this.state.advantage_3} />
                                            <span className="text-danger">{this.state.errMsgAD3}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="advantage_4">Advantage 4</label>
                                            <input type="text" name="advantage_4" className="form-control" id="advantage_4" placeholder="Advantage 4" onChange={this.handleInputChange} value={this.state.advantage_4} />
                                            <span className="text-danger">{this.state.errMsgAD4}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="advantage_5">Advantage 5</label>
                                            <input type="text" name="advantage_5" className="form-control" id="advantage_5" placeholder="Advantage 5" onChange={this.handleInputChange} value={this.state.advantage_5} />
                                            <span className="text-danger">{this.state.errMsgAD5}</span>
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" name="image" className="form-control" id="image" placeholder="Image" onChange={this.handleChange} />
                                            <span className="text-danger">{this.state.errMsgImg}</span>
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />

                                        <div className="form-group">
                                            <label htmlFor="image2">Image Second</label>
                                            <input type="file" name="image2" className="form-control" id="image2" placeholder="Image" onChange={this.handleChangeSecond} />
                                            <span className="text-danger">{this.state.errMsgImg2}</span>
                                        </div>
                                        <img src={this.state.file1} style={{ width: "100px" }} />

                                        <div className="form-group">
                                            <label htmlFor="title2">Title Second</label>
                                            <input type="text" name="title2" className="form-control" id="title2" placeholder="Title Second" onChange={this.handleInputChange} value={this.state.title2} />
                                            <span className="text-danger">{this.state.errMsgT2}</span>
                                        </div> 

                                        <div className="form-group">
                                            <label htmlFor="description2">Description Third</label>
                                            <textarea className="form-control" placeholder="Description Third" name="description2" onChange={this.handleInputChange} value={this.state.description2}></textarea>
                                            <span className="text-danger">{this.state.errMsgDes2}</span>
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