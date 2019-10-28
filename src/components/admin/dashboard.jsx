import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import VerticalNavBar from "../../common/admin/verticalNavbar";
import AddNotice from "./addNotice";
import UpdateOH from './updateOH';
import ManageCourse from './manageCourse';
import AddCourse from './addCourse';
import ManageNotice from './manageNotice';
import Welcome from './welcome';

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div className="w-100 d-flex flex-row bg-white">
        <div style={{ background: "#f8f9fa" }}>
          <VerticalNavBar />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center w-100">
          <Switch>
            <Route path="/admin/manageNotice" component={ManageNotice} />
            <Route path="/admin/addNotice" component={AddNotice} />
            <Route path="/admin/updateOH" render={(props) => <UpdateOH type="uta" {...props} />} />
            <Route path="/admin/manageCourse" component={ManageCourse} />
            <Route path="/admin/addCourse" component={AddCourse} />
            <Route path="/admin/insUpdateOH" render={(props) => <UpdateOH type="instructor" {...props} />} />
            <Route path="/admin/" component={Welcome} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
