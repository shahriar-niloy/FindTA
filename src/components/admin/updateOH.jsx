import React from "react";
import EditTable from "../../common/editTable";
import { getSchedule, getEmptySchedule, updateSchedule } from "./../../api/schedule";
import Header from "../../common/header";
import { getUTA } from "../../api/uta";
import Select from "../../common/select";
import Form from './../../common/Form';
import { getInstructors } from "../../api/instructors";

class UpdateOH extends Form {
  state = {
    object: [],
    schedule: {id: "", oh: []},
    currentObject: "",
    success: false,
    failed: false,
    type: ""
  };

  headers = [
    "",
    "08:00-10:00",
    "10:10-11:40",
    "11:50-01:20",
    "01:30-03:00",
    "03:10-04:40",
    "04:50-06:50"
  ];
  path = ["day", "TS1", "TS2", "TS3", "TS4", "TS5", "TS6"];
  emptySchedule = [];

  componentDidMount() {
    this.getObjectData();
  }

  componentDidUpdate(){
    console.log("Update", this.props.type, this.state.type);
    if(this.props.type !== this.state.type)
      this.getObjectData();
  }

  getObjectData = async () => {
    const { type } = this.props;
    let object;
    if(type === "uta"){
      object = await getUTA();
    }
    else if(type === "instructor"){
      object = await getInstructors();
    }
    //this.resetSchedule();
    this.setState({ failed: false, success: false, currentObject: "", object, type, schedule: { id: "", oh: [] } });
  }

  handleEdit = (rowNum, colName, e) => {
    const schedule = {...this.state.schedule};
    schedule.oh[rowNum][colName] = e.target.value;
    this.setState({ schedule });
  };

  handleSave = async () => {
    //call backend to save the changes to database
    //send a json object back to server which will decode and store it in database
    let success = false; 
    let failed = false; 
    await updateSchedule(this.state.schedule) ? success = true : failed = true;
    this.setState({ success, failed });
  };

  resetSchedule  = () => {
    const schedule = {
      id: "", oh: []
    };
    this.setState({ schedule });
  };

  handleObjectChange = async e => {
    const { object } = this.state;
    const currentObject = parseInt(e.target.value);
    if(currentObject === "") {
      this.resetSchedule(); 
      return;
    }
    const objectID = object.find(item => item.schID === currentObject);
    console.log("OBJECT", object, currentObject);
    console.log("OBJECTID", objectID);
    const schedule = { id: objectID.schID, oh: await getSchedule(objectID.schID) };
    console.log("schedule", schedule, objectID.schID);
    if (schedule.oh.length === 0) {
      schedule.oh = await getEmptySchedule();
    }
    this.setState({ currentObject, schedule, success: false, failed: false });
  };

  render() {
    const { schedule, object, success, failed, currentObject } = this.state;
    const { type }= this.props;

    console.log("render", object, this.state.currentObject);
    return (
      <div style={{ minWidth:"500px" }}className="bg-white shadow-sm rounded mt-5 mb-5">
        <Header heading="Update Office Hour" />
        <div className="mr-4 ml-4">
          {success ? this.renderAlertSuccess("Office Hour Updated Successfully") : null}
          {failed ? this.renderAlertDanger("Couldn't update the Office Hour") : null}
        </div>
        <div className="mr-4 ml-4 mb-3">
          <Select
            name="object"
            data={object}
            path="schID"
            displayValue="name"
            blankOption={`Select an ${type}`}
            onChange={this.handleObjectChange}
          />
        </div>
        <div className="pr-4 pl-4">
            <EditTable
              headers={this.headers}
              data={schedule.oh}
              path={this.path}
              onEdit={this.handleEdit}
            />
        </div>
        <button
          onClick={this.handleSave}
          className="btn btn-primary float-right mr-4 mb-4"
          disabled={currentObject==="" ?true:false}
        >
          Save
        </button>
      </div>
    );
  }
}

export default UpdateOH;
