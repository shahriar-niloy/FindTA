import React from "react";

const TableHeader = props => {
  return (
    <thead>
      <tr>
        {props.headers.map((head, ind) => (
          <th key={ind} style={props.style} scope="col" className="table-secondary">
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.defaultProps = {
  style: {}
};

export default TableHeader;
