const express = require("express");

const banksController = require("../controllers/banks_controller");
const { verify_token } = require("../utils/verify_token");

const router = express.Router();

router.post("/myBank", verify_token, banksController.myBank);
router.post("/addMoney", verify_token, banksController.addMoney);

module.exports = router;
