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
            subtitle: "",
            description: "",
            btnurl: '',
            team_member_count: '',
            satisfied_count: '',
            experiance_count: '',
            image: "",
            file: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        axios
            .post(Url.baseUrl + `api/statistic-edit/${this.props.params.id}`)
            .then(response => {
                this.setState({
                    title: response.data.data.title,
                    subtitle: response.data.data.subtitle,
                    file: Url.baseUrl + '/public/uploads/statistics/' + response.data.data.image,
                    description: response.data.data.description,
                    btnurl: response.data.data.btnurl,
                    team_member_count: response.data.data.team_member_count,
                    satisfied_count: response.data.data.satisfied_count,
                    experiance_count: response.data.data.experiance_count,
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
        firstFormData.append("subtitle", this.state.subtitle);
        firstFormData.append("image", this.state.image);
        firstFormData.append("description", this.state.description);
        firstFormData.append("btnurl", this.state.btnurl);
        firstFormData.append("team_member_count", this.state.team_member_count);
        firstFormData.append("satisfied_count", this.state.satisfied_count);
        firstFormData.append("experiance_count", this.state.experiance_count);

        axios
            .post(Url.baseUrl + 'api/statistic-update', firstFormData)
            .then(res => {
                if (res.data.status === 200) {
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/ourlist";
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgTitle: res.data.errors.title,
                        errMsgSubTitle: res.data.errors.subtitle,
                        errMsgDescription: res.data.errors.description,
                        errMsgTeam: res.data.errors.team_member_count,
                        errMsgSati: res.data.errors.satisfied_count,
                        errMsgExp: res.data.errors.experiance_count,
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
                                <h2 className="m-0">Edit Statistic</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Statistic</li>
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
                                            <label htmlFor="subtitle">Subtitle</label>
                                            <input type="text" name="subtitle" className="form-control" id="subtitle" placeholder="Subtitle" onChange={this.handleInputChange} value={this.state.subtitle} />
                                            <span className="text-danger">{this.state.errMsgSubTitle}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea name="description" className="form-control" id="description" placeholder="Description" onChange={this.handleInputChange} value={this.state.description}></textarea>
                                            <span className="text-danger">{this.state.errMsgDescription}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="team_member_count">Expert Team Members</label>
                                            <input type="text" name="team_member_count" className="form-control" id="team_member_count" placeholder="Expert Team Members" onChange={this.handleInputChange} value={this.state.team_member_count} />
                                            <span className="text-danger">{this.state.errMsgTeam}</span>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="satisfied_count">Client Satisfaction Survey In Consulting Organization</label>
                                            <input type="text" name="satisfied_count" className="form-control" id="satisfied_count" placeholder="Client Satisfaction Survey In Consulting Organization" onChange={this.handleInputChange} value={this.state.satisfied_count} />
                                            <span className="text-danger">{this.state.errMsgSati}</span>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="experiance_count">Years Experiance Our Company</label>
                                            <input type="text" name="experiance_count" className="form-control" id="experiance_count" placeholder="Years Experiance Our Company" onChange={this.handleInputChange} value={this.state.experiance_count} />
                                            <span className="text-danger">{this.state.errMsgExp}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="btnurl">Btnurl</label>
                                            <input type="text" name="btnurl" className="form-control" id="btnurl" placeholder="Btnurl" onChange={this.handleInputChange} value={this.state.btnurl} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" name="image" className="form-control" id="image" placeholder="Image" onChange={this.handleChange} />
                                            <span className="text-danger">{this.state.errMsgImg}</span>
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />
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