import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
const navlist = require('./navlist.json');

class NavBar extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          MMSU Summer 19
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {navlist.map((item, ind) => {
              if(!item.common && (item.loginState !== isLoggedIn)){
                return null;
              }else{
                return <li key={ind} className="nav-item">
                <NavLink className="nav-link" to={item.to}>
                  {item.displayValue}
                </NavLink>
              </li>;
              }
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
