import React from 'react';
import Joi from 'joi';
import _ from 'lodash';
import Header from '../../common/header';
import Select from '../../common/select';
import PlainEditableTable from '../../common/plainEditableTable';
import { getCourses, deleteCourse, updateCourse, getCourseMaterials, updateCourseMaterial, deleteCouseMaterial } from '../../api/course';
import Delete from '../../common/Delete';
import PlainTable from '../../common/plainTable';
import Manager from './../../common/admin/manage';
import Form from '../../common/Form';
import HorizontalPlainEditableTable from '../../common/horPlainEditableTable';
import AddIcon from '../../common/admin/addIcon';

class ManageCourse extends Manager {
    state = { 
        courses: [],
        material: [], 
        currentCourse: "",
        deleteFailed: false,
        failed: false,
        success: false,
        matDeleteFailed: false,
        infoError: "",
        matError: ""
    }
    
    courseSchema = {
        code: Joi.string().required().label("Course Code"),
        title: Joi.string().required().label("Title"),
        sec: Joi.number().integer().min(1).max(30).required().label("Section"),
        timeslot: Joi.string().required().label("Time Slot")
    }

    materialSchema = Joi.array().items(Joi.object({
        courseID: Joi.number().integer().required().label("Course Code"),
        name: Joi.string().required().label("Name"),
        link: Joi.string().required().label("Link")
    }));

    form = new Form();
    path = ["code", "title", "sec", "timeslot"];
    matPath = ["name", "link", "action"];

    async componentDidMount() {
        const courses = await getCourses();
        //console.log("Compound did mount: ", courses);
        this.setState({ courses });
    }

    addContent = (obj, path) => {
        obj.map((item, index) => {
            return obj[index].action = <Delete id={item[path]} onClick={this.handleDelete}/>;
        });
    }
    
    addContentDynamic = (obj, label, contentGenerator) => {
        obj.map((item, index) => {
            return obj[index][label] = contentGenerator(item);
        });
    }

    renderDeleteIcon = (data)  => {
        //console.log("renderDeleteIcon", data);
        return <Delete id={data} onClick={this.handleMaterialDelete} />
    }

    getCourseIndex = (courseCode) => {
        const { courses } = this.state;
        //console.log("courseINDEX: ", courses, "Coursecode: ", courseCode);
        for(let course in courses){
            if(courses[course].id === courseCode){
                //console.log("courseINDEX return: ", typeof(courses[course].id), typeof(courseCode));
                return course;
            }
        }
    }

    handleDelete = async (id) => {
        const courses = [...this.state.courses];
        let currentCourse = this.state.currentCourse;
        let newCourses = [];
        const status = await deleteCourse(id);
        if(!status) {
            return this.setState({ deleteFailed: true });
        }
        newCourses = courses.filter((item) => item.id !== id);
        if(currentCourse === parseInt(id)){
            currentCourse = ""; 
        }
        this.setState({ currentCourse, courses: newCourses });
    }

    handleMaterialDelete = async (dataObj) => {
        let material = this.state.material;
        const success = await deleteCouseMaterial(dataObj);
        if(!success){
            this.setState({ matDeleteFailed: true });
            return;
        }
        //console.log("handleMaterialDelete1", material);
        material = material.filter((row) => row.name !== dataObj.name);
        //console.log("handleMaterialDelete2", material);
        this.setState({ material });
    }

    handleUpdate = async () => {
        let infoError = "", matError = "";
        let success = false, failed = false; 
        const { currentCourse, courses } = {...this.state};
        const index = this.getCourseIndex(currentCourse);
        const { code, sec, timeslot, title } = courses[index];
        const postObj = { code: code, sec: sec, timeslot: timeslot, title: title };
        let material = _.cloneDeep(this.state.material);
        material.map((item) => delete item.action);
        let validationResult = Joi.validate(postObj, this.courseSchema);
        if(validationResult.error){
            infoError = validationResult.error.details[0].message;
        }
        console.log("Errors:",infoError, matError);
        if(material.length){
            validationResult = Joi.validate(material, this.materialSchema);
            if(validationResult.error){
                matError = validationResult.error.details[0].message;
                console.log(validationResult, material);
            }
        }
        if(infoError || matError){
            this.setState({ infoError, matError });
            return;
        }
        console.log("await start");
        const status = await updateCourse(currentCourse, postObj);
        let matStatus;
        console.log("await 2");
        if(material.length)
            matStatus =  await updateCourseMaterial(currentCourse, material);
        else
            matStatus = true;
        console.log("await end");
        console.log("handleUpdate", status, matStatus);
        if(status && matStatus){
            success = true;
        }else{
            failed = true;
        }
        console.log("Errors2:",infoError, matError);
        this.setState({ matError, infoError, success, failed });
    }

