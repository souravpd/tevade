const jwt = require("jsonwebtoken");

function verify_token(request, response, next) {
  if (request.headers.access_token) {
    jwt.verify(
      request.headers.access_token,
      process.env.SIGN_SECRET,
      function (error, decoded) {
        if (error) {
          return response.status(401).json({
            success: false,
            error: error,
            results: null,
          });
        }
        request.auth = {};
        request.auth.username = decoded.username;
        next();
      }
    );
  } else {
    response.status(401).json({
      success: false,
      error: "Access Code Not included in the header of the request",
      results: null,
    });
  }
}

module.exports = { verify_token };
