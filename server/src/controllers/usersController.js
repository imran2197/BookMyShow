const User = require("../models/User");
const { BadRequestError, NotFoundError } = require("../core/ApiError");
const bcrypt = require("bcrypt");
const ApiResponse = require("../core/ApiResponse");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError(
      `User with email-${email} is already registered.`,
    );
  }

  const hash = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password: hash,
    role,
  });
  return res
    .status(201)
    .json(
      ApiResponse.build(
        true,
        { name, email: newUser.email, role: newUser.role },
        "User Created Successfully",
      ),
    );
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError(`User with email-${email} is not registered`);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new BadRequestError("Username or Password is incorrect");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", `Bearer ${token}`, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // day * hours * mins * seconds * milliseconds
  });

  res.status(200).json(ApiResponse.build(true, null, "LoggedIn Successfully"));
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json(ApiResponse.build(true, null, "You've Successfully Logged Out."));
};

const loggedInUserDetails = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  return res
    .status(200)
    .json(ApiResponse.build(true, user, "User Details Fetched Successfully."));
};

const secret = async (req, res) => {
  const { userId } = req;
  res.send("SOME SECRET ONLY ACCESSIBLE AFTER LOGIN");
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  secret,
  loggedInUserDetails,
};
