import React, { Component } from "react";
import axios from 'axios';
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./common/navbar";
import Schedule from "./components/schedule";
import Home from "./components/home";
import UTA from "./components/uta";
import Courses from "./components/courses";
import Course from "./components/course";
import Notice from "./components/notice";
import Login from "./components/login";
import Dashboard from './components/admin/dashboard';
import Logout from "./common/logout";
import Instructors from "./components/instructors";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  state = {
    user: "",
    isLoggedIn: false
  };

  componentDidMount(){
    this.getLoggedInStatus();
  };

  getLoggedInStatus = async () => {
    try{
      const promise = axios.create({ withCredentials: true }).get("http://localhost:3000/api/isLoggedIn");
      const response = await promise;
      if(response.status === 200){
        const isLoggedIn = true; 
        this.setState({ isLoggedIn });
      }else{
        throw new Error("Status Code: " + response.status);
      }        
    } catch(error) {
      console.log("Get logged In Status error: ", error);
      const isLoggedIn = false; 
      this.setState({ isLoggedIn });
    }
  };

  getUser = () => {

  };

  handleLogout = () => {
    const isLoggedIn = false; 
    this.setState({ isLoggedIn });
  }

  handleLogin = () => {
    const isLoggedIn = true; 
    this.setState({ isLoggedIn });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn} />
        <div className="container">
          <Switch>
            <Route path="/instructors" component={Instructors} />
            <Route path="/admin" component={Dashboard} />
            <Route path="/notice" component={Notice} />
            <Route path="/courses/:id" component={Course} />
            <Route path="/courses" component={Courses} />
            <Route path="/uta" component={UTA} />
            <Route path="/login" render={props => <Login onLogin={this.handleLogin} {...props} />} />
            <Route path="/logout" render={props => <Logout onLogout={this.handleLogout} {...props} />} />
            <Route
              path="/officeHour/:id"
              render={props => <Schedule persons={this.state.persons} {...props} />}
            />
            <Route path="/" exact component={Home} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
