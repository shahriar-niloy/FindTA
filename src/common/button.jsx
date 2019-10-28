import React from "react";

const Button = ({ data, label, onClick }) => {
  return (
    <button
      onClick={() => onClick(data)}
      className="btn btn-primary"
    >
      { label }
    </button>
  );
};

export default Button;
