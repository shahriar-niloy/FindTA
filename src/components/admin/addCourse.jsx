import React from "react";
import Joi from 'joi';
import Header from "../../common/header";
import Form from "../../common/Form";
import FormField from "../../common/FormField";
import { insertCourse } from "../../api/course";
import SubmitButton from "../../common/submitButton";
import { getErrorMessage, getErrorMessageByCode } from "../../common/errorMessage";

class AddCourse extends Form {
  state = {
    course: {
      code: "",
      title: "",
      section: "",
      timeslot: "",
      picture: ""
    },
    error: {
      code: "",
      title: "",
      section: "",
      timeslot: "",
      picture: ""
    },
    errorMSG: "",
    success: false,
    failed: false
  };

  schema = {
    code: Joi.string().required().label("Course Code"),
    title: Joi.string().required().label("Title"),
    section: Joi.number().integer().min(0).max(30).required().label("Section"),
    timeslot: Joi.string().required().label("Time Slot"),
    picture: Joi.string().label("Picture URL"),
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { course } = this.state;
    const error = { code: "", title: "", section: "", timeslot: "", picture: "" };
    const validationResult = Joi.validate(course, this.schema);
    if(validationResult.error){
      error[validationResult.error.details[0].path[0]] = validationResult.error.details[0].message;
      console.log(error);
      this.setState({ error });
      return;
    }
    console.log(validationResult);
    let errorMSG = "";
    const code = await insertCourse(course);
    let success, failed; 
    success = failed = false;
    if(code === 200){
        success = true;
    } else {
        failed = true;
        errorMSG = getErrorMessageByCode(code);
    }
    this.setState({ success, failed, errorMSG, error });
  };

  handleError = (error) => {
    console.log("handle error: " + error);
    return this.renderAlertDanger(error);
  }

  render() {
    const { error, failed, success, errorMSG } = this.state;
    console.log("rendeign");
    return (
      <div
        style={{ minWidth: "500px" }}
        className="d-flex flex-column bg-white shadow-sm rounded mt-5 mb-5"
      >
        <div>
          <Header heading="Add Course" />
        </div>
        <div className="ml-4 mr-4">
          <form action="" onSubmit={this.handleSubmit}>
            <FormField
              name="code"
              onChange={(e) => this.handleChange(e, "course")}
              error={error}
              onError={this.handleError}
            />
            <FormField
              name="title"
              onChange={(e) => this.handleChange(e, "course")}
              error={error}
              onError={this.handleError}
            />
            <FormField
              name="section"
              onChange={(e) => this.handleChange(e, "course")}
              error={error}
              type="number"
              onError={this.handleError}
            />
            <FormField
              name="timeslot"
              onChange={(e) => this.handleChange(e, "course")}
              error={error}
              onError={this.handleError}
            />
            <FormField
              name="picture"
              onChange={(e) => this.handleChange(e, "course")}
              error={error}
              onError={this.handleError}
            />
            <div>
                {failed && this.renderAlertDanger(errorMSG)}
                {success && this.renderAlertSuccess("Course added successfully!")}
            </div>
            <div>
              <SubmitButton label="Add Course" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddCourse;
