import React from 'react';

const AddIcon = ({ style, onClick }) => {
    return <button className="btn btn-secondary" onClick={onClick} style={style} >+</button>;
}

AddIcon.defaultProps = {
    style: {
        float: "right",
        margin: "3px"
    }
};

export default AddIcon;