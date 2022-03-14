const Bank = require("../models/bank");

module.exports.myBank = async function (request, response) {
  let email = request.body.email;
  Bank.myBank({ email: email })
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results: results,
      });
    })
    .catch(function (error) {
      return response
        .status(400)
        .json({ success: false, error: error, results: null });
    });
};

module.exports.addMoney = async function (request, response) {
  let email = request.body.email;
  let money = request.body.money;
  Bank.addMoney({ email: email, money: money })
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results: results,
      });
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};
