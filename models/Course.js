/*
Course properties:
name
description
slots
price
isActive
enrollees
*/
const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "Course name is required"]
	},
	description:{
		type:String,
		required: [true, "Description is required"]
	},
	price:{
		type: Number,
		required: [true, "Price is required"]
	},
	slots:{
		type: Number,
		required: [true, "Slot is required"]
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