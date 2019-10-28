import axios from 'axios'; 
const config = require('../config/default.json');
const apiEndpoint = config.api;

export const getInstructors = async () => {
    const promise = axios.get(apiEndpoint+"/instructors");
    const { data:instructors } = await promise; 
    return instructors;
};

export const getInstructor = async (id) => {
    try{
        const promise = axios.get(apiEndpoint+`/instructors/${id}`);
        const { data:instructor } = await promise; 
        return instructor;
    }catch(error){
        console.log("Error Getting instructor!");
    }
};