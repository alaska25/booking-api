const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/courseControllers");
const auth = require("../auth");

// Route for creating a course
// router.post("/", (req, res)=>{
// 	courseControllers.addCourse(req.body).then(resultFromController => res.send(resultFromController))
// });


router.post("/", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization); 
	console.log(userData);

	if (userData.isAdmin){
		courseControllers.addCourse(req.body).then(resultFromController => res.send(resultFromController));
	}
	else {
		return("You don’t have permission on this page!");
	}
})


module.exports = router;