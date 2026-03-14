const express = require("express");
const {
  isLoggedIn,
  isPartnerOrAdmin,
} = require("../middlewares/userMiddleware");
const {
  getAllScreenings,
  getScreeningByMovieId,
} = require("../controllers/screeningsController");
const router = express.Router();

router.post("/screenings", isLoggedIn, isPartnerOrAdmin, getAllScreenings);

router.get("/screenings/:movieId", getScreeningByMovieId);

module.exports = router;
