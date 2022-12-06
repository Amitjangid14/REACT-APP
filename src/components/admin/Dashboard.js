import React, { Component } from "react"; 
import { Navigate } from "react-router-dom";
class Dashboard extends Component {
   state = {
      navigate: false,
      isLoggedIn: true,
   };
   componentDidMount() {
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
         
            <section className="content">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box">
                           <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog"></i></span>

                           <div className="info-box-content">
                              <span className="info-box-text">CPU Traffic</span>
                              <span className="info-box-number">
                                 10
                                 <small>%</small>
                              </span>
                           </div>
                        </div>
                     </div>
                     <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                           <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up"></i></span>

                           <div className="info-box-content">
                              <span className="info-box-text">Likes</span>
                              <span className="info-box-number">41,410</span>
                           </div>
                        </div>
                     </div>
 

                     <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                           <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart"></i></span>

                           <div className="info-box-content">
                              <span className="info-box-text">Sales</span>
                              <span className="info-box-number">760</span>
                           </div>
                        </div>
                     </div>
                     <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                           <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>

                           <div className="info-box-content">
                              <span className="info-box-text">New Members</span>
                              <span className="info-box-number">2,000</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
      );
   }
}
export default Dashboard;