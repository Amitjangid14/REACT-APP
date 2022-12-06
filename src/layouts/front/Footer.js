import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div>
      <footer>
        <div className="top-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="logo-img">
                  <img src="/assets/img/cmipl-logo.png" />
                </div>
                <div className="det">
                  we are intended to set up a platform to cater all your global IT needs, ranging from your personal website to the custom softw
                </div>
                <div className="social">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer-menus">
                  <h3>About</h3>
                  <div className="links">
                    <ul>
                      <li><Link to='/portfolio'>Portfolio</Link></li>
                      <li><a href="#">Contact us</a></li>
                      <li><Link to='/about-us'>About us</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer-menus">
                  <h3>Quick Links</h3>
                  <div className="links">
                    <ul>
                      <li><Link to='/'>Home</Link></li>
                      <li><a href="#">Blog</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer-address">
                  <h3>Subscribe</h3>
                  <div className="det">
                    If you wish to receive our latest news in your email box, just subscribe to our newsletter. We won’t spam you, we promise!
                  </div>
                  <div className="form-bx">
                    <form>
                      <input type="email" name="" placeholder="Your email address" required />
                      <button type="submit"><i className="fa fa-envelope" aria-hidden="true"></i></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bootom-footer">
          <div className="container">
            <div className="copy-box text-center font14 clr-white">
              Copyright by charumindworks.com. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
