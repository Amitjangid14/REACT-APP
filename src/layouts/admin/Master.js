import React, { useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import routes from '../../routes/routes';

//import { Route,Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Navigate, Route, NavLink } from "react-router-dom";
function Master() {
  return (
    <div>
      <Header />
      <div> 
      <main>
          <Routes>
            {routes.filter(route => route.component)
              .map(({ path, component: Component }, idx) => (
                <Route
                  key={idx}
                  path={path}
                  element={<Component />}
                />
              ))}
            <Route
              path="/admin"
              element={<Navigate to="/admin/signin"/>}
            />
          </Routes>
        </main>
           {/* <Navigate from="admin" to="dashboard" />;  */}
      </div>
      <Footer />
    </div>
  )
}
export default Master;
