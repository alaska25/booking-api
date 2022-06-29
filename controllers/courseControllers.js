const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Create a new course
/*
	Steps:
	1. Create a new Course object using the mongoose model and the information from the request body.
	2. Save the new User to the database.

*/
module.exports.addCourse = (reqBody) =>{
	let newCourse = new Course({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
		slots: reqBody.slots
	})
	return newCourse.save().then((course, error)=>{

		if(error){
			return false;
		}

		else{
			return true;
		}

	})
}

// Retrieve all courses
/*
	Step:
	1. Retrieve all the courses from the database
*/
module.exports.getAllCourses = () => {
	return Course.find({}).then(result => result);
}

// Retrieve all ACTIVE courses 
/*
	Steps:
		1. Retrieve all the courses from the database with the property of "isActive" to true.
*/

module.exports.getAllActive = () =>{
	return Course.find({isActive:true}).then(result  => result);
}

// Retrieving a specific course
/*
	Step:
	1. Retrieve the course that matches the course ID provided from the URL.
*/
module.exports.getCourse = (courseId) =>{
	return Course.findById(courseId).then(result => result);
}

// Update a course
/*
	Step:
	1. create a variable "updatedCourse" which will contain the  information retrieved from the request body.
	2. find and update the course using the courseID retrieved from request params/url property and the variable "updatedCourse" containing the information from the request body.
*/
module.exports.updateCourse = (courseId, reqBody) =>{
	// Specify the fields / properties to be updated
	let updatedCourse = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
		slots: reqBody.slots
	}

	// Syntax: findByIdAndUpdate(documentId, updatesToBeApplied)

	return Course.findByIdAndUpdate(courseId, updatedCourse).then((courseUpdate, error)=>{
		if(error){
			return false;
		}
		else{
			return true;
		}
	})
}

// Archive a course 
/*
	Mini Activity:
	1. Create a "archiveCourse" function that will change the status of an active course to inactive using the "isActive" property.
	2. return true, if the course is set to inactive, and false if encountered an error.
	3. Once done, send a screenshot of your postman in the batch hangouts.

*/

module.exports.archiveCourse = (courseId) =>{
	let updateActiveField = {
		isActive : false
	}

	return Course.findByIdAndUpdate(courseId, updateActiveField).then((isActive, error) =>{
		// Course is not archived
		if(error){
			return false;
		}
		// Course archived successfully
		else{
			return true
		}
	})
}
