const express = require("express");
const {
  getAllMovies,
  getMovieById,
  getMoviesForScreening,
} = require("../controllers/moviesController");

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);
router.get("/movies/screenings/:id", getMoviesForScreening);

module.exports = router;
