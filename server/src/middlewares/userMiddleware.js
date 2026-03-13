const { AuthenticationError, ForbiddenError } = require("../core/ApiError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

const isPartnerOrAdmin = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);

  if (!(user.isPartner() || user.isAdmin())) {
    throw new ForbiddenError("You are not allowed to access this");
  }
  next();
};

module.exports = {
  isLoggedIn,
  isPartnerOrAdmin,
};
