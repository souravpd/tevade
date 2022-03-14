const User = require("../models/user");

module.exports.signUp = async function (request, response) {
  let form_data = {
    email: request.body.email,
    password: request.body.password,
    countryCode: request.body.countryCode,
    phoneNumber: request.body.phoneNumber,
  };
  User.signUp(form_data)
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

module.exports.login = async function (request, response) {
  User.login(request.body)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
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
