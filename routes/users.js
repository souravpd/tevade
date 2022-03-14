const express = require("express");
/**
 * Users
 * ===========
 * Email
 * Password
 * CountryCode
 * PhoneNumber
 * PassbookNumber
 * Amount
 */
const usersController = require("../controllers/users_controller");

const router = express.Router();

router.post("/signUp", usersController.signUp);
router.post("/login", usersController.login);

module.exports = router;
