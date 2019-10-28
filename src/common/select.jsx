import React from "react";
import "../styles/select.css";

const Select = props => {
  let { name, onChange, blankOption, data, path, displayValue, alt } = props;
  if (displayValue === undefined || displayValue === "") displayValue = path;
  //console.log(data, displayValue);
  return (
        <div className={alt && "select"}>
          <select
            onChange={onChange}
            name={name}
            id={name}
            className={alt ? "" : "form-control"}
          >
            <option value="">{blankOption}</option>
            {data.map((item, index) => (
              <option key={index} value={item[path]}>
                {item[displayValue]}
              </option>
            ))}
          </select>
        </div>
  );
};

Select.defaultProps = {
  blankOption: "Select an option",
  alt: false
};

export default Select;
