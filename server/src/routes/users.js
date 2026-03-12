const express = require("express");
const {
  registerUser,
  loginUser,
  secret,
  logoutUser,
  fetchProfile,
} = require("../controllers/usersController");
const { isLoggedIn } = require("../middlewares/userMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/secret", isLoggedIn, secret);
router.get("/fetchProfile", isLoggedIn, fetchProfile);

module.exports = router;
