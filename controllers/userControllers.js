const User = require("../models/User");
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

		// result is equal to an empty  array ([]);
		// If result is greater than 0, user is found/already exists.
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
	2. Maje sure that the password is encrypted.
	3. Save the new User to the database.
*/

module.exports.registerUser = (reqBody)=>{
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,

		//Syntax: bcrypt.hashSync(dataToBeEncrypted, salt)
		password: bcrypt.hashSync(reqBody.password, 10),
		mobileNo: reqBody.mobileNo
	})
	return newUser.save().then((user, error)=>{
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
		3. Generate and return a JSON Web Token if the user is successfully login and return false if not.
*/

module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result =>{

		// User doesn't exist
		if(result == null){
			return false;
		}

		// User exist
		else{
			// Syntax: bcrypt.compareSync(data, encrypted);
			// reqBody.password & result.password
			// bcrypt.campareSync() return Boolean
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
				
				// If the password match the result.
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

////////// ACTIVITY //////////////

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
