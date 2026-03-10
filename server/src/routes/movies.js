const express = require("express");
const { getAllMovies } = require("../controllers/moviesController");

const router = express.Router();

router.get("/", getAllMovies);

module.exports = router;
