import React, { Component } from "react";
import Button from './button';

class InfoBox extends Component {
  state = {};

  style = {
    margin: "10px",
    fontSize : "0.9rem"
  };

  handleClick = () => {
    //console.log("Clicked");
  };

  render() {
    const { buttonParamId, pic, data, paths, buttonLabel, heading, onClick } = this.props;
    //console.log("Infobox", data);
    if(!data)
      return null; 
    return (
      <div
        style={this.style}
        className="infobox shadow-sm p-4 bg-white rounded d-flex flex-column justify-content-center align-items-center"
      >
        <div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={pic}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "150px",
                marginBottom: "10px",
                objectFit: "cover"
              }}
            />
            <h5 style={{textAlign: "center"}} ><b>{data[heading]}</b></h5>
          </div>
          <div>
            {paths.map((item, index) => {
                return <div key={index}><b className="text-capitalize">{item}: </b>{data[item]}</div>
            })}
            <div style={{textAlign: "center"}}>
              <Button data={data[buttonParamId]} label={buttonLabel} onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InfoBox.defaultProps = {
  pic: "/images/pp.png",
  label: "Button Text"
};

export default InfoBox;
