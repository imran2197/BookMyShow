const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isPartnerOrAdmin,
} = require("../middlewares/userMiddleware");
const {
  createTheatre,
  getUserSpecificTheatres,
  getTheatreById,
} = require("../controllers/theatresController");

router.post("/theatres", isLoggedIn, isPartnerOrAdmin, createTheatre);
router.get(
  "/userSpecificTheatres",
  isLoggedIn,
  isPartnerOrAdmin,
  getUserSpecificTheatres,
);
router.get("/theatres/:id", isLoggedIn, isPartnerOrAdmin, getTheatreById);

module.exports = router;
