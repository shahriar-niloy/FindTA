import React from 'react';

const Circle = ({ width }) => {
    const style = {
        width: "20px",
        height: "20px",
        borderRadius: "20px",
        border: "2px solid #66c1d1",
        display: "inline-block",
        marginRight: "7px"
    }
    style.width = style.height = style.borderRadius = width;
    return ( <div style={style}>
        
    </div> );
}
 
export default Circle;