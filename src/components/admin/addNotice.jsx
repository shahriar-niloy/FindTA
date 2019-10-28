import React from "react";
import axios from 'axios';
import Joi  from 'joi';
import Header from '../../common/header';
import Select from "../../common/select";
import Form from "../../common/Form";
import { getErrorMessage } from './../../common/errorMessage';


class AddNotice extends Form {
  state = {
      courses: [],
      sections: [],
      notice: {
        courseCode: "",
        section: "",
        subject: "",
        content: ""
      },
      error: "",
      success: false,
      failed: false 
  };

  schema = {
    courseCode: Joi.string().required(),
    section: Joi.number().integer().required(),
    subject: Joi.string().required(),
    content: Joi.string().required()
  }

  componentDidMount(){
      this.getCourses();
  };

  getCourses = async () => {
    try{
      const promise = axios.get("http://localhost:3000/api/courses");
      const { data: courses } = await promise; 
      this.setState({ courses });
    } catch(error) {
      console.log("Add Notice Component Error: " + error);
    }
  };
  
  resetNotice = () => {
    return { courseCode: "", section: "", subject: "", content: "" };
  };

  handleSubmit = async (e) => {
    const { notice } = this.state;
      e.preventDefault();
      const validationResult = Joi.validate(notice, this.schema);
      console.log(validationResult);
      if(validationResult.error){
        const error = validationResult.error.details[0].message;
        console.log("errpr found");
        this.setState({ error, failed: true });
        return;
      }
      try{
        const promise = axios.create({ withCredentials: true }).post('http://localhost:3000/api/notice', notice);
        const response = await promise; 
        if(response.status === 200){
          const notice = this.resetNotice();
          this.setState({ notice, success: true, failed: false });
        }
      } catch(error) {
        let err = getErrorMessage(error);
        this.setState({ failed: true, success: false, error: err }); 
      }
  };

  handleChange = (e) => {
    const notice = { ...this.state.notice };
    let sections = this.state.sections; 
    notice[e.target.name] = e.target.value;
    if(e.target.name === "courseCode"){
      sections = this.getSection(e.target.value);
    }
    this.setState({ notice, sections });
  };

  getSection = (courseCode) => {
    let courses = this.state.courses;
    courses = courses.filter((course) => course.code === courseCode);
    let sections = [];
    courses.map(course => {
      const sec = { num: course.sec };
      sections.push(sec);
      return 0;
    });
    return sections;
  };

  render() {
    const { courses, sections, error } = this.state; 
    return (
      <div style={{ minWidth: "500px" }} className="mt-5 mb-5 shadow-sm bg-white rounded w-50">
        <Header heading="Add Notice" />
        <div className="mr-4 ml-4">
          {this.state.success === true ? this.renderAlertSuccess("Notice has been posted successfully!") : null }
          {this.state.failed === true ? this.renderAlertDanger(error) : null }
        </div>
        <div className="pr-4 pl-4 pb-4">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="courseCode">Course</label>
              <Select name="courseCode" onChange={this.handleChange} blankOption="Select a course" data={courses} path="code" />
            </div>
            <div className="form-group">
              <label htmlFor="section">Section</label>
              <Select name="section" onChange={this.handleChange} blankOption="Select a section" data={sections} path="num" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Subject</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="subject"
                placeholder="Enter Subject"
                name="subject"
                value={this.state.notice.subject}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="content"
                placeholder="Enter Content"
                name="content"
                value={this.state.notice.content}
              />
            </div>
            <button type="submit" className="btn btn-primary float-right mb-4">
              Add Notice
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddNotice;
 