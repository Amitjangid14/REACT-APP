import React, { Component } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import withRouter from './../../../withRouter';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Url from "./../../configure.js";

class Fditslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            subtitle: "",
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
            .post(Url.baseUrl + `api/getfslideredit/${this.props.params.id}`)
            .then(response => {
                this.setState({
                    title: response.data.data.title,
                    subtitle: response.data.data.subtitle,
                    file: Url.baseUrl + '/public/uploads/featureslider/' + response.data.data.image,
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
        firstFormData.append("subtitle", this.state.subtitle);
        firstFormData.append("image", this.state.image);
        firstFormData.append("status", this.state.status);

        axios
            .post(Url.baseUrl + 'api/updatefslider', firstFormData)
            .then(res => {
                if (res.data.status === 200) {
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/fsliderlist";
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgTitle: res.data.errors.title,
                        errMsgSubTitle: res.data.errors.subtitle
                    });
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        let option_id = [0, 1];
        let options = [{ name: 'Active' }, { name: 'Inctive' }];
        return (
            <>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h2 className="m-0">Edit Feature Slider</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Feature Slider</li>
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
                                            <label htmlFor="attachment">Image</label>
                                            <input type="file" name="attachment" className="form-control" id="attachment" placeholder="Image" onChange={this.handleChange} />
                                        </div>
                                        <img src={this.state.file} style={{ width: "100px" }} />

                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select name="status" className="form-control" id="status" value={this.state.status} onChange={this.handleInputChange}>
                                                {option_id.map(id =>
                                                    <option key={id} value={id}>{options[id].name}</option>
                                                )}
                                            </select>
                                            {/* <select name="status" className="form-control" id="status" value={this.state.status} onChange={this.handleInputChange}>
                                                <option value='1' selected={this.state.status == 1} >Active</option>
                                                <option value='0' selected={this.state.status == 0} >Inactive</option>
                                            </select> */}
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
export default withRouter(Fditslider);