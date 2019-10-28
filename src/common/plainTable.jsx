import React from "react";

const PlainTable = ({ data, path }) => {
    const headerStyle = {
        textTransform: "capitalize"
    }
  return (
    <table className="table">
      <thead style={headerStyle}>
        <tr>
          {path.map((item, index) => 
            <th key={index} scope="col">
              {item}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {path.map((it, ind) => (
              <td key={ind}>{item[it]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlainTable;
