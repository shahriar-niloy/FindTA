import React, { Component } from "react";
import { NavLink} from "react-router-dom";
const navList = require("./verticalNavbarList.json");

class VerticalNavBar extends Component {
  render() {
    const style = {
      minWidth: "170px",
      maxWidth: "250px",
      height: "calc(100vh - 56px)",
      display: "flex",
      justifyContent: "center",
    };
    return (
        <nav style={style} className="navbar-light bg-light pt-3">
          <ul className="navbar-nav w-100">
            {navList.map((item, ind) => <li key={ind} className="nav-item">
              <NavLink className="nav-link pl-4 pr-4" activeClassName="activeVerNavBar" to={item.to} exact>
                {item.displayText}
              </NavLink>
            </li>
            )}
          </ul>
        </nav>
    );
  }
}

export default VerticalNavBar;
