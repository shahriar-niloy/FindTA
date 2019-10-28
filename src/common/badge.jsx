import React from "react";

const Badge = ({ label, style }) => {
  return (
    <div style={style}>
      <b>{label}</b>
    </div>
  );
};

Badge.defaultProps = {
    style: {
        background: "white",
        marginRight: "5px",
        padding: "3px 7px",
        border: "2px solid #7fedff",
        boxSizing: "border-box"
    }
}
export default Badge;
