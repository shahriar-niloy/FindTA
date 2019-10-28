import React from "react";
import { XYPlot, LineSeries, XAxis, YAxis } from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import Header from "./../header";

const Chart = ({ heading, data, yTop }) => {
  return (
    <div className="rounded bg-white shadow-sm ml-4 mb-4 mr-4 pr-2 pl-2 pb-2 w-100">
      <Header heading={heading} />
      <XYPlot height={200} width={430} xType="ordinal" yDomain={[0, yTop]}>
        <LineSeries data={data} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
};

export default Chart;
