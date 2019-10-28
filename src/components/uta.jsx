import React, { Component } from 'react';
import InfoBox from '../common/infoBox';
import axios from 'axios';

class UTA extends Component {
    state = {
        uta: []
    }

    paths = ["post", "phone", "email", "faculty"];
    
    async componentDidMount() {
        const promise = axios.get("http://localhost:3000/api/uta");
        const { data:uta } = await promise; 
        this.setState({ uta });
    }

    handleClick = (id) => {
        this.props.history.push("/officeHour/"+id);
    };

    render() {
        const { uta: data } = this.state;
        return <div className="d-flex flex-row justify-content-center align-items-center mt-5">
        {data.map((item, ind) => (<div key={ind}>
            <InfoBox pic={item.picture} buttonParamId="schID" heading="name" data={item} paths={this.paths} onClick={this.handleClick} buttonLabel="View Office Hour" />
        </div>))}
    </div>;
    }
}
 
export default UTA;

