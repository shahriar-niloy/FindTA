import React, { Component } from "react";
import Header from "./../../common/header";
import StatBox from "../../common/admin/statBox";
import Chart from "../../common/admin/chart";
import { getVisitorLast, getVisitor, getIns, getUniqueVisitors, getPageServed } from "../../api/pageStats";


class Welcome extends Component {
  state = {
      lastDays: 7,
      maxPadFactor: 0.2,
      minimum: 5,
      data: [],
      unique: 0,
      served: 0
  };

  style = {
    minWidth: "500px"
  };

  async componentDidMount(){
    const data = await getVisitorLast(this.state.lastDays);
    const unique = await getUniqueVisitors();
    const served = await getPageServed();
    let preparedData = [];
    if(data){
        data.map((item, index) => {
            preparedData[index] = { x: item.date, y: item.count };
        })
    }
    this.setState({ data: preparedData, unique, served });
  }

  getMaxY = (data) => {
    const { maxPadFactor, minimum } = this.state;
    let arrY = [];
    data.map((item, index) => arrY[index] = item.y);
    let max = Math.max(...arrY);
    max = max ? max : minimum;
    return max + max * maxPadFactor;
  }

  render() {
    const { data, lastDays, unique, served } = this.state;
    return (
      <div
        style={this.style}
        className="d-flex flex-column shadow-sm rounded bg-white"
      >
        <Header heading="Page Statistics" />
        <div className="d-flex flex-column">
          <div className="ml-4 mr-4 d-flex flex-row justify-content-left">
            <StatBox heading="Unique Visitors" count={unique} />
            <StatBox heading="Page Lands" count={served} />
          </div>
          <div className="d-flex flex-row">
            <Chart heading={`Last ${lastDays} days`} yTop={this.getMaxY(data)} data={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
