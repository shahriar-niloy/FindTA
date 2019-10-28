import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ header, data, path }) => {
  return (
    <table className="table table-bordered" style={{ textAlign: "center" }}>
      <TableHeader headers={header} />
      <TableBody data={data} path={path} />
    </table>
  );
};

export default Table;
