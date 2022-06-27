const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers")




//Router for checking if the email exists
router.post("/checkEmail", (req, res) =>{
    userControllers.checkEmailExists(req.body).then(resultFromController =>res.send(resultFromController));
});

router.post("/register", (req, res) =>{
	userControllers.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

// Route for the user login (with woken creation)
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
Add the link in Boodle
*/


router.post("/details", (req, res)=>{
	userControllers.getProfile(req.body.id).then(resultFromController => res.send(resultFromController))
})

module.exports = router;












