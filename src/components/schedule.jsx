import React, { Component } from "react";
import axios from 'axios';
import Table from '../common/table';
import Header from '../common/header';
import { getUTAByID } from "../api/uta";

class Schedule extends Component {
  state = {
    name: "",
    officeHour: []
  };
  
  header = ["", "8:00-10:00", "10:10-11:40", "11:50-01:20", "01:30-03:00", "03:10-04:40", "04:50-06:50"];
  path = ["day", "TS1", "TS2", "TS3", "TS4", "TS5", "TS6"];

  async componentDidMount(){
    const address = "http://localhost:3000/api/uta/schedule/" + this.props.match.params.id;
    try{
      const promise = axios.get(address);
      const { data: officeHour } = await promise;
      const uta = await getUTAByID(officeHour[0].utaid);
      console.log("UTA: ", uta);
      this.setState({ officeHour, name: uta.length ? uta[0].name : "" });
    } catch(error) {
      console.log("Office Hour Fetch Error: " + error);
      this.props.history.push("/404");
    }
  }

  render() {
    const { officeHour, name } = this.state;
    if(officeHour.length === 0)
      return null;
    return <div className="mt-5 mb-5 shadow-sm bg-white rounded">
      <Header heading={name+"- Office Hour"} />
      <Table data={officeHour} header={this.header} path={this.path} />
    </div>;
  }
}

export default Schedule;
