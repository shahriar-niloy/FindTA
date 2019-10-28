import React from 'react';
import axios from 'axios';

const Logout = ({ onLogout, history }) => {
    axios.create({ withCredentials:true }).get("http://localhost:3000/api/logout")
    .then((response) => {
        onLogout();
    }).catch((error) => {
        console.log("Logout error: " + error);
    }).finally(() => {
        history.replace("/");
    });
    return ( <div>Logging Out</div> );
}
 
export default Logout;