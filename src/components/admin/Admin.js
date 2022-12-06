import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../layouts/admin/Footer'
import Header from '../../layouts/admin/Header'
import Sidebar from '../../layouts/admin/Sidebar'

export default function Admin(props) {
  return (
    <div>
      <Header />
      <div className="content-wrapper" style={{ minHeight: "354px" }}>
            <div className="content-header">
               {/* <div className="container-fluid">
                  <div className="row mb-2">
                     <div className="col-sm-6">
                        <h1 className="m-0">Dashboard</h1>
                     </div>
                     <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                           <li className="breadcrumb-item"><a href="#">Home</a></li>
                           <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                     </div>
                  </div>
               </div> */}
            </div>
            <Sidebar />
      <Outlet />
            </div>
      
      <Footer/>
    </div>
  )
}
