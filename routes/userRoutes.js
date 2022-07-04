const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const auth = require("../auth");

// Router for checking if the email exists
router.post("/checkEmail", (req, res) =>{
	userControllers.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

// Router for the user registration
router.post("/register",(req, res) =>{
	userControllers.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for the user login (with token creation)
router.post("/login", (req, res)=>{
	userControllers.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

// Route for the retrieving the current user's details
router.get("/details", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization); //contains the token 
	console.log(userData);

	// Provides the user's ID for the getProfile controller method
	userControllers.getProfile({userId: userData.id}).then(resultFromController => res.send(resultFromController));
})

// Route to enroll a course
router.post("/enroll", auth.verify, (req, res)=>{
	const userData = auth.decode(req.headers.authorization)

	let data = {
		// UserId will be retrieved from the request header
		userId: userData.id,
		// CourseId will be retrieved from the request body
		courseId: req.body.courseId
	}
	if(userData.isAdmin){
		res.send("You're not allowed to access this page!")
	}
	else{
		userControllers.enroll(data).then(resultFromController => res.send(resultFromController));
	}
	
})

module.exports = router;
