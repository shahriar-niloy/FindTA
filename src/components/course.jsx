import React from "react";
import CourseMaterial from "./courseMaterial";

const Courses = (props) => {
  return <div>
    <CourseMaterial history={props.history} id={props.match.params.id} />
  </div>;
}

export default Courses;
