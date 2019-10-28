import React from "react";
import Badge from './badge';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const InfoRow = ({ data, paths }) => {
  const date = new Date(data.date);
  return (
    <div className="p-3 d-flex flex-row indNotice">
      <div
        className="d-flex flex-column align-items-center"
        style={{ fontSize: "10px", fontWeight: "bold" }}
      >
        <div style={{ fontSize: "25px", fontWeight: "normal" }}>{date.getDate()}</div>
        <div>{months[date.getMonth()]}</div>
        <div>{date.getFullYear()}</div>
      </div>
      <div style={{ marginLeft: "15px", width: "100%" }}>
        <div className="d-flex flex-row w-100 justify-content-between">
          <div>
            <b>{data != null ? data[paths[4]] : ""}</b>
          </div>
          <div style={{ fontSize: "12px" }} className="d-flex flex-row">
            <Badge label={data != null ? data[paths[1]] : ""} />
            <Badge label={data != null ? " Sec: " + data[paths[2]] : ""} />
          </div>
        </div>
        <div style={ {wordWrap: "break-word"} }>{data != null ? data[paths[5]] : ""}</div>
      </div>
    </div>
  );
};

export default InfoRow;
