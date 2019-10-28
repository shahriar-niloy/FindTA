import React from "react";

const ProgressBar = ({ progress }) => {
  let passed = {
    width: "0%",
    background: "rgb(180, 224, 233)",
    height: "100%"
  };
  const bar = {
    width: "100%",
    height: "10px",
    background: "#effbff"
  };
  passed.width = progress;
  return (
    <div style={bar}>
      <div style={passed} />
    </div>
  );
};

export default ProgressBar;