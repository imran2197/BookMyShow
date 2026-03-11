const { AuthenticationError } = require("../core/ApiError");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const bearerToken = req.cookies.token;
  if (!bearerToken) {
    throw new AuthenticationError("Please login to continue");
  }

  const token = bearerToken.replace("Bearer ", "");
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = userId;
  next();
};

module.exports = {
  isLoggedIn,
};
