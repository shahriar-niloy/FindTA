import React, { Component } from "react";
import DateProgressBar from "../common/dateProgressBar";
import AvailableTA from "./availableTa";
import { sayHello } from "../api/pageStats";
import { getStartDate, getEndDate } from "../api/config";

class Home extends Component {
  state = {
    startDate: "",
    endDate: ""
  };

  componentDidMount() {
    sayHello();
    this.getDates();
  }

  async getDates() {
    const startDate = new Date(await getStartDate());
    const endDate = new Date(await getEndDate());
    this.setState({ startDate, endDate });
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div
        id="welcomeMessage"
        className="container d-flex flex-column justify-content-center align-items-center"
      >
        <div className="introBox shadow-sm p-4 bg-white rounded">
          <div>
            <h3 className="heading-1">{new Date().toDateString()}</h3>
            <h3 className="heading-1">
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric"
              })}
            </h3>
            <h3 className="heading-1">Summer 19</h3>
          </div>
          <div className="DateProgressBar">
            <DateProgressBar startDate={startDate} endDate={endDate} />
            <label>Start</label> <label style={{ float: "right" }}>End</label>
          </div>
          <hr />
          <div className="d-flex flex-column availableTA">
            <h5>Available TA</h5>
            <div>{<AvailableTA />}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
