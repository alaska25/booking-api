const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/courseControllers");
const auth = require("../auth");

//Route for creating a course
router.post("/", auth.verify, (req, res)=>{
	const userData = auth.decode(req.headers.authorization);
	// if the user is Admin, proceed with the course creation
	if(userData.isAdmin){
		courseControllers.addCourse(req.body).then(resultFromController => res.send(resultFromController))
	}
	// If the user is not Admin, send a response "You don't have permission on this page!"
	else{
		res.send("You don't have permission on this page!");
	}
	
});


// Route for retrieving all the courses.
router.get("/all", auth.verify, (req, res)=>{
	courseControllers.getAllCourses().then(resultFromController => res.send(resultFromController));
})

// Route for retrieving all active courses
router.get("/", (req, res) => {
	courseControllers.getAllActive().then(resultFromController => res.send(resultFromController));
})

// Route for retrieving a specific course
router.get("/:courseId", (req, res)=>{
	console.log(req.params.courseId);

	courseControllers.getCourse(req.params.courseId).then(resultFromController => res.send(resultFromController));
}) 

//Route for updating a course
router.put("/:courseId", auth.verify, (req, res)=>{
									//Search key        //Update
	courseControllers.updateCourse(req.params.courseId, req.body).then(resultFromController => res.send(resultFromController));
})

// Routes to Archive a course
router.patch("/:courseId/archive", auth.verify, (req, res) =>{
	courseControllers.archiveCourse(req.params.courseId, req.Body).then(resultFromController => res.send(resultFromController));
})


module.exports = router;



