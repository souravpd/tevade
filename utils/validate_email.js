const { pool } = require("../config/db");

function validate_email(email) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT email FROM users WHERE email=?`,
      [email],
      function (error, results) {
        if (error) {
          return reject(error);
        }
        if (results.length > 0) {
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
}

module.exports = { validate_email };
