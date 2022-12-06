import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Url from "./../configure.js";
//import "./../../style.bundle.css";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      isLoading: false,
      redirect: false,
      errMsgEmail: "",
      errMsgPwd: "",
      errMsg: "",
    };
  }
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSignInHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post(Url.baseUrl + "api/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          this.setState({
            msg: response.data.message,
            redirect: true,
          });
        }
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          this.setState({
            errMsgEmail: response.data.validation_error.email,
            errMsgPwd: response.data.validation_error.password,
          });
          setTimeout(() => {
            this.setState({ errMsgEmail: "", errMsgPwd: "" });
          }, 4000);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          this.setState({
            errMsg: response.data.message,
          });
          setTimeout(() => {
            this.setState({ errMsg: "" });
          }, 4000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/admin/dashboard" />;
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Navigate to="dashboard" />;
    }
    const isLoading = this.state.isLoading;
    return (
      <div className="hold-transition login-page">
        <div className="login-box">

          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="#" className="h1"><b>Admin</b>LTE</a>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <form method="post">
                <div className="input-group mb-3">
                  <input type="email"  name="email" value={this.state.email} onChange={this.onChangehandler} className="form-control" placeholder="Email"  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <span className="text-danger">{this.state.errMsgEmail}</span>
                <div className="input-group mb-3">
                  <input type="password"  name="password" value={this.state.password} onChange={this.onChangehandler} className="form-control" placeholder="Password" />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <span className="text-danger">{this.state.errMsgPwd}</span>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>

                  <div className="col-4">
                  <button onClick={this.onSignInHandler} className="btn btn-primary btn-block" >Sign In</button>
                  </div> 
                </div>
              </form>
              {/* <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
              <p className="mb-0">
                <a href="register.html" className="text-center">Register a new membership</a>
              </p> */}
            </div>

          </div>

        </div>
      </div>

    );
  }
}