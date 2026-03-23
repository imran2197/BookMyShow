const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isPartnerOrAdmin,
  isAdmin,
} = require("../middlewares/userMiddleware");
const {
  addTheatre,
  updateTheatre,
  getOwnerSpecificTheatres,
  getTheatreById,
  deleteTheatre,
  getAllTheatres,
  getAllTheatresByMovie,
} = require("../controllers/theatresController");

router.post("/add-theatre", isLoggedIn, isPartnerOrAdmin, addTheatre);
router.put("/update-theatre", isLoggedIn, isPartnerOrAdmin, updateTheatre);
router.delete(
  "/delete-theatre/:id",
  isLoggedIn,
  isPartnerOrAdmin,
  deleteTheatre,
);

router.get("/get-all-theatres", isLoggedIn, isAdmin, getAllTheatres);
router.get(
  "/get-owner-specific-theatres/:id",
  isLoggedIn,
  isPartnerOrAdmin,
  getOwnerSpecificTheatres,
);
router.get(
  "/get-theatre-by-id/:id",
  isLoggedIn,
  isPartnerOrAdmin,
  getTheatreById,
);

router.post("/get-all-theatres-by-movie", getAllTheatresByMovie);

module.exports = router;
