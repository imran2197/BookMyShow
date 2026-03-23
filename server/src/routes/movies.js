const express = require("express");
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesController");
const { isLoggedIn, isAdmin } = require("../middlewares/userMiddleware");

const router = express.Router();

router.post("/add-movie", isLoggedIn, isAdmin, addMovie);
router.put("/update-movie", isLoggedIn, isAdmin, updateMovie);
router.delete("/delete-movie/:id", isLoggedIn, isAdmin, deleteMovie);
router.get("/get-all-movies", getAllMovies);

router.get("/:id", getMovieById);

module.exports = router;
