import axios from "axios";
const config = require('../config/default.json');
const apiEndpoint = config.api;
const axiosCORS = axios.create({ withCredentials: true });

export const getSchedule = async id => {
  try {
    const promise = axiosCORS.get(
      apiEndpoint+"/uta/schedule/" + id.toString()
    );
    const { data } = await promise;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getEmptySchedule = async id => {
  try {
    const promise = axiosCORS.get(apiEndpoint+"/uta/schedule/");
    const { data } = await promise;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateSchedule = async data => {
  try {
    const promise = axiosCORS.post(
      apiEndpoint+"/uta/updateSchedule",
      data
    );
    const response = await promise;
    if(response.status === 200) return true;
    else return false; 
  } catch (error) {
      console.log("Update Schedule Error: " + error);
  }
};
