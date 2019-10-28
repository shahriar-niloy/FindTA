import React, { Component } from "react";
import axios from 'axios';
import Joi from 'joi';
import { Redirect } from 'react-router-dom';
import Header from '../common/header';
import FormField from "../common/FormField";

class Login extends Component {
  state = {
      credential: {
          username: "",
          password: ""
      },
      error: {
          username: "",
          password: ""
      },
      redirect: false,
      loginFailed: false
  };

  schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password")
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const axiosCors = axios.create({
      withCredentials: true
    });    
    try{
      const promise = axiosCors.post("http://localhost:3000/api/login", this.state.credential);
      const response = await promise;
      if(response.status === 200){
        this.props.onLogin();
        const redirect = true; 
        this.setState({ redirect });
      }else{
        throw new Error("Response Status: " + response.status);
      }
    } catch(error) {
      const loginFailed = true;
      this.setState({ loginFailed });
      console.log("Login Error: " + error);
    }
  }

  validate = (obj) => {
    const result = Joi.validate(obj, this.schema, { abortEarly: false });
    const error = { username: "", password: "" };
    if(result.error){
        result.error.details.map((item) => {
            return error[item.path[0]] = item.message;
        });
    }
    //console.log(result);
    this.setState({ error });
  }

  handleChange = (e) => {
    const credential = {...this.state.credential};
    credential[e.target.name] = e.target.value;
    this.validate(credential);
    this.setState({ credential });
  }

  renderAlert = (message) => {
      return <div className="alert alert-danger" role="alert">
            {message}
        </div>;
  }

  render() {
    if(this.state.redirect)
      return <Redirect to="admin/dashboard" />;
    return (
      <div className="shadow-sm bg-white rounded mt-5">
        <Header heading="Login" />
        <div className="ml-4 mr-4">{this.state.loginFailed === true ? this.renderAlert("Login Unsuccessful") : null}</div>
        <div className="pr-4 pl-4 pb-4">
          <form onSubmit={this.handleSubmit}>
              <FormField name="username" onChange={this.handleChange} error={this.state.error} onError={this.renderAlert} />
              <FormField name="password" type="password" onChange={this.handleChange} error={this.state.error} onError={this.renderAlert} />
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;