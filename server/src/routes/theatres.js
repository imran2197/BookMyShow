const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isPartnerOrAdmin,
} = require("../middlewares/userMiddleware");
const {
  addTheatre,
  updateTheatre,
  getOwnerSpecificTheatres,
  getTheatreById,
  deleteTheatre,
  getAllTheatres,
} = require("../controllers/theatresController");

router.post("/add-theatre", isLoggedIn, isPartnerOrAdmin, addTheatre);
router.put("/update-theatre", isLoggedIn, isPartnerOrAdmin, updateTheatre);
router.delete(
  "/delete-theatre/:id",
  isLoggedIn,
  isPartnerOrAdmin,
  deleteTheatre,
);

router.get("/get-all-theatres", isLoggedIn, isPartnerOrAdmin, getAllTheatres);

router.get(
  "/getOwnerSpecificTheatres/:id",
  isLoggedIn,
  isPartnerOrAdmin,
  getOwnerSpecificTheatres,
);
router.get("/theatres/:id", isLoggedIn, isPartnerOrAdmin, getTheatreById);

module.exports = router;
