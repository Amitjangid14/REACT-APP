import React, { Component } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import withRouter from './../../../withRouter';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Url from "./../../configure.js";

class Peditslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio_id: "",
            project_info: "",
            dev_appro: "",
            client_name: "",
            date: "",
            trade: "",
            team_member: "",
            project_time: "",
            technology: "",
            plateform: "",
            fb: "",
            yt: "",
            tw: "",
            ln: "",
            in: "",
            image: [],
            file: null,
            portfoliolist: [],
            getfile: '',
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.selectPortfolio = this.selectPortfolio.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.fetchPortfolioData();
    }


    fetchData = () => {
        axios
            .post(Url.baseUrl + `api/portfoliodetail-edit/${this.props.params.id}`)
            .then(response => {
                this.setState({
                    portfolio_id: response.data.data.portfolio_id,
                    project_info: response.data.data.project_info,
                    dev_appro: response.data.data.dev_appro,
                    client_name: response.data.data.client_name,
                    date: response.data.data.date,
                    trade: response.data.data.trade,
                    team_member: response.data.data.team_member,
                    project_time: response.data.data.project_time,
                    technology: response.data.data.technology,
                    plateform: response.data.data.plateform,
                    fb: response.data.data.fb,
                    yt: response.data.data.yt,
                    tw: response.data.data.tw,
                    ln: response.data.data.ln,
                    in: response.data.data.in,
                    getfile: response.data.data.get_images,
                    status: response.data.data.status,
                    color: response.data.data.color,
                    btnurl: response.data.data.btnurl,
                    skill: response.data.data.skill,
                    category: response.data.data.category,
                })
            })
    }
    fetchPortfolioData = () => {
        axios
            .get(Url.baseUrl + `api/getpslider`)
            .then(response => {
                this.setState({
                    portfoliolist: response.data.data
                })
            })
    }

    selectPortfolio = (e) => {
        this.setState({ portfolio_id: e.target.value });
    }

    handleChange(event) {
        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }
        this.setState({ image: [...this.state.image, ...event.target.files] })

        this.setState({
            file: images
        });

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
        firstFormData.append("portfolio_id", this.state.portfolio_id);
        firstFormData.append("project_info", this.state.project_info);
        firstFormData.append("dev_appro", this.state.dev_appro);
        firstFormData.append("client_name", this.state.client_name);
        firstFormData.append("date", this.state.date);
        firstFormData.append("trade", this.state.trade);
        firstFormData.append("team_member", this.state.team_member);
        firstFormData.append("project_time", this.state.project_time);
        firstFormData.append("technology", this.state.technology);
        firstFormData.append("plateform", this.state.plateform);
        this.state.image.forEach((image_file) => {
            firstFormData.append('image[]', image_file);
        });

        firstFormData.append("fb", this.state.fb);
        firstFormData.append("yt", this.state.yt);
        firstFormData.append("tw", this.state.tw);
        firstFormData.append("ln", this.state.ln);
        firstFormData.append("in", this.state.in);

        axios
            .post(Url.baseUrl + 'api/portfoliodetail-update', firstFormData)
            .then(res => {
                if (res.data.status === 200) {
                    console.log(res.data.status);
                    toast.success('successfull')
                    setTimeout(() => {
                        window.location = "/admin/portfoliodt-list";
                    }, 3000);
                }
                if (
                    res.data.status === "failed" &&
                    res.data.success === undefined
                ) {
                    this.setState({
                        errMsgproject: res.data.errors.project_info,
                        errMsgDev: res.data.errors.dev_appro,
                        errMsgClient: res.data.errors.client_name,
                        errMsgDate: res.data.errors.date,
                        errMsgTrade: res.data.errors.trade,
                        errMsgTeam: res.data.errors.team_member,
                        errMsgTime: res.data.errors.project_time,
                        errMsgT: res.data.errors.technology,
                        errMsgPlateform: res.data.errors.plateform,
                        errMsgImg: res.data.errors.image,
                    });
                }
            })
            .catch(err => console.log(err));
    }
    
    render() {
        const { portfoliolist } = this.state;
        let catList = portfoliolist.length > 0
            && portfoliolist.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.title}</option>
                )

            }, this);
        return (
            <>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h2 className="m-0">Edit Portfolio Detail</h2>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Portfolio Detail</li>
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
                                            <label htmlFor="portfolio">Portfolio</label>
                                            <select name="portfolio" className="form-control" id="portfolio" value={this.state.portfolio_id} onChange={this.selectPortfolio} required>
                                                <option value="">Select Portfolio</option>
                                                {catList}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="project_info">Project Information</label>
                                            <textarea name="project_info" className="form-control" id="project_info" placeholder="Project Infomation" onChange={this.handleInputChange} value={this.state.project_info}></textarea>
                                            <span className="text-danger">{this.state.errMsgproject}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="dev_appro">Development Approach</label>
                                            <textarea name="dev_appro" className="form-control" id="dev_appro" placeholder="Development Approach" onChange={this.handleInputChange} value={this.state.dev_appro} required></textarea>
                                            <span className="text-danger">{this.state.errMsgDev}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="client_name">Client Name</label>
                                            <input type="text" name="client_name" className="form-control" id="client_name" placeholder="Client Name" onChange={this.handleInputChange} value={this.state.client_name} required />
                                            <span className="text-danger">{this.state.errMsgClient}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="date">Date</label>
                                            <input type="date" name="date" className="form-control" id="date" onChange={this.handleInputChange} value={this.state.date} required />
                                            <span className="text-danger">{this.state.errMsgDate}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="trade">Trade</label>
                                            <input type="text" name="trade" className="form-control" id="trade" placeholder="Trade" onChange={this.handleInputChange} value={this.state.trade} required />
                                            <span className="text-danger">{this.state.errMsgTrade}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="team_member">Team Member</label>
                                            <input type="text" name="team_member" className="form-control" id="team_member" placeholder="Team Member" onChange={this.handleInputChange} value={this.state.team_member} required />
                                            <span className="text-danger">{this.state.errMsgTeam}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="project_time">Project Time</label>
                                            <input type="text" name="project_time" className="form-control" id="project_time" placeholder="Project Time" onChange={this.handleInputChange} value={this.state.project_time} required />
                                            <span className="text-danger">{this.state.errMsgTime}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="technology">Technology</label>
                                            <input type="text" name="technology" className="form-control" id="technology" placeholder="Technology" onChange={this.handleInputChange} value={this.state.technology} required />
                                            <span className="text-danger">{this.state.errMsgT}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="plateform">Plateform</label>
                                            <input type="text" name="plateform" className="form-control" id="plateform" placeholder="Plateform" onChange={this.handleInputChange} value={this.state.plateform} required />
                                            <span className="text-danger">{this.state.errMsgPlateform}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="fb">Facebook</label>
                                            <input type="text" name="fb" className="form-control" id="fb" placeholder="Facebook" onChange={this.handleInputChange} value={this.state.fb} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="yt">Youtube</label>
                                            <input type="text" name="yt" className="form-control" id="yt" placeholder="Youtube" onChange={this.handleInputChange} value={this.state.yt} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tw">Twitter</label>
                                            <input type="text" name="tw" className="form-control" id="tw" placeholder="Twitter" onChange={this.handleInputChange} value={this.state.tw} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="ln">Linkedin</label>
                                            <input type="text" name="ln" className="form-control" id="ln" placeholder="Linkedin" onChange={this.handleInputChange} value={this.state.ln} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="in">Instagram</label>
                                            <input type="text" name="in" className="form-control" id="in" placeholder="Instagram" onChange={this.handleInputChange} value={this.state.in} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" name="image" className="form-control" id="image" multiple={true} placeholder="Image" onChange={this.handleChange} />
                                            <span className="text-danger">{this.state.errMsgImg}</span>
                                        </div>
                                        {this.state.file && (
                                            <div>
                                                {this.state.file.map((img, i) => {
                                                    return <img className="preview" src={img} alt={"image-" + i} key={i} style={{ width: "100px", margin: '10px', height: '70px' }} />;
                                                })}
                                            </div>
                                        )}
                                        
                                        { 
                                        
                                        this.state.getfile.length > 0  && (
                                            <>
                                            {
                                                this.state.getfile.map((data,i)=>{
                                                    return (<img src={Url.baseUrl + '/public/uploads/portfoliodetail/' + data.image} style={{ width: "100px", margin: '10px', height: '70px' }} key={i} />)
                                                })
                                            }
                                            </>
                                        ) }                                  
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
export default withRouter(Peditslider);