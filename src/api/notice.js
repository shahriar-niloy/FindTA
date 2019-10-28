import axios from "axios";
const axiosCORS = axios.create({ withCredentials: true });
const config = require('../config/default.json');
const apiEndpoint = config.api;

export const addNotice = async (notice) => {
  try {
    const promise = axiosCORS.post(
        apiEndpoint+"/notice",
      notice
    );
    const response = await promise;
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error posting notice");
    }
  } catch (error) {
    console.log("Post Notice Error: ", error);
    return error.response.status;
  }
};

export const getNotices = async () => {
    try {
        const promise = axios.get(apiEndpoint+"/notice");
        const response  = await promise;
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error("Error getting notice");;
        }
    } catch(error) {
        console.log("Post Notice Error: ", error);
        return error.response.status;
    }
}

export const getNoticesByCourse = async (id) => {
  try{
    const { status, data } = await axios.get(apiEndpoint+"/notice/course/"+id);
    if(status === 200){
      return data;
    }else{
      throw new Error("GetNoticeByCourse Error!");
    }
  }catch(error){
    console.log(error);
  }
}

export const updateNotice = async (id, obj) => {
  try {
      const promise = axios.put(apiEndpoint+"/notice/"+id.toString(), obj);
      const response  = await promise;
      if(response.status === 200){
          return response.data;
      }else{
          throw new Error("Error updating notice");
      }
  } catch(error) {
      console.log("Update Notice Error: ", error);
      return 0;
  }
}

export const deleteNotice = async (id) => {
  try{
    const result = await axios.delete(apiEndpoint+"/notice/"+id.toString(), id);
    return result.status;
  }catch(error){
    console.log("Notice Delelte Error", error);
    return -1;
  }
}

