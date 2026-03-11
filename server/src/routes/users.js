const express = require("express");
const {
  registerUser,
  loginUser,
  loggedInUserDetails,
  secret,
  logoutUser,
} = require("../controllers/usersController");
const { isLoggedIn } = require("../middlewares/userMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/secret", isLoggedIn, secret);
router.get("/loggedInUserDetails", isLoggedIn, loggedInUserDetails);

module.exports = router;
