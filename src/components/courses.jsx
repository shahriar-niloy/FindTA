import React, { Component } from 'react';
import axios from 'axios';
import InfoBox from '../common/infoBox';

class Courses extends Component {
    state = {  
        courses: []
    }

    paths = ["code", "title", "sec", "timeslot"]

    async componentDidMount(){
        const promise = axios.get("http://localhost:3000/api/courses");
        const { data: courses } = await promise; 
        this.setState({ courses });
    }

    handleClick = (id, sec) => {
        this.props.history.push(`/courses/${id}/${sec}`);
    }

    render() { 
        const { courses } = this.state;
        return <div className="infobox d-flex flex-row justify-content-center align-items-center mt-5">
            {courses.map((course, ind) => <InfoBox key={ind} buttonParamId="id" pic={course.pic} heading={"title"} data={course} paths={this.paths} onClick={this.handleClick} buttonLabel="View Course" />)}
        </div>;
    }
}
 
export default Courses; 