import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Header() {
  return (
	<div>
    <header>
    <div className="tp-header">
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
        <Link className="navbar-brand" aria-current="page" to='/'><img src="/assets/img/cmipl-logo.png"/></Link>
          <div className="search-btn bg-darkgrey">
            <img src="/assets/img/search.png" alt=""/>
          </div>
          <div className="search-box form-group pd15 bg-white p-relative">
            <form>
              <input type="" className="form-control bg-darkgrey clr-lightaqva" placeholder="Search"/>
              <button><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </form>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  </div>
  )
}
