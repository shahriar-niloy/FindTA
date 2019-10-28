import React, { Component } from 'react';
import InfoBox from '../common/infoBox';
import { getInstructors } from '../api/instructors';

class Instructors extends Component {
    state = { 
        instructors: []
    };

    paths = ["name", "post", "room", "email", "phone"];

    async componentDidMount(){
        const instructors = await getInstructors();
        this.setState({ instructors });
    }

    handleClick = (id) => {
        this.props.history.push("/officeHour/"+id);
    }

    render() { 
        const { instructors } = this.state;
        console.log("instructor", instructors);
        if(!instructors)
            return null;
        return <div className="infobox d-flex flex-row justify-content-center align-items-center mt-5">
            {
                instructors.map((ins, ind) => {
                    return <InfoBox key={ind} buttonParamId="schID" onClick={this.handleClick} data={ins} paths={this.paths} buttonLabel="View Office Hour" heading="name" /> 
                })
            }
        </div>;
    }
}
 
export default Instructors;