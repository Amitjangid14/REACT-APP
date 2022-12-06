import React, { Component } from 'react';
import Header from "./../../layouts/front/Header";
import Footer from "./../../layouts/front/Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Url from "./../configure.js";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from "jquery";
class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			AboutDataLen: [],
			AboutData: [],
			asomeData: [],
			transDataLen: [],
			transData: [],
			aboutTabData: [],
			ProserviceData: [],
			testimonialList: [],
		};

		this.addActiveClass = this.addActiveClass.bind(this);
	}

	addActiveClass(event) {
		$(".show").addClass('hide-top');
		$(".hide-top").removeClass('show');
		$(`.quote-text-${event}`).addClass('show');
		$(`.quote-text-${event}`).removeClass('hide-bottom');

		$(".look").addClass('hide-dp-top');
		$(".hide-dp-top").removeClass('look');
 
		$(`.dp-name-${event}`).addClass('look');
		$(`.dp-name-${event}`).removeClass('hide-dp-bottom');
	}
	componentDidMount() {
		$('.search-btn').click(function () {
			$('header').toggleClass('searchopen');
		});
		setTimeout(() => {
			axios.get(Url.baseUrl + "api/get-statistic")
				.then(response => {
					this.setState({
						AboutDataLen: response.data.data,
						AboutData: response.data.data[0]
					})
				})

			axios.get(Url.baseUrl + "api/get-awesome")
				.then(response => {
					this.setState({
						asomeData: response.data.data
					})
				})

			axios.get(Url.baseUrl + "api/get-transforming")
				.then(response => {
					this.setState({
						transDataLen: response.data.data,
						transData: response.data.data[0]
					})
				})

			axios.get(Url.baseUrl + "api/get-abouttab")
				.then(response => {
					this.setState({
						aboutTabData: response.data.data,
					})
				})

			axios.get(Url.baseUrl + "api/get-proservice")
				.then(response => {
					this.setState({
						ProserviceData: response.data.data,
					})
				})
			axios.get(Url.baseUrl + "api/gettmslider")
				.then(response => {
					const items = response.data.data
					let testilist = []
					for (let i = 0; i < items.length; i++) {
						if (items[i]['status'] == '1') {
							testilist.push(items[i])
						}
					}
					this.setState({
						testimonialList: testilist
					})

				})
		}, 500);
	}
	render() {
		return (
			<>
				<Header />
				<section className="banner-sec">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="banner-name text-center">
									<h4 className="font40 inter bold clr-white">About Us</h4>
									<nav aria-label="breadcrumb">
										<ol className="breadcrumb">
											<li className="breadcrumb-item"><Link to='/'>Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">About Us</li>
										</ol>
									</nav>
								</div>

							</div>
						</div>
					</div>
					<div className="bottom-curv">
						<img src="/assets/img/wave-1.png" alt='..' />
					</div>
				</section>

				<section className="about-sec ab-pg bg-blue ">
					<div className="inner-bx pt80 bg-white">
						<div className="container">
							<div className="row">
								{this.state.AboutDataLen.length && (<>
									<div className="col-md-6">
										<div className="inner-txt">
											<h5 className="font18 medium clr-yellow">ABOUT US</h5>
											<h3 className="font45 bold clr-black">{this.state.AboutData.title} <span>{this.state.AboutData.subtitle}</span></h3>
											<div className="details-bx">
												<p>{this.state.AboutData.description}.</p>
											</div>
											{/* <div className="mor-btn mt30">
												<a href={this.state.AboutData.btnurl} className="theme-btn">Read More</a>
											</div> */}
										</div>
									</div>
									<div className="col-md-6">
										<div className="boxes-cls">
											<div className="cont-img">
												<img src={Url.baseUrl + '/public/uploads/statistics/' + this.state.AboutData.image} alt="..." />
											</div>
											<div className="team-member">
												<h3><span>{this.state.AboutData.team_member_count}</span> Expert Team Members</h3>
											</div>
											<div className="clent-sat">
												<h3><span>{this.state.AboutData.satisfied_count}</span> Client Satisfaction Survey In Consulting Organization</h3>
											</div>
											<div className="exp-cls">
												<h3><span>{this.state.AboutData.experiance_count}</span> Years Experiance Our Company</h3>
											</div>
										</div>
									</div>
								</>)}
							</div>
						</div>
					</div>
				</section>

				<section className="cmipl-services bg-dark-blue">
					<div className="container">
						<div className="heading-bx text-center">
							<h5 className="font18 medium clr-yellow">CMIPL Offers</h5>
							<h3 className="font45 bold clr-white">Awesome services</h3>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="ser-slide">
									{this.state.asomeData.length && (
										<OwlCarousel margin={60} loop dots={true}>
											{
												this.state.asomeData.map((val, key) => (

													<div className="item" key={key}>
														<div className="ser-box">
															<div className="icon-box">
																<img src={Url.baseUrl + '/public/uploads/awesome/' + val.image} alt='...' />
															</div>
															<div className="head font20 clr-yellow medium inter mb30">ECommerce Services</div>
															<div className="des">
																<p>{val.skill}</p>
																<p>{val.short_desc}</p>
															</div>
														</div>
													</div>
												))
											}
										</OwlCarousel>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="top-curv">
						<img src="/assets/img/top_wave_03.png" alt='...' />
					</div>
					<div className="bottom-curv">
						<img src="/assets/img/bottom_wave_01.png" alt='...' />
					</div>
				</section>

				<section className="trasnsforming-sec">
					<div className="container">
						<div className="row">
							{this.state.transDataLen.length && (<>
								<div className="col-lg-6">
									<div className="trns-images">
										<div className="img-area">
											<img src={Url.baseUrl + '/public/uploads/transforming/' + this.state.transData.image} className="frst-img" alt='...' />
											<img src={Url.baseUrl + '/public/uploads/transforming/' + this.state.transData.image1} className="over-img" alt='...' />
										</div>
										<div className="trust-bx">
											Trusted <br />Customer
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="trns-content">
										<h5 className="font18 medium clr-yellow">Transforming</h5>
										<h3 className="font45 bold clr-black">Startup business</h3>
										<div className="cont">
											<p>
												{this.state.transData.description}
											</p>
										</div>
										<div className="cmp-prog-cls">
											<div className="inner-pr">
												<p>Cost reduction</p>
												<div className="progress">
													<div className="progress-bar" style={{ width: this.state.transData.cost_reduction_per + '%' }}>
														<span>{this.state.transData.cost_reduction_per}%</span>
													</div>
												</div>
											</div>
											<div className="inner-pr">
												<p>Efficiency</p>
												<div className="progress">
													<div className="progress-bar" style={{ width: this.state.transData.efficiency_per + '%' }}>
														<span>{this.state.transData.efficiency_per}%</span>
													</div>
												</div>
											</div>
											<div className="inner-pr">
												<p>Client satisfaction</p>
												<div className="progress">
													<div className="progress-bar" style={{ width: this.state.transData.client_satisfaction_per + '%' }}>
														<span>{this.state.transData.client_satisfaction_per}%</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>)}
						</div>
					</div>
				</section>

				<section className="cmipl-services about-cmipl bg-dark-blue">
					<div className="container">
						<div className="heading-bx text-center">
							<h5 className="font18 medium clr-yellow">About Welcome to</h5>
							<h3 className="font45 bold clr-white">Charu Mindworks (India) Private Limited</h3>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="cmp-tabs">

									{this.state.aboutTabData.length && (
										<ul className="nav nav-tabs d-none d-lg-flex" id="myTab" role="tablist">
											{this.state.aboutTabData.map((tab, i) => {
												return i + 1 === 1 ?
													<li className="nav-item " role="presentation" key={i}>
														<button className="nav-link active" id={tab.title.replace(/ /g, '')} data-bs-toggle="tab" data-bs-target={`#${tab.title.replace(/ /g, '')}-tab-pane`} type="button" role="tab" aria-controls={`${tab.title.replace(/ /g, '')}-tab-pane`} aria-selected="true">{tab.title}</button>
													</li>
													:
													<li className="nav-item" role="presentation" key={i}>
														<button className="nav-link" id={tab.title.replace(/ /g, '')} data-bs-toggle="tab" data-bs-target={`#${tab.title.replace(/ /g, '')}-tab-pane`} type="button" role="tab" aria-controls={`${tab.title.replace(/ /g, '')}-tab-pane`} aria-selected="true">{tab.title}</button>
													</li>
											})}
										</ul>

									)}

									<div className="tab-content accordion" id="myTabContent">

										{this.state.aboutTabData.map((tab, i) => {

											return i + 1 === 1 ?
												<div key={i} className="tab-pane fade active show accordion-item" id={`${tab.title.replace(/ /g, '')}-tab-pane`} role="tabpanel" aria-labelledby={`${tab.title.replace(/ /g, '')}-tab`} tabIndex="0" >
													<h2 className="accordion-header d-lg-none" id="headingOne">
														<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">About CMIPL</button>
													</h2>
													<div id="collapseOne" className="accordion-collapse collapse show  d-lg-block" aria-labelledby="headingOne" data-bs-parent="#myTabContent">
														<div className="accordion-body">
															<p>{tab.description}</p>
														</div>
													</div>
												</div>
												:
												<div key={i} className="tab-pane fade show accordion-item" id={`${tab.title.replace(/ /g, '')}-tab-pane`} role="tabpanel" aria-labelledby={`${tab.title.replace(/ /g, '')}-tab`} tabIndex="0">
													<h2 className="accordion-header d-lg-none" id="headingOne">
														<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">About CMIPL</button>
													</h2>
													<div id="collapseOne" className="accordion-collapse collapse show  d-lg-block" aria-labelledby="headingOne" data-bs-parent="#myTabContent">
														<div className="accordion-body">
															<p>{tab.description}</p>
														</div>
													</div>

												</div>
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="top-curv">
						<img src="/assets/img/top_wave_03.png" alt='...' />
					</div>
					<div className="bottom-curv">
						<img src="/assets/img/bottom_wave_01.png" alt='...' />
					</div>
				</section>

				<section className="start-services">
					<div className="container">
						<div className="heading-bx text-center">
							<h5 className="font18 medium clr-yellow">CMIPL Professional</h5>
							<h3 className="font45 bold clr-black">Startup Services</h3>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="stp-serv mt50">
									{this.state.ProserviceData.length && (
										<OwlCarousel margin={60} loop dots={true}>
											{
												this.state.ProserviceData.map((val, key) => (
													<div className="item" key={key}>
														<div className="ser-bx">
															<div className="ser-icon">
																<div className="img">
																	<img src={Url.baseUrl + '/public/uploads/professional-service/' + val.image} alt='...' />
																</div>
															</div>
															<div className="name font20 clr-black bold ">{val.title}</div>
															<div className="cont clr-grey font14">
																{val.description}
															</div>
														</div>
													</div>
												))
											}
										</OwlCarousel>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="testomonials cmipl-services mt50 bg-dark-blue">
					<div className="container">
						<div className="heading-bx text-center">
							<h5 className="font18 medium clr-yellow">TESTIMONIALS</h5>
							<h3 className="font45 bold clr-white">What makes us different makes us better</h3>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="testimonials-block">
									<div className="section-eight">
										<div className="row">
											<div className="col-lg-3 fade-in">
												{this.state.testimonialList.length && (
													<div className="container-pe-quote">
														{
															this.state.testimonialList.map((testi, indexTesti) => (
																<div onClick={() => this.addActiveClass(indexTesti + 1)} className={`pp-quote li-quote-${indexTesti + 1}`} key={indexTesti}>
																	<img src={Url.baseUrl + '/public/uploads/testimonial/' + testi.image} alt="Testimonial" title="Testimonial" />
																</div>
															))
														}
													</div>
												)}
											</div>

											<div className="col-lg-5 fade-in">
												<div className="sec-eight-text-area">

													<div className="container-dp-name">

														{this.state.testimonialList.map((testimon, index) => (

															<div className={`box-dpname dp-name-${index + 1} hide-dp-top `} key={index} >
																<div className="img">
																	<img className="" src={Url.baseUrl + '/public/uploads/testimonial/' + testimon.image} alt="Testimonial" title="Testimonial" />
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
											<div className="col-lg-4 fade-in">
												<div className="sec-eight-text-area">
													<div className="container-quote">
														{this.state.testimonialList.map((testio, indexDes) => (
															<div className={`quote quote-text-${indexDes + 1} hide-dp `} key={indexDes}>
																<img className="" src="/assets/img/quote.png" alt="Quote" title="Quote" />
																<p className="font14 clr-grey">{testio.testimonial}</p>
																<div className="name-degi">
																	<span className="name-block clr-white bold font18 d-block">{testio.name}</span>
																	<span className="name-block clr-white font16 d-block">{testio.designation}</span>
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="top-curv">
						<img src="/assets/img/top_wave_03.png" alt='...' />
					</div>
					<div className="bottom-curv">
						<img src="/assets/img/bottom_wave_01.png" alt='...' />
					</div>
				</section>

				<section className="get-in-tch mb80">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-6">
								<div className="map-bx">
									<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.611646864717!2d75.8312065330344!3d26.788646524306934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9d512b0fb95%3A0xc1a581f944b780cf!2sCharu%20Mindworks%20(India)%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1668516595832!5m2!1sen!2sin" width="100%" height="550" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="get-content">
									<h5 className="font18 medium clr-yellow">Transforming</h5>
									<h3 className="font45 bold clr-black">Startup business</h3>
									<p>Come and visit our quarters or simply send us an email anytime you want. We are open to all suggestions from our audience.</p>
									<div className="get-details">
										<ul>
											<li>
												<div className="ic">
													<i className="fa fa-map-marker" aria-hidden="true"></i>
												</div>
												<div className="det">
													<h4 className="clr-yellow font18 medium">Visit Us:</h4>
													<h5 className="clr-black font16 medium">IT-4, EPIP, RIICO Industrial Area SitapuraJaipur-302022  (Raj.) India</h5>
												</div>
											</li>
											<li>
												<div className="ic">
													<i className="fa fa-envelope" aria-hidden="true"></i>
												</div>
												<div className="det">
													<h4 className="clr-yellow font18 medium">Mail Us:</h4>
													<h5 className="clr-black font16 medium">
														<a href="mailto:info@charumindworks.com">info@charumindworks.com</a>
													</h5>
												</div>
											</li>
											<li>
												<div className="ic">
													<i className="fa fa-phone" aria-hidden="true"></i>
												</div>
												<div className="det">
													<h4 className="clr-yellow font18 medium">Phone Us:</h4>
													<h5 className="clr-black font16 medium">+91-98290 36113, +91-98290 67113, +91- 9829131113</h5>
												</div>
											</li>
										</ul>
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
export default About;