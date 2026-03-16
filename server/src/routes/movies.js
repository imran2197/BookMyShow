const express = require("express");
const {
  getAllMovies,
  getMovieById,
  getMoviesForScreening,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesController");

const router = express.Router();

router.post("/add-movie", addMovie);
router.put("/update-movie", updateMovie);
router.put("/delete-movie", deleteMovie);
router.get("/get-all-movies", getAllMovies);

router.get("/:id", getMovieById);
router.get("/screenings/:id", getMoviesForScreening);

module.exports = router;