    handleChange = (e) => {
        let currentCourse = this.state.currentCourse;
        const index = this.getCourseIndex(this.state.currentCourse);
        let courses = [...this.state.courses];
        courses[index][e.target.name] = e.target.value;
        if(e.target.name === "code"){
            currentCourse = e.target.value;
        }
        this.setState({ courses, currentCourse });
    };

    handleCourseChange = async (e) => {
        const event = {
            target: {
                name: e.target.name, 
                value: e.target.value === "" ? "" : parseInt(e.target.value)
            }
        };
        const courses = await getCourses();
        const material = await getCourseMaterials(event.target.value);
        this.handleSelectChange(event, "currentCourse", { courses, material, matDeleteFailed: false, success: false, failed: false });
    };

    handleAddClick = (e) => {
        const material = [...this.state.material];
        material.push({ courseID: this.state.currentCourse, name: "", link: "" });
        this.setState({ material });
    };

    handleMaterialChange = (e) => {
        let material = [...this.state.material];
        material[e.target.id.split("-")[0]][e.target.name] = e.target.value; // unufniushed
        //console.log("target: ", e.target.id);
        //console.log("change method 2:" , material);
        this.setState({ material });
    };

    render() { 
        const { courses, currentCourse, failed, success, material, deleteFailed, matDeleteFailed, matError, infoError } = this.state;
        if(!courses || !material)
            return null;
        this.addContent(courses, "id");
        this.addContentDynamic(material, "action", this.renderDeleteIcon);
        //console.log("Currentcourse: ", currentCourse);
        return <div style={{ minWidth: "500px" }} className="bg-white shadow-sm rounded mt-5 mb-5">
            <Header heading="Manage Course" />
            <Header heading="All Courses" />
            <div className="mr-4 ml-4">
                {deleteFailed && this.form.renderAlertDanger("Could not delete course!")}
            </div>
            <div className="mr-4 ml-4">
                <PlainTable data={courses} path={["code", "title", "action"]} onDelete={this.handleDelete} />
            </div>
            <Header heading="Update Course" />
            <div className="mr-4 ml-4">
                <Select displayValue="title" data={courses} path="id" value="title" blankOption="Select a course" onChange={this.handleCourseChange} />
            </div>
            <div className="d-flex flex-row mb-3">
                <div className="d-flex flex-column">
                    <Header heading="Course Info" />
                    <div className="ml-4 mr-4">
                        <PlainEditableTable data={courses[this.getCourseIndex(currentCourse)]} path={this.path} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <Header heading="Course Materials" />
                    <div className="ml-4 mr-4">
                        <HorizontalPlainEditableTable data={material} path={this.matPath} onChange={this.handleMaterialChange} /> 
                    </div>
                    <div className="ml-4 mr-4">
                        {matDeleteFailed && this.form.renderAlertDanger("Couldn't delete material!")}
                    </div>
                    <div className="mr-4">
                        {currentCourse && <AddIcon onClick={this.handleAddClick} />}
                    </div>
                </div>
            </div>
            <div className="mr-4 ml-4">
                {infoError !== "" && this.form.renderAlertDanger(infoError)}
                {matError !== "" && this.form.renderAlertDanger(matError)}
                {failed ? this.form.renderAlertDanger("Update not Successful") : null}
                {success ? this.form.renderAlertSuccess("Update Successful") : null}
            </div>
            <button className="btn btn-primary float-right mr-4 mb-3" onClick={this.handleUpdate} disabled={currentCourse==="" ? true : false}>Update</button>
        </div>;
    }
}
 
export default ManageCourse;