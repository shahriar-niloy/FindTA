import axios from 'axios'; 
const axiosCORS = axios.create({ withCredentials: true });
const config = require('../config/default.json');
const apiEndpoint = config.api;

export const getVisitorLast = async days => {
  try {
    const response = await axiosCORS.get(
      apiEndpoint + "/stats/last/"+days.toString()
    );
    if (response.status === 200) return response.data;
    else throw new Error("Error getting visitor stats!");
  } catch (error) {
    console.log("GetVisitorLast Error", error);
  }
};

export const getVisitor = async () => {
    try {
        const { status, data } = await axiosCORS.get(
        apiEndpoint + `/stats`
        );
        if (status === 200) return data;
        else throw new Error("Error getting visitor stats!");
    } catch (error) {
        console.log("GetVisitorLast Error", error);
    }
};
  
export const sayHello = async () => {
  try {
    const result = await axiosCORS.get(apiEndpoint+"/stats/hello");
  } catch(error) {
    console.log("Error saying hello to server", error);
  }
};

export const getUniqueVisitors = async () => {
  try{
    const response = await axiosCORS.get(apiEndpoint+"/stats/unique");
    if(response.status === 200)
      return response.data;
  }catch(error){
    console.log("Error getting unique visitor", error);
  }
};

export const getPageServed = async () => {
  try{
    const response = await axiosCORS.get(apiEndpoint+"/stats/served");
    if(response.status === 200)
      return response.data;
  }catch(error){
    console.log("Error getting page served", error);
  }
};