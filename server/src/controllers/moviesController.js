const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const ApiResponse = require("../core/ApiResponse");
const { NotFoundError } = require("../core/ApiError");

const getAllMovies = async (req, res) => {
  const movies = await Movie.find({});
  res.json(ApiResponse.build(true, movies, "All Movies Fetched Successfully!"));
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new NotFoundError("Movie Not Found");
  }
  return res
    .status(200)
    .json(ApiResponse.build(true, movie, "Fetched Movie Details"));
};

const getMoviesForScreening = async (req, res) => {
  const { id } = req.params;

  const screeningMovieIds = await Screening.distinct("movie", { theatre: id });

  const movies = await Movie.find({
    _id: { $nin: screeningMovieIds },
  });
  res
    .status(200)
    .json(ApiResponse.build(true, movies, "Fetched Movies for Screenings"));
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMoviesForScreening,
};
