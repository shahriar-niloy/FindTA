import React from "react";

const Header = ({ heading, children }) => {
  const style = {
    height: "50px",
    fontWeight: "bold",
    width: "100%"
  };
  return (
    <div
      className="p-4 d-flex flex-row justify-content-between align-items-center"
      style={style}
    >
      {heading}
      <div className="float-right">{children}</div>
    </div>
  );
};

export default Header;
