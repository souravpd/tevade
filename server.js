/**
 * You’ve Joined a bank named T-Evading bank, Aka Tax evading bank. Create a UI with the following routes:

/signup
There will be a signup form which will store the email and password in local/session storage.
Password must be at least 8 characters long which must include uppercase & lowercase alphabets also numbers
Email must have @ sign

/login
You need to verify the already stored email/password here if the login fails give an alert saying “Please Register The User”

/my-bank
	This screen will have a form where you would have 4 fields
Name
Passbook number (exactly 12 characters long)
Amount ( in $ and not more than 60000 )
Phone number ( the user can be of any country so country code is necessary )
	Then a Add Money Button
		On Success Display an alert or toast saying “ Money Added “
		On Failure 
Immediately Logout the user and give an alert/toast Saying “ We Cannot Process Your Request Choose Some Other Bank “
Also Remove the user from local/session storage
	After that Add a Check Passbook Button that will redirect to a route called /passbook
   	Finally Add a Calculate Tax Button That will take you to a different route called /tax

Upload and share the github repo for this code.


Important: All the routes except for /signup and /login must be guarded routes

 */

const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const banksRouter = require("./routes/bank");

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(morgan("tiny"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bank", banksRouter);

app.listen(port, function (error) {
  if (error) {
    console.err(`ERROR IN STARTING THE SERVER ${error}`);
  } else {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
  }
});
