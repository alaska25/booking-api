//Mini Activity

/*
Create the User model that will be used in creating the user records and storing information relevant to our application.

1. Create a "User.js" file to store the schema for our users.
2. Create a User schema with the following properties:
    - firstName - String
    - lastName - String
    - email -String
    - password - String
    - isAdmin - Boolean (Default value is false)
    - mobileNo - String
    - enrollments - Array of objects
        - courseId - String
        - enrolledOn - Date (Default value - new Date object)
        - status - String (Default value - Enrolled)
3. Make sure that all the fields are required (except fields with default value) to ensure consistency in the user information being stored in our database.
4. Make sure to export your User model.

*/

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name is required"]
    },
    lastName:{
        type:String,
        required: [true, "Last name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
     password:{
        type: String,
        required: [true, "Password is required"]
    },
     isAdmin:{
        type: Boolean,
        default: false
    },
    mobileNo:{
        type: String,
        required: [true, "Mobile number is required"]
    },
    createdOn:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("User", userSchema)