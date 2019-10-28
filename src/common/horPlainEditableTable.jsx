import React from "react";

const inputStyle = {
  border: "1px solid #E8E8E8",
  margin: "0px",
  padding: "4px",
  borderRadius: "5px"
};

const cellStyle = {
  paddingRight: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  textTransform: "capitalize",
  fontWeight: "bold"
};

const HorizontalPlainEditableTable = ({ data, path, onChange }) => {
  if (data.length === 0) return null;
  return (
    <table>
      <thead>
        <tr>
          {path.map((item, index) => (
            <th key={index} style={cellStyle}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index.toString() + "1"}>
            {path.map((it, ind) => 
              <td style={cellStyle} key={ind.toString() + "3"}>
                {it === "action" ? row[it] : <input
                  id={index.toString()+"-"+ind.toString()}
                  style={inputStyle}
                  type="text"
                  onChange={onChange}
                  value={row[it]}
                  name={it}
                />}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HorizontalPlainEditableTable;
