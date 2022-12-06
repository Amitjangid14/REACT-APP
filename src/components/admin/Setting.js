import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navigate } from "react-router-dom";

class Setting extends Component {
  state = {
    navigate: false,
    isLoggedIn : true,
  };

  componentWillMount() {
    if (localStorage.getItem("isLoggedIn") === null) {
      window.location = "/admin";
    }
  }

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };
  render() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const { navigate } = this.state;
    if (navigate) {
      return <Navigate to="/admin" push={true} />;
    }
    return (
      <div className="container  border">
        <h3> HomePage</h3>
        <div className="row">
          <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
            <h5> Welcome, {user.name} </h5> You have Logged in
            successfully.
          </div>
          <div className="col-xl-3 col-sm-12 col-md-3">
            <Button
              className="btn btn-primary text-right"
              onClick={this.onLogoutHandler} >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Setting;