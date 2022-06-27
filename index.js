// Require modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");



// Create server
const app = express();
const port = 4000;


// Connect to our MongoDB Database
mongoose.connect("mongodb+srv://admin:admin@cluster0.scuimpl.mongodb.net/course-booking-app?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;
db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => console.log("Were connected to the database."))


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Listening to port
// This syntax will allow flexibility when using the application locally or as hosted application (online).
app.use("/users", userRoutes);
app.listen(process.env.PORT || port, () =>{
	console.log(`API is now online on port ${process.env.PORT || port}`);
})
