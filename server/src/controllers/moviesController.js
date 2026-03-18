const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const ApiResponse = require("../core/ApiResponse");
const { NotFoundError, BadRequestError } = require("../core/ApiError");

const addMovie = async (req, res) => {
  const {
    title,
    description,
    language,
    posterUrl,
    genre,
    releaseDate,
    runtime,
    rating,
    cast,
  } = req.body;
  if (
    !title ||
    !description ||
    !language ||
    !posterUrl ||
    !genre ||
    !releaseDate ||
    !runtime ||
    !rating ||
    !cast
  ) {
    throw new BadRequestError(
      "Fields like - Title, Description, Language, PosterUrl, Genre, ReleaseDate, Runtime, Rating, Cast: are required.",
    );
  }

  const newMovie = new Movie(req.body);
  await newMovie.save();
  res
    .status(201)
    .json(ApiResponse.build(true, newMovie, "Movie added successfully."));
};

const updateMovie = async (req, res) => {
  const { id } = req.body;
  await Movie.findByIdAndUpdate(id, req.body);
  res
    .status(200)
    .json(ApiResponse.build(true, null, "Movie updated successfully."));
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  res
    .status(200)
    .json(ApiResponse.build(true, null, "Movie deleted successfully."));
};

const getAllMovies = async (req, res) => {
  const movies = await Movie.find({});
  res.json(ApiResponse.build(true, movies, "All movies fetched successfully!"));
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
  addMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  getMoviesForScreening,
};
