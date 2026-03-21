const express = require("express");
const {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
} = require("../controllers/showController");
const router = express.Router();

router.post("/add-show", addShow);
router.delete("/delete-show/:id", deleteShow);
router.put("/update-show/:id", updateShow);
router.post("/get-all-shows-by-theatre", getAllShowsByTheatre);
router.post("/get-all-theatres-by-movie", getAllTheatresByMovie);
router.post("/get-show-by-id", getShowById);

module.exports = router;
