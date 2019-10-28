import axios from 'axios'; 
const config = require('../config/default.json');
const apiEndpoint = config.api;

export const getUTA = async () => {
    const promise = axios.get(apiEndpoint+"/uta");
    const { data:uta } = await promise; 
    return uta;
};

export const getUTAByID = async (id) => {
    const promise = axios.get(apiEndpoint+"/uta/"+id);
    const { data:uta } = await promise; 
    return uta;
};