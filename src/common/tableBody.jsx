import React from "react";

const TableBody = props => {
  return (
    <tbody>
      {props.data.map((item, index) => (
        <tr key={index}>
          {props.path.map((col, ind) => (
            <td key={ind} id={index.toString()+ind.toString()} className={item[col] === "Office Hour" ? "table-success" : ind === 0 ? "table-secondary" : item[col] === "" ? "table-light" : item[col] === "Class" ?  "table-danger" : "table-info"} >{item[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
