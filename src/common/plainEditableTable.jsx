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

const PlainEditableTable = ({ data, path, onChange }) => {
  if (!data) return null;
  //console.log("plaintabile", data);
  return (
    <table>
      <tbody>
        {path.map((item, index) => (
          <tr key={index + "1"}>
            <td key={index + "2"} style={cellStyle} className="pr-2">
              {item}
            </td>
            <td style={cellStyle} key={index + "3"}>
              <input
                style={inputStyle}
                type="text"
                onChange={onChange}
                value={data[item]}
                name={item}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlainEditableTable;
