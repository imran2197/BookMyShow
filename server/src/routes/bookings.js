const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
} = require("../controllers/bookingsController");
const { isLoggedIn } = require("../middlewares/userMiddleware");

router.post("/bookings", isLoggedIn, createBooking);
router.get("/bookings", isLoggedIn, getAllBookings);

module.exports = router;
