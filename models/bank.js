const { pool } = require("../config/db");

module.exports.myBank = function ({ email: email }) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECt * FROM users WHERE email=?`,
      [email],
      function (error, results) {
        if (error || results.length === 0) {
          return reject("User Not Found");
        }
        return resolve(results[0]);
      }
    );
  });
};

module.exports.addMoney = function ({ email: email, money: money }) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (error, connection) {
      if (error) {
        return reject(error);
      }
      connection.query(
        `SELECT amount from users WHERE email=?`,
        [email],
        async function (error, results) {
          if (error) {
            connection.rollback(function () {
              connection.release();
            });
            return reject(error);
          }
          let rows = Object.values(JSON.parse(JSON.stringify(results)))[0];
          let amount = rows.amount + money;
          if (amount > 60000) {
            return reject(
              "We Cannot Process Your Request Choose Some Other Bank"
            );
          }
          let new_promise = new Promise(function (resolve, reject) {
            connection.query(
              `UPDATE users SET amount =? WHERE email=?`,
              [amount, email],
              function (error, results) {
                if (error) {
                  return reject(error);
                }
                return resolve();
              }
            );
          });

          try {
            await new_promise;
          } catch (new_error) {
            connection.rollback(function () {
              connection.release();
              if (error) {
                return reject(error);
              }
            });
          }

          connection.commit(function (error, results) {
            connection.release();
            if (error) {
              return reject(error);
            }
            return resolve(results);
          });
        }
      );
    });
  });
};
