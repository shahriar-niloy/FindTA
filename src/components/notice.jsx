import React, { Component } from "react";
import InfoRow from "./../common/infoRow";
import Header from "../common/header";
import Select from "./../common/select";
import { getCourses } from './../api/course';
import { getNoticesByCourse, getNotices } from "../api/notice";

class Notice extends Component {
  state = {
    courses: [],
    notice: [],
    currentCourseID: ""
  };

  async componentDidMount() {
    const courses = await getCourses();
    const notice = await getNotices();   
    this.setState({ notice, courses });
  }

  handleChange = async e => {
    const currentCourseID = e.target.value;
    let notice;
    if(currentCourseID === "")
      notice = await getNotices();  
    else
      notice = await getNoticesByCourse(currentCourseID);  
    this.setState({ notice, currentCourseID });
  }

  render() {
    const { notice, courses, currentCourseID } = this.state;
    const paths = ["id", "code", "sec", "date", "subject", "content"];
    return (
      <div
        id="noticeMain"
        className="d-flex flex-column shadow-sm bg-white rounded mt-5 mb-5"
      >
        <Header heading="Announcement">
          <Select onChange={this.handleChange} alt="true" data={courses} path="id" displayValue={"code"} blankOption="All Courses"/>
        </Header>
        {notice &&
          notice.map((n, ind) => <InfoRow key={ind} data={n} paths={paths} />)
        }
        {notice.length === 0 && (
          <div className="mr-4 ml-4 mb-3">No notices to display</div>
        )}
      </div>
    );
  }
}

export default Notice;
