import React from 'react';

const Delete = ({ onClick, id }) => {
    return <i style={{ cursor: "pointer", color: "#4a4a4a" }} className="fa fa-trash" onClick={() => onClick(id)} aria-hidden="true" />;
}

export default Delete;