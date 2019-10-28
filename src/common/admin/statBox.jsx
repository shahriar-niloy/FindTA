import React from "react";
import Header from "../header";

const StatBox = ({ heading, count }) => {
  return (
    <div className="mb-4 d-flex flex-column rounded shadow-sm mr-2">
      <Header heading={heading} />
      <div className="mr-4 ml-4 mb-4 d-flex flex-row">
        <img
          alt=""
          style={{ width: "40px", margin: "0px 5px", objectFit: "contain" }}
          src="https://img.icons8.com/cotton/64/000000/combo-chart.png"
        />
        <span style={{ fontSize: "36px" }}>{count}</span>
      </div>
    </div>
  );
};

export default StatBox;
