import React, { Component } from "react";
import Header from "../common/header";
import Circle from "../common/circle";
import { getCourseMaterials, getCourse } from "../api/course";

class CourseMaterial extends Component {
  state = {
    title: "",
    courseMat: []
  };
  
  async componentDidMount() {
    let course, courseMat; 
    try{
      courseMat = await getCourseMaterials(this.props.id);
      course = await getCourse(this.props.id);
      if(course.length === 0)
        throw new Error("Course Not Found");
    }catch(error){
      this.props.history.push("/404");
    }
    this.setState({ courseMat, title: course ? course[0].title : "" });
  }

  render() {
    const { courseMat, title } = this.state;
    return (
      <div className="section d-flex flex-column shadow-sm bg-white rounded">
        <div style={{ borderBottom: "2px solid #ececec", marginBottom: "12px" }}>
            {<Header heading={title + " - Course Materials"} />}
        </div>
        <div>
          <ul>
            {courseMat.map((item, index) => (
              <li key={index}>
                <Circle width="10px" /> <a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default CourseMaterial;
