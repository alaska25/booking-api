const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const Course = require("../models/Course");

//Check if the email already exists
/*
	Steps/business logic:
	1. Use mongoose "find" method to find the duplicatae emails.
	2. Use the "then" method to send back a response to the front end application based on the result of find method.
*/

module.exports.checkEmailExists = (reqBody) =>{
					//email gagamitin na property
					// returns an array  - []
					//if user findOne - outout is null 
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0){
			return true;
		}
		else{
			return false;
		}
	}); 
}

//User Registraion
/*
	Steps:
	1. Create a new User object usong the mongoose model and the information from the request body.
	2. Make sure that the password is enccrypted.// for security
	3. Save the new user to the database.
*/

//1. Create a new User object 
module.exports.registerUser = (reqBody) =>{
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName : reqBody.lastName,
		email: reqBody.email,
//2. Make sure that the password is enccrypted.// for security
		// Syntax: bcrypt.hasjSync(dataToBeEncrypted, salt) //salt guinagamit ilang beses dadaan sa encrypt //output is $2b$10$gYA...
		password: bcrypt.hashSync(reqBody.password, 10),
		mobileNo: reqBody.mobileNo
	})
	
//3. Save the new user to the database.
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

//User login

/*
	Steps:
	1. Check the database if the user's email is registered.
	2. Compare the password provided in the login form with the password in the database.
	3. Generate and return a JSON web token if the user is successfully login and return false if not.
*/
module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result =>{

/*module.exports.getProfile = (reqBody) => {
	return User.findOne({_id: reqBody._id}).then(result =>{*/

		//User does not exist
		if(result == null){
			return "User does not exsist";
			//return false;
		}
		//User exists
		else{
			// Syntax: bcrypt.compareSync(data(database pinaka result), encrypted);
			// reqBody.password & result.password
			//bcrypt.compareSync() return boolean
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			// If the passwords match the result.
			if(isPasswordCorrect){
				//generating a token from auth.js
				return {access: auth.createAccessToken(result)}
			}
			// Password do not match
			else{
				return "password does not match";
				//return false;
			}
		}
	})
}


//s33 activity see full instruction on userRoutes.js

/*
Instructions s33 Activity:

Create a /details route that will accept the user’s Id to retrieve the details of a user.
Create a getProfile controller method for retrieving the details of the user:
a. Find the document in the database using the user's ID
b. Reassign the password of the returned document to an empty string
c. Return the result back to the frontend

*/
/*
module.exports.getProfile = (userId) =>{
	return User.findById(userId).then(result => {
		if (result == null){
			return false;
		}
		else {
			result.password = "";
			return result;
		}
	})
}
*/

module.exports.getProfile = (data) =>{
	//console.log(data)  // ipapasa lng ang { userId: '62b9e1f4308958ec26c3cb62' } lang ang lalabas sa server kung wla ni(console.log(data)) tanan ma send na id,email,isAdmin
	return User.findById(data.userId).then(result =>{
		result.password ="";

		return result;
	})
}


//Enroll user to a class 
/*
	Steps:
	1.Find the document in the database using the user's ID.
	2.Add the courseId to the user's enrollment array.
	3.Add the userId to the course enrollees array.
	4. Update the document in the mongodb Atlas database. 
*/

//Async await will be used in the enrolling the user because we will need to update 2 separate documents(users, courses) when enrolling a user.
module.exports.enroll = async (data) => {
															//equivalent to result by findById
		//result: true or false												
	let isUserUpdated = await User.findById(data.userId).then(user => {
		//Add the courseId int hte user's enrollment array
		user.enrollments.push({courseId: data.courseId})

		//Save the updated user information in the database.
		return user.save().then((enrollment, error)=> {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	})
	console.log(isUserUpdated);

	let isCourseUpdated = await Course.findById(data.courseId).then(course => {

		//Adds the userId in the course's enrollees array
		course.enrollees.push({userId: data.userId})

		//Minus the slots available by 1
		course.slots -= 1;

		//Save the updated course information in the database
		return course.save().then((enrollees, error) => {
			if(error){
				return false
			}
			else{
				return true;
			}
		})
	})
	console.log(isCourseUpdated);

	//Condition that will check if the user and course documents have been updated.
	//User enrollment is successful(both are true)
	if(isUserUpdated && isCourseUpdated) {
		return true;
	}
	else{
		return false;
	}
}