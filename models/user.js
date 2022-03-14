const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
const { validate } = require("../utils/validate");
const { validate_email } = require("../utils/validate_email");

function generate(n) {
  var add = 1,
    max = 12 - add;

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

module.exports.signUp = function ({
  email: email,
  password: password,
  countryCode: countryCode,
  phoneNumber: phoneNumber,
}) {
  return new Promise(async function (resolve, reject) {
    let isValidEmail;
    try {
      isValidEmail = await validate_email(email);
    } catch (error) {
      return reject(error);
    }
    if (!isValidEmail) {
      return reject("Email Already Taken");
    }
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (error, salt) {
      if (error) {
        return reject(error);
      }
      bcrypt.hash(password, salt, function (error, hash) {
        if (error) {
          return reject(error);
        }
        pool.query(
          `INSERT INTO users (email,password,country_code,phone_number,passbook_number) VALUES(?,?,?,?,?)`,
          [email, hash, countryCode, phoneNumber, generate(12)],
          function (error, _) {
            if (error) {
              return reject(error);
            }
            return resolve("Account Created");
          }
        );
      });
    });
  });
};

//Login
module.exports.login = function ({ email, password }) {
  return new Promise(async function (resolve, reject) {
    let ans;
    try {
      ans = await validate(email, password);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      jwt.sign(
        { email },
        process.env.SIGN_SECRET,
        { expiresIn: "24h" },
        function (error, token) {
          if (error) {
            return reject(error);
          }
          return resolve({
            email: email,
            access_token: token,
          });
        }
      );
    } else {
      return reject("Incorrect Information");
    }
  });
};

module.exports.logout = function () {
  //@todo
};
