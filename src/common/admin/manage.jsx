import { Component } from "react";
import _ from 'lodash';

class Manager extends Component {
  handleSelectChange = (e, currentInState, setStateObj) => {
    let currentValue = e.target.value;
    this.setState({ [currentInState]: currentValue, ...setStateObj });
  };

  addContentDynamic = (obj, label, contentGenerator) => {
    let objCopy = _.cloneDeep(obj);
    objCopy.map((item, index) => {
      return (objCopy[index][label] = contentGenerator(item));
    });
    return objCopy;
  };
}

export default Manager;
