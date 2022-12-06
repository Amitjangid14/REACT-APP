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

    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        axios
            .post(Url.baseUrl+`api/getslideredit/${this.props.params.id}`)
            .then(response => {
                this.setState({
                    slider_title: response.data.data.slider_title,
                    slider_subtitle: response.data.data.slider_subtitle,
                    btnurl: response.data.data.btnurl,
                    file: Url.baseUrl+'/public/uploads/slider/' + response.data.data.attachment,
                    status: response.data.data.status,
                })
            })
    }


    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ attachment: event.target.files[0] })
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
        firstFormData.append("slider_title", this.state.slider_title);
        firstFormData.append("slider_subtitle", this.state.slider_subtitle);
        firstFormData.append("btnurl", this.state.btnurl);
        firstFormData.append("attachment", this.state.attachment);
        firstFormData.append("status", this.state.status);

        axios
            .post(Url.baseUrl+'api/updateslider', firstFormData, {})
            .then(res => {
                if (res.data.status === 200) {
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/sliderlist";
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgTitle: res.data.errors.slider_title,
                        errMsgSubTitle: res.data.errors.slider_subtitle
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
                                            <label htmlFor="slider_title">Slider Title</label>
                                            <input type="text" name="slider_title" className="form-control" id="slider_title" placeholder="Slider Title" onChange={this.handleInputChange} value={this.state.slider_title} />
                                            <span className="text-danger">{this.state.errMsgTitle}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="slider_subtitle">Slider Subtitle</label>
                                            <input type="text" name="slider_subtitle" className="form-control" id="slider_subtitle" placeholder="Slider Subtitle" onChange={this.handleInputChange} value={this.state.slider_subtitle} />
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