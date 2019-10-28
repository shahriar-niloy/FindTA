import React, { Component } from "react";
import ProfilePic from "../common/profilePic";
import AvailableTime from "./../common/availableTIme";
import axios from 'axios';
import { Link } from 'react-router-dom';

class AvailableTA extends Component {
  state = { 
    availablePersons: []
  }

  timeSlots = [
    "08:30-10:00",
    "10:10-11:40",
    "11:50-01:20",
    "01:30-03:00",
    "03:10-04:40",
    "04:50-6:50"
  ];
  pic = [];
  officeHour = [];
  path = ["TS1", "TS2", "TS3", "TS4", "TS5", "TS6"];

  async componentDidMount(){
    const availablePersons = await this.findAvailableTime();
    this.setState({ availablePersons });
  }

  getOfficeHour = async () => {
    this.pic = [];
    this.officeHour.length = 0;
    const { data: utas } = await axios.get("http://localhost:3000/api/uta");
    for(var i in utas){
      const { data: oh} = await axios.get("http://localhost:3000/api/uta/schedule/" + utas[i].id);
      this.officeHour.push(oh);
      this.pic.push({ id: utas[i].id, pic: utas[i].picture });
    }
  }

  findAvailableTime = async () => {
    const time = {
      day: new Date().getDay(),
      hour: new Date().getHours(),
      min: new Date().getMinutes()
    };
    await this.getOfficeHour();
    let availablePersons = [];
    this.officeHour.map((uta, id) => {
      let obj = {
        id: "",
        time: []
      };
      let avaToday = false;
      if (time.day >= 0 && time.day <= 4) {
        for (let i = 0; i < this.path.length; ++i) {
          if (uta[time.day][this.path[i]] === "Office Hour") {
            const slot = this.tokenize(this.timeSlots[i]);
            const endTime = (parseInt(slot.end.hour) <= 12 && (parseInt(slot.end.hour) > 7)  ? parseInt(slot.end.hour) : parseInt(slot.end.hour) + 12);
            if (parseInt(time.hour) < endTime) {
              avaToday = true;
              obj.id = uta[0].utaid;
              obj.time.push(this.timeSlots[i]);
            } else if (parseInt(time.hour) === endTime) {
              if (parseInt(time.min) < parseInt(slot.end.min)) {
                avaToday = true;
                obj.id = uta[0].utaid;
                obj.time.push(this.timeSlots[i]);
              }
            }
          }
        }
        if(avaToday) availablePersons.push(obj);
      } else {
        //console.log("in else");
      }
      return 0;
    });
    return availablePersons;
  };

  tokenize = string => {
    let timeSlot = {
      start: {
        hour: "",
        min: ""
      },
      end: {
        hour: "",
        min: ""
      }
    };
    timeSlot.start.hour = string.substring(0, 2);
    timeSlot.start.min = string.substring(3, 5);
    timeSlot.end.hour = string.substring(6, 8);
    timeSlot.end.min = string.substring(9, 11);
    return timeSlot;
  };

  getPicture(id){
    const pic = this.pic.find((uta) => {return uta.id === id;});
    return pic.pic;
  }

  render() {    
    if(this.state.availablePersons.length === 0 || this.pic.length === 0)
      return <div style={{ color: "#5ca7b6" }}>No one is available today!</div>;
    return (
      <div className="d-flex flex-column">
        {this.state.availablePersons.map((person,ind) => (
          <div key={ind} className="d-flex flex-row mb-3">
            <div>{<Link to="/uta"><ProfilePic pic={this.getPicture(person.id)} width="50px" /></Link>}</div>
            {person.time.map((time, index) => (
              <div key={index}>
                <AvailableTime data={time} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default AvailableTA;