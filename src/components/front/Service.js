import React, { Component } from 'react';
import Header from "./../../layouts/front/Header";
import Footer from "./../../layouts/front/Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Url from "./../configure.js";
var Isotope = require('isotope-layout');
class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			serviceSt: "",
			serviceList: [], 
		} 
	}
	componentDidMount() {
		axios.get(Url.baseUrl + "api/get-st-service")
			.then(response => {
				this.setState({
					serviceSt: response.data.data[0]
				})
			})
		axios.get(Url.baseUrl + "api/get-service")
			.then(response => {
				this.setState({
					serviceList: response.data.data
				})

			})
	} 
	render() {
		return (<>
			<Header />
			<section className="banner-sec">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="banner-name text-center">
								<h4 className="font40 inter bold clr-white">Services</h4>
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item"><Link to='/'>Home</Link></li>
										<li className="breadcrumb-item active" aria-current="page">Our-Service</li>
									</ol>
								</nav>
							</div> 
						</div>
					</div>
				</div>
				<div className="bottom-curv">
					<img src="/assets/img/wave-1.png"/>
				</div>
			</section>

			<section className="about-sec ab-pg services mt20">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="ser-img">
								<img src={Url.baseUrl + '/public/uploads/service/'+this.state.serviceSt.image} />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="inner-txt">
								<h5 className="font18 medium clr-black">What We Do</h5>
								<h3 className="font45 bold clr-black">{this.state.serviceSt.title} <span>{this.state.serviceSt.title2}</span></h3>
								<h6 className="font25 medium clr-grey">{this.state.serviceSt.subtitle}</h6>
								<div className="details-bx">
									<p>{this.state.serviceSt.description}</p>
								</div>
								{/* <div className="mor-btn mt30">
									<a href="#" className="theme-btn">Read More</a>
								</div> */}
							</div>
						</div>

					</div>
				</div>
			</section>

			<section className="cmipl-services new-services bg-dark-blue">
				<div className="container">
					<div className="heading-bx text-center">
						<h5 className="font18 medium clr-yellow">Services</h5>
						<h3 className="font45 bold clr-white">Creative Design Solutions</h3>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="inner-new-services">
								{this.state.serviceList.length >0 && <>
								{this.state.serviceList.map((list,i)=>(
									<div className="ser-bx" key={i}>
									<div className="icon-bx">
										<img src={Url.baseUrl + '/public/uploads/service/'+list.image} />
									</div>
									<div className="ser-name">{list.title}</div>
									<p>{list.description}</p>
								</div>
								))}
								</>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="top-curv">
					<img src="/assets/img/top_wave_03.png"/>
				</div>
				<div className="bottom-curv">
					<img src="/assets/img/bottom_wave_01.png"/>
				</div>
			</section>

			<section className="trasnsforming-sec work-process">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="trns-content">
								<div className="cont text-center">
									<h5 className="font18 medium clr-yellow">How We Work</h5>
									<h3 className="font45 bold clr-black">Our Works <span>Process</span></h3>
									<p>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an printer took a galley of type and scrambled it to make a type specimen book.
									</p>
								</div>
								<div className="process-bx">
									<div className="pr-inner-bx">
										<div className="box-img">
											<div className="img">
												<img src="/assets/img/plan-1.png"/>
											</div>
											<div className="name">PLANNING</div>
										</div>
										<div className="box-img blue">
											<div className="img">
												<img src="/assets/img/plan-2.png"/>
											</div>
											<div className="name">DESIGN</div>
										</div>
										<div className="box-img">
											<div className="img">
												<img src="/assets/img/plan-3.png"/>
											</div>
											<div className="name">FRONT END</div>
										</div>
										<div className="box-img blue">
											<div className="img">
												<img src="/assets/img/plan-4.png"/>
											</div>
											<div className="name">DEVELOPMENT</div>
										</div>
										<div className="box-img">
											<div className="img">
												<img src="/assets/img/plan-5.png"/>
											</div>
											<div className="name">TESTING</div>
										</div>
										<div className="box-img blue">
											<div className="img">
												<img src="/assets/img/plan-6.png"/>
											</div>
											<div className="name">LAUNCH</div>
										</div>
									</div>
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
export default Portfolio;