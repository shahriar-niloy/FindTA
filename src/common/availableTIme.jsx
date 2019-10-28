import React from 'react';

const AvailableTime = (props) => {
    const style = {
        padding: "10px 20px",
        height: "100%",
        borderRadius: "5px",
        background: "rgb(180, 224, 233) none repeat scroll 0% 0%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "15px",
        fontWeight: "bold",
        color: "rgb(66, 66, 66)"
    }
    return ( <div className="" style={style}>{props.data}</div> );
}

export default AvailableTime;