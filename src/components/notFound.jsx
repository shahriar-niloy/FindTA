import React, { Component } from "react";

const NotFound = () => {
  const style = {
    width: "150px",
    margin: "50px"
  };

  return (
    <div className="w-100 vh-90 d-flex flex-row justify-content-center align-items-center">
      <div className="m-5 p-5 position-relative d-flex flex-row justify-content-center align-items-center bg-white rounded shadow-sm">
        <img src="/images/404.svg" alt="" style={style} />
      </div>
    </div>
  );
};

export default NotFound;
