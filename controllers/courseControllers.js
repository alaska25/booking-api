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