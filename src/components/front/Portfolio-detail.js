import React, { Component } from 'react';
import Header from "./../../layouts/front/Header";
import Footer from "./../../layouts/front/Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Url from "./../configure.js";
import withRouter from './../../withRouter';
import Lightroom from 'react-lightbox-gallery'
import src from 'gsap/src';
class Portfoliodetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabList: [],
			getport: [],
			getportImg: [],
			multiImg: [],
			setLightBoxDisplay: false,
			imageToShow: "",
		}
	}
	componentDidMount() {
		setTimeout(() => {
			axios.post(Url.baseUrl + `api/portfoliodetail-edit/${this.props.params.id}`)
				.then(response => {
					const multiImgs = [];
					if(response.data.data === null){
						window.history.back();
					}
					response.data.data.get_images.map((val, key) => (
						multiImgs.push(`${Url.baseUrl}public/uploads/portfoliodetail/${val.image}`)
					))
					this.setState({
						tabList: response.data.data,
						getport: response.data.data.get_portfolio[0],
						getportImg: response.data.data.get_images,
						multiImg: multiImgs
					})
				})
		}, 500);

	}
	showImage = (image) => {
		this.setState({
			imageToShow: image,
			setLightBoxDisplay: true
		})
	};

	showNext = (e) => {
		e.stopPropagation();
		let currentIndex = this.state.multiImg.indexOf(this.state.imageToShow);

		if (currentIndex >= this.state.multiImg.length - 1) {
			this.setState({
				setLightBoxDisplay: false
			})
		} else {
			let nextImage = this.state.multiImg[currentIndex + 1];
			this.setState({
				imageToShow: nextImage
			})

		}
	};

	showPrev = (e) => {
		e.stopPropagation();
		let currentIndex = this.state.multiImg.indexOf(this.state.imageToShow);
		if (currentIndex <= 0) {
			this.setState({
				setLightBoxDisplay: false
			})
		} else {
			let nextImage = this.state.multiImg[currentIndex - 1];
			this.setState({
				imageToShow: nextImage
			})

		}
	};

	hideLightBox = () => {
		this.setState({
			setLightBoxDisplay: false
		})
	};

	render() {
		return (<>
			<Header />
			<section className="banner-sec">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="banner-name text-center">
								<h4 className="font40 inter bold clr-white">Econcept</h4>
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to='/'>Home</Link></li>
										<li className="breadcrumb-item"><Link to='/portfolio'>Portfolio</Link></li>
										<li className="breadcrumb-item active" aria-current="page">Econcept</li>
									</ol>
								</nav>
							</div>

						</div>
					</div>
				</div>
				<div className="bottom-curv">
					<img src="/assets/img/wave-1.png" />
				</div>
			</section>

			<section className="project-infor-cls mt50">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<div className="side-new-br">
								<div className="project-info">
									<h3 className="font22 clr-yellow medium">Project Details</h3>
									<div className="det-bx">
										<ul>
											<li><span>Client :</span>{this.state.tabList.client_name}</li>
											<li><span>Date :</span> {this.state.tabList.date}.</li>
											<li><span>Trade :</span> {this.state.tabList.trade}</li>
										</ul>
									</div>
									<div className="shre-box">
										<h3 className="font22 clr-yellow medium">Share It</h3>
										<div className="social">
											<a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
											<a href="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
											<a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
											<a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
											<a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
										</div>
									</div>
								</div>
								<div className="project-info tech">
									<h3 className="font22 clr-yellow medium">Moodle ( {this.state.getport.title} )</h3>
									{/* {this.state.getport.skill.split(',').map((item, k) =>
										<li key={k}> {item}</li>)} */}
									<ul className="info-cls">

										<li>{this.state.getport.skill}</li>
									</ul>
									<div className="com-info">
										<div className="inner-bx">
											<div className="ic-bx">
												<i className="fa fa-users" aria-hidden="true"></i>
											</div>
											<div className="name font20 clr-yellow medium">Team</div>
											<p>{this.state.tabList.team_member}</p>
										</div>
										<div className="inner-bx">
											<div className="ic-bx">
												<i className="fa fa-calendar" aria-hidden="true"></i>
											</div>
											<div className="name font20 clr-yellow medium">Time</div>
											<p>{this.state.tabList.project_time}</p>
										</div>
										<div className="inner-bx">
											<div className="ic-bx">
												<i className="fa fa-cog" aria-hidden="true"></i>
											</div>
											<div className="name font20 clr-yellow medium">Technology</div>
											<p>{this.state.tabList.technology}</p>
										</div>
										<div className="inner-bx">
											<div className="ic-bx">
												<i className="fa fa-television" aria-hidden="true"></i>
											</div>
											<div className="name font20 clr-yellow medium">Platform</div>
											<p>{this.state.tabList.plateform}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<div className="port-details">
								<div className="innr first">
									<h3>Project <span>Information</span></h3>
									<p>{this.state.tabList.project_info}</p>
								</div>
								<div className="innr">
									<h3>Development <span>Approach</span></h3>
									<p>{this.state.tabList.dev_appro}</p>
								</div>
							</div>
							<div className="project-shots">
								<h3 className="text-center">More <span>Shots</span></h3>
								<div className="row justify-content-center">
									{
										this.state.multiImg.map((image,i) => (
											<div className="col-md-4" key={i}>
												<div className="box-img">
													<img className="img-fluid" onClick={() => this.showImage(image)} src={image} />
												</div>
											</div>
										))
									}
									{
										this.state.setLightBoxDisplay ?
											<div id="lightbox" onClick={this.hideLightBox}>
												<button onClick={this.showPrev}>{'<'}</button>
												<img id="lightbox-img" src={this.state.imageToShow}></img>
												<button onClick={this.showNext}>{'>'}</button>
											</div>
											: ""
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="query-form mt50 pt40 pb40">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="frm-bx">
								<h3>Send Your <span>Query</span></h3>
								<div className="form">
									<form>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<input type="text" name="" placeholder="Name" required />
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<input type="email" name="" placeholder="Email" required />
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="text" name="" placeholder="Phone Number" required />
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<textarea placeholder="Your Comment"></textarea>
												</div>
											</div>
											<div className="col-md-12">
												<input type="submit" name="" value="GET A QUOTE" />
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>

		);
	}
}
export default withRouter(Portfoliodetail);