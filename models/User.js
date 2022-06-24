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
const courseSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "firstName is required"]
    },
    lastName:{
        type:String,
        required: [true, "lastName is required"]
    },
    email:{
        type: String,
        required: [true, "email is required"]
    },
     password:{
        type: String,
        required: [true, "password is required"]
    },
     isAdmin:{
        type: String,
        required: [false]
    },
    mobileNumber:{
        type: Boolean,
        required: [true, "mobileNumber is required"]
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdOn:{
        type: Date,
        default: new Date()
    },
    enrollees: [
    {
        userId: {
            type: String,
            required: [true, "UserId is Required"]
        },
        enrolledOn:{
            type: Date,
            default: new Date()
        }
    }
    ]
})

module.exports = mongoose.model("Course", courseSchema)