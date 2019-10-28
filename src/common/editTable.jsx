import React from "react";
import TableHeader from "./tableHeader";

const EditTable = ({ data, path, onEdit, headers }) => {
  const inputStyle = {
    background: "white",
    border: "none",
    textAlign: "center",
    margin: "0px",
    padding: "0px",
    width: "100%"
  };
  const cellStyle = {
    textAlign: "center",
    fontSize: "14px",
    margin: "0px",
    padding: "0px",
    maxWidth: "120px"
  };
  //console.log(data);
  if(data.length === 0)
    return null;
  return (
    <table className="table table-bordered w-100 d-block" style={{ textAlign: "center" }}>
      <TableHeader style={cellStyle} headers={headers} />
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {path.map((col, ind) => (
              <td
                style={cellStyle}
                key={index.toString() + ind.toString()}
                className="table-light"
              >
                <input
                  style={inputStyle}
                  type="text"
                  value={item[col]}
                  onChange={e => onEdit(index, col, e)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditTable;
