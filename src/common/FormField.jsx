import React from "react";
import Input from './input';

const FormField = ({ name, type, onChange, error, onError }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <Input name={name} type={type} onChange={onChange} />
      {error[name] !== "" ? onError(error[name]) : null}
    </div>
  );
};

export default FormField;
