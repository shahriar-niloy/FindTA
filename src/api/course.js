import axios from "axios";
const config = require('../config/default.json');
const axiosCORS = axios.create({ withCredentials: true });
const apiEndpoint = config.api;

export const getCourses = async () => {
  try {
    const promise = axios.get(apiEndpoint+"/courses");
    const { data: courses } = await promise;
    return courses;
  } catch (error) {
      console.log("Course Fetch Error: " + error);
  }
};

export const getCourse = async (id) => {
    try {
      const promise = axios.get(apiEndpoint+`/courses/${id}`);
      const { data: course } = await promise;
      return course;
    } catch (error) {
      console.log("Course Fetch Error: " + error);
      return [];
    }
  };

  export const deleteCourse = async (id) => {
    try {
      const promise = axiosCORS.delete(apiEndpoint+"/courses/"+id);
      const response = await promise; 
      if(response.status === 200){
        return true;
      }else{
        throw new Error("Course Delete Error");
      }
    } catch(error) {
      console.log("Course delete error: " + error);
      return false; 
    }
  };
  
  export const updateCourse = async (id, postObj) => {
    try {
      const promise = axiosCORS.put(apiEndpoint+"/courses/"+id, postObj);
      const response = await promise; 
      if(response.status === 200){
        return true;
      }else{
        throw new Error("Course Update Error");
      }
    } catch(error) {
      console.log("Course update error: ");
      console.log(error);
      return false; 
    }
  };

  export const getCourseMaterials = async (id) => {
    try{
      const promise = axios.get(apiEndpoint+"/courses/materials/"+id); 
      const { data } = await promise;
      return  data;
    }catch(error){
      console.log("Axious get course material error: ", error);
      return [];
    }
  };

  export const insertCourse = async (obj) => {
    try{
      const promise = axiosCORS.post(apiEndpoint+"/courses", obj);
      const response = await promise;
      return response.status; 
    } catch(error) {
      console.log("Insert Course error: ", error);
      if(!error.response)
        return 999;
      return error.response.status;
    }
  };

  export const updateCourseMaterial = async (id, obj) => {
    // obj.map((item) => {
    //   delete item.action;
    //   return 0;
    // });
    console.log("in update course material");
    try {
      const response = await axiosCORS.put(apiEndpoint+"/courses/materials/"+id, obj);
      console.log("Response Status code: ", response.status);
      if(response.status === 200){
        console.log("Course material update successfully ");
        return true;
      }else{
        throw new Error("updateCourseMaterial Error");
      }
    } catch(error) {
      console.log("Course material update error: " + error, obj);
      return false; 
    }
  };

  export const deleteCouseMaterial = async (dataObj) => {
    const { courseID, name } = dataObj;
    console.log("deleteCouseMaterial", dataObj);
    try {
      const response = await axiosCORS.delete(apiEndpoint+`/courses/materials/delete/${courseID}/${name}`);
      if(response.status === 200){
        return true;
      }else{
        throw new Error("Course Material Couldn't be deleted");
      }
    } catch(error) {
      console.log("Delete Course Material Error: ", error);
      return false; 
    }
  };