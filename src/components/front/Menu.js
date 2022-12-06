import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Url from "./../configure.js";
function Menu() {
//     const [Menus, setAbout] = useState(); 
//     useEffect(() => {
//         axios.get(Url.baseUrl + "api/getpslider")
//         .then(response => { 				
//                 setAbout(response.data.data);  
//         })
//         console.log(Menus)
//     })
    
// }


const [campusValues, setCampusValues] = useState([]);

const GetCampusValues = () => {
    axios.get(Url.baseUrl + "api/getpslider")
    .then(response => { 				
        setCampusValues(response.data.data);  
    })
}

 useEffect(() => {
   GetCampusValues();
 },[]); 
}
export default Menu;
