const User = require("../models/User");
const Course = require("../models/Course")
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Check if the email already exists
/*
	Steps:
	1. Use mongoose "find" method to find the duplicate emails.
	2. Use the ".then" method to send back a response to the front end application based on the result of find method.

*/

module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		// result is equal to an empty array ([]);
		// if result is greater than 0, user is found/already exists.
		if(result.length > 0){
			return true;
		}
		// No duplicate email found
		else{
			return false;
		}
	});
}

// User Registration
/*
	Steps:
	1. Create a new User object using the mongoose model and the information from the request body.
	2. Make sure that the password is encrypted.
	3. Save the new User to the database.

*/

module.exports.registerUser = (reqBody) =>{
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		// Syntax: bcrypt.hashSync(dataToBeEncrypted, salt)
		password: bcrypt.hashSync(reqBody.password, 10),
		mobileNo: reqBody.mobileNo
	})

	return newUser.save().then((user, error) =>{
		if(error){
			return false;
		}
		else{
			console.log(user);
			return true;
		}
	})
}

// User login
/*
	Steps:
	1. Check the database if the user's email is registered.
	2. Compare the password provided in the login form with the password stored in the database.
	3. Generate and return a JSON Web Token if the user is successfully login and return false if not
*/

module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result =>{

		// User does not exist
		if(result == null){
			return false;
		}
		// User exists
		else{
			// Syntax: bcrypt.compareSync(data, encrypted);
			// reqBody.password & result.password
			// bcrypt.compareSync() return Boolean
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			// If the passwords match the result.
			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)}
			}
			// Password do not match
			else{
				return false;
			}
		}

	})
}

// Retrieve user details
/*
	Steps:
	1. Find the document in the database using the user's ID.
	2. Reassign the password of the result document to an empty string("").
	3. Return the result back to the frontend.
*/
module.exports.getProfile = (data) =>{
	console.log(data)
	return User.findById(data.userId).then(result =>{
		result.password ="";

		return result;
	})
}

// Enroll user to a class
/*
	Steps:
	1. Find the document in the database using the user's ID.
	2. Add the courseId to the user's enrollments array.
	3. Add the userId to the course's enrollees array.
	4. Update the document in the MongoDB Atlas database

*/
// Async await will be use in the enrolling the user because we will need to update 2 separate documents (users, courses) when enrolling a user.
module.exports.enroll = async (data) =>{
		
		//true or false										//result
	let isUserUpdated = await User.findById(data.userId).then(user =>{
		// Add the courseId in the user's enrollment array
		user.enrollments.push({courseId: data.courseId})

		// Saves the updated user information in the database.
		return user.save().then((enrollment, error)=>{
			if(error){
				return false;
			}
			else{
				return true;
			}

		})
	})

	console.log(isUserUpdated);

	let isCourseUpdated = await Course.findById(data.courseId).then(course =>{
		
		// Adds the userId in the course's enrollees array
		course.enrollees.push({userId: data.userId})

		// Minus the slots available by 1
		course.slots -= 1;

		// Saves the updated course information in the database
		return course.save().then((enrollees, error) =>{
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	})

	console.log(isCourseUpdated);

	// Condition that will check if the user and course documents have been updated.
	// User enrollment successful
	if(isUserUpdated && isCourseUpdated){
		return true;
	}
	// User enrollment failure
	else{
		return false;
	}
}
