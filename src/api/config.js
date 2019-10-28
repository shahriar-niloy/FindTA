import axios from "axios";
const config = require('../config/default.json');
const apiEndpoint = config.api;

export const getStartDate = async () => {
    try{
        const response = await axios.get(apiEndpoint+"/config/startDate");
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error("Error getting startdate");
        }
    }catch(error){
        console.log(error);
    }
}

export const getEndDate = async () => {
    try{
        const response = await axios.get(apiEndpoint+"/config/endDate");
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error("Error getting enddate");
        }
    }catch(error){
        console.log(error);
    }
}
