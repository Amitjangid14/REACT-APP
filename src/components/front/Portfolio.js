import React, { Component } from 'react';
import Header from "./../../layouts/front/Header";
import Footer from "./../../layouts/front/Footer";
import axios from 'axios';
import Url from "./../configure.js";
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from "jquery";
var Isotope = require('isotope-layout');
class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabList: [],
			tabs: [],
			setClents: []
		}
		this.onFilterChange = this.onFilterChange.bind(this);
	}
	componentDidMount() {
		axios.get(Url.baseUrl + "api/getpslider")
			.then(response => {
				const cats = response.data.data.map(qa => qa.category_name)
				this.setState({
					tabList: response.data.data,
					tabs: cats.filter((q, idx) => cats.indexOf(q) === idx)
				})
			})
		axios.get(Url.baseUrl + "api/get-statistic")
			.then(response => {
				this.setState({
					setClents: response.data.data[0]
				})

			})
	}
	onFilterChange = (newFilter) => {
		if (this.iso === undefined) {
			this.iso = new Isotope('#filter-container', {
				itemSelector: '.filter-item',
				layoutMode: "fitRows"
			});
		}
		if (newFilter === '*') {
			this.iso.arrange({ filter: `*` });
		} else {
			this.iso.arrange({ filter: `.${newFilter}` });
		}
	}

	render() {
		return (<>
			<Header />
			<div className="sid-btn-cls">
				Project Statistics
			</div>
			<section className="portfolio-pg">
				<div className="side-br">
					<div className="clr-side-btn">
						<i className="fa fa-angle-right" aria-hidden="true"></i>
					</div>
					<ul>
						<li>
							<div className="ic-bx">
								<img src="/assets/img/side-2.png" />
							</div>
							no of clients<span>{this.state.setClents.team_member_count}</span>
						</li>
						<li>
							<div className="ic-bx">
								<img src="/assets/img/side-3.png" />
							</div>
							no of expert<span>{this.state.setClents.satisfied_count}</span>
						</li>
						<li>
							<div className="ic-bx">
								<img src="/assets/img/side-4.png" />
							</div>
							experience<span>{this.state.setClents.experiance_count}</span>
						</li>
					</ul>
					<div className="qute-btn">
						<a href="#">Get a free qoute</a>
					</div>
				</div>
				<div className="pro-det">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-12">
								<div className="prod-details">
									<nav aria-label="breadcrumb">
										<ol className="breadcrumb">
											<li className="breadcrumb-item"><Link to='/'>Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">Portfolio</li>
										</ol>
									</nav>
									<h4 className="font40 inter bold clr-black">Projects We <span>Have Done</span></h4>
									<p>We help you transform your brilliant ideas into fully functional web and mobile applications that outperform your expectations. We’ve been revolutionizing the tech world with our futuristic technological stack and incredible capabilities.</p>
									<div className="portfolio-gellery">
										<div className="filters">

											{this.state.tabs.length > 0 && (
												<ul>
													<li className='active' data-filter="*" onClick={() => { this.onFilterChange("*") }}>All</li>
													{this.state.tabs.map((data, i) => (<>
														<li data-filter={`${data}`} onClick={() => { this.onFilterChange(`${data}`) }} key={i+1}>{data}</li>
													</>))}
												</ul>
											)}
										</div>
										<div className="filters-content" id="filter-container">
											{this.state.tabList.length > 0 && (
												<div className="row grid ">
													{this.state.tabList.map((data, i) => (
														<div className={`col-sm-6 filter-item ${data.category_name}`} key={i+1}>
															<div className="inner-bx-cls bg-dark-blue">
																<Link to={`/portfolio-detail/${data.id}`}>
																	<div className="hed-cls">
																		<h3>{data.title}</h3>
																		<ul>
																			{data.skill.split(',').map((item, k) =>
																				<li key={k}> {item}</li>)}
																		</ul>

																	</div>
																	<div className="img">
																		<img src={Url.baseUrl + '/public/uploads/portfolioslider/' + data.image} alt='...' />
																	</div>
																</Link>
																<div className="view-btn">
																	<Link to={`/portfolio-detail/${data.id}`}>View Details</Link>
																</div>

															</div>
														</div>
													))}
												</div>
											)}
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