import React, { Component } from "react";
//import "./App.css";
import { createBrowserHistory } from 'history'

import Index from "./components/front/Index";
import About from "./components/front/About"; 
import Portfolio from "./components/front/Portfolio";
import PortfolioDetail from "./components/front/Portfolio-detail";
import Service from "./components/front/Service"; 
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";

// Start Admin Link
import Signin from "./components/admin/Signin";
import Admin from "./components/admin/Admin";
import Dashboard from "./components/admin/Dashboard";
import Sliderlist from "./components/admin/slider/Sliderlist";
import Addslider from "./components/admin/slider/Addslider";
import Editslider from "./components/admin/slider/Editslider";
import Fsliderlist from "./components/admin/featureslider/Fsliderlist";
import Faddslider from "./components/admin/featureslider/Faddslider";
import Feditslider from "./components/admin/featureslider/Feditslider";
import Psliderlist from "./components/admin/portfolio/Psliderlist";
import Paddslider from "./components/admin/portfolio/Paddslider";
import Peditslider from "./components/admin/portfolio/Peditslider";

import Tsliderlist from "./components/admin/technologyslider/Tsliderlist";
import Taddslider from "./components/admin/technologyslider/Taddslider";
import Teditslider from "./components/admin/technologyslider/Teditslider";

import Tmsliderlist from "./components/admin/testimonial/Tmsliderlist";
import Tmaddslider from "./components/admin/testimonial/Tmaddslider";
import Tmeditslider from "./components/admin/testimonial/Tmeditslider";

import Ourlist from "./components/admin/statistics/Ourlist";
import Ouredit from "./components/admin/statistics/Ouredit";

import DifferentFromlist from "./components/admin/statistics/DifferentFromlist";
import DifferentFromedit from "./components/admin/statistics/DifferentFromedit";

import Translist from "./components/admin/statistics/Translist";
import Transedit from "./components/admin/statistics/Transedit";

import Asomelist from "./components/admin/asome-services/Asome-sliderlist";
import AsomeAdd from "./components/admin/asome-services/Asome-addslider";
import Asomeedit from "./components/admin/asome-services/Asome-editslider";

import AboutTablist from "./components/admin/abouttab/Abouttablist";
import AboutTabAdd from "./components/admin/abouttab/Addabouttab";
import AboutTabEdit from "./components/admin/abouttab/Editabouttab";

import Proservicelist from "./components/admin/professional-service/Proservicelist";
import Addproservice from "./components/admin/professional-service/Addproservice";
import Editproservice from "./components/admin/professional-service/Editproservice";

import Categorylist from "./components/admin/category/Categorylist";
import Addcategory from "./components/admin/category/Addcategory";
import Editcategory from "./components/admin/category/Editcategory";

import ListPortfolio from "./components/admin/portfolio-detail/Portfoliolist";
import AddPortfolio from "./components/admin/portfolio-detail/Portfolioadd";
import EditPortfolio from "./components/admin/portfolio-detail/Portfolioedit";

import ListService from "./components/admin/services/Servicelist";
import AddService from "./components/admin/services/Serviceadd";
import EditService from "./components/admin/services/Serviceedit";

import Ourservicelist from "./components/admin/services/Ourservicelist";
import Ourserviceedit from "./components/admin/services/Ourserviceedit";

import Setting from "./components/admin/Setting";

// End Admin Link
import { BrowserRouter , Routes, Route, NavLink } from "react-router-dom";

export const history = createBrowserHistory();
class App extends Component {
  
