
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers")
const auth = require("../auth");

//Router for checking if the email exists
router.post("/checkEmail", (req, res) =>{
	userControllers.checkEmailExists(req.body).then(resultFromController =>res.send(resultFromController));
});

// Router for the user registration
router.post("/register", (req, res)=>{
	userControllers.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for the user login(with token creation)
router.post("/login", (req, res)=>{
	userControllers.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

/*
Instructions s33 Activity:

Create a /details route that will accept the user’s Id to retrieve the details of a user.
Create a getProfile controller method for retrieving the details of the user:
a. Find the document in the database using the user's ID
b. Reassign the password of the returned document to an empty string
c. Return the result back to the frontend

Process a POST request at the /details route using postman to retrieve the details of the user.
Make sure that all the fields are required to ensure consistency in the user information being stored in our database.
Create a git repository named S32-36.
Initialize a local git repository, add the remote link and push to git with the commit message of Add activity code.
Add the link in Boodle.
// Retrieve user details

 Steps:
1. Find the document in the database using the user's ID
2. Reassign the password of the result document to an empty string("").
3. Return the result back to the frontend
 */

router.get("/details", auth.verify, (req, res)=> {
	const userData = auth.decode(req.headers.authorization); //contains the token 
	console.log(userData);
	//Provides the user's ID fot the getProfile controller method
	userControllers.getProfile({userId: userData.id}).then(resultFromController => res.send(resultFromController));
	
	//userControllers.getProfile(req.body.id).then(resultFromController=>res.send(resultFromController));
})

//Route to enroll a course(gamit ang Post method)
router.post("/enroll", auth.verify, (req, res)=> {
	const userData = auth.decode(req.headers.authorization)// id & email & isAdmin

	let data = {
		//For the userId will be retrieved from the request header
		userId: userData.id,
		//CourseId will be retrieve from the request body//kailangan i send ng client
		courseId: req.body.courseId

	}
	if(userData.isAdmin){
		res.send("You are not allowed to access this page!")
	}
	else{
	userControllers.enroll(data).then(resultFromController => res.send(resultFromController));
	}
})

module.exports = router;