import React, { Component } from 'react';

class Form extends Component {
    renderAlertDanger = (message) => {
        console.log("Rendering alert");
        return <div className="alert alert-danger" role="alert">
              {message}
          </div>;
    }
    renderAlertSuccess = (message) => {
        return <div className="alert alert-success" role="alert">
              {message}
          </div>;
    }
    renderSubmitButton = (text) => {
        return <button className="btn btn-primary mb-4 float-right">{text}</button>;
    }
    handleChange = (e, objectName) => {
        const extractedObject = {...this.state[objectName]};
        extractedObject[e.target.name] = e.target.value;
        this.setState({ [objectName]: extractedObject });
    };
}
 
export default Form;