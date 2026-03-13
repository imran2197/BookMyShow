const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isPartnerOrAdmin,
} = require("../middlewares/userMiddleware");
const {
  createTheatre,
  getTheatres,
} = require("../controllers/theatresController");

router.post("/theatres", isLoggedIn, isPartnerOrAdmin, createTheatre);
router.get("/theatres", isLoggedIn, isPartnerOrAdmin, getTheatres);

module.exports = router;