  render() {
    return (
      <div className="wrapper">

      <Routes history={history}> 
        {/* Start Front Route */}
       <Route  path="/403" element={<Page403/>} />
       <Route  path="/404" element={<Page404/>} />
       <Route  path="/" element={<Index/>} />
       <Route  path="/about-us" element={<About/>} />
       <Route  path="/portfolio" element={<Portfolio/>} />
       <Route  path="/portfolio-detail/:id" element={<PortfolioDetail/>} />
       <Route  path="/service" element={<Service/>} />
        {/* End Front Routes */}

        {/* Start Admin Route */}
        <Route index  path='/admin' element={<Signin />} />
        <Route  path='/admin' element={<Admin />} > 
          <Route  path="/admin/dashboard" element={<Dashboard/>} />

          <Route  path="/admin/sliderlist" element={<Sliderlist/>} />
          <Route  path="/admin/addslider" element={<Addslider/>} />
          <Route  path="/admin/editslider/:id" element={<Editslider/>} />


          <Route  path="/admin/fsliderlist" element={<Fsliderlist/>} />
          <Route  path="/admin/faddslider" element={<Faddslider/>} />
          <Route  path="/admin/feditslider/:id" element={<Feditslider/>} />

          <Route  path="/admin/psliderlist" element={<Psliderlist/>} />
          <Route  path="/admin/paddslider" element={<Paddslider/>} />
          <Route  path="/admin/peditslider/:id" element={<Peditslider/>} />

          <Route  path="/admin/tsliderlist" element={<Tsliderlist/>} />
          <Route  path="/admin/taddslider" element={<Taddslider/>} />
          <Route  path="/admin/teditslider/:id" element={<Teditslider/>} />

          <Route  path="/admin/tmsliderlist" element={<Tmsliderlist/>} />
          <Route  path="/admin/tmaddslider" element={<Tmaddslider/>} />
          <Route  path="/admin/tmeditslider/:id" element={<Tmeditslider/>} />

          <Route  path="/admin/ourlist" element={<Ourlist/>} />
          <Route  path="/admin/ouredit/:id" element={<Ouredit/>} />
          
          <Route  path="/admin/df-list" element={<DifferentFromlist/>} />
          <Route  path="/admin/df-edit/:id" element={<DifferentFromedit/>} />

          <Route  path="/admin/trans-list" element={<Translist/>} />
          <Route  path="/admin/trans-edit/:id" element={<Transedit/>} />

          <Route  path="/admin/asome-list" element={<Asomelist/>} />
          <Route  path="/admin/asome-add" element={<AsomeAdd/>} />
          <Route  path="/admin/asome-edit/:id" element={<Asomeedit/>} />
          
          <Route  path="/admin/abouttab-list" element={<AboutTablist/>} />
          <Route  path="/admin/abouttab-add" element={<AboutTabAdd/>} />
          <Route  path="/admin/abouttab-edit/:id" element={<AboutTabEdit/>} />

          <Route  path="/admin/proservice-list" element={<Proservicelist/>} />
          <Route  path="/admin/proservice-add" element={<Addproservice/>} />
          <Route  path="/admin/proservice-edit/:id" element={<Editproservice/>} />
          
          <Route  path="/admin/category-list" element={<Categorylist/>} />
          <Route  path="/admin/category-add" element={<Addcategory/>} />
          <Route  path="/admin/category-edit/:id" element={<Editcategory/>} />
          
          <Route  path="/admin/portfoliodt-list" element={<ListPortfolio/>} />
          <Route  path="/admin/portfoliodt-add" element={<AddPortfolio/>} />
          <Route  path="/admin/portfoliodt-edit/:id" element={<EditPortfolio/>} />
          
          <Route  path="/admin/service-list" element={<ListService/>} />
          <Route  path="/admin/service-add" element={<AddService/>} />
          <Route  path="/admin/service-edit/:id" element={<EditService/>} />
          
          <Route  path="/admin/our-service-list" element={<Ourservicelist/>} />
          <Route  path="/admin/our-service-edit/:id" element={<Ourserviceedit/>} />

          <Route  path="/admin/setting" element={<Setting/>} />
        </Route>
        {/* End Admin Route  url */}
    </Routes>
      </div>
      );
    }
  }
  export default App;
