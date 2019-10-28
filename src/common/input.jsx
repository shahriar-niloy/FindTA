import React from "react";

const Input = ({ name, onChange, type }) => {
  return (
    <input
      id={name}
      name={name}
      onChange={onChange}
      type={type}
      className="form-control"
      placeholder={"Enter "+name}
    />
  );
};

Input.defaultProps = {
    type: "text"
}

export default Input;
