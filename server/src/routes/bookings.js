const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingsController");
const { isLoggedIn } = require("../middlewares/userMiddleware");

router.post("/bookings", isLoggedIn, createBooking);

module.exports = router;
