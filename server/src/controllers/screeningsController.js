const ApiResponse = require("../core/ApiResponse");
const Screening = require("../models/Screening");

const getAllScreenings = async (req, res) => {
  const { theatreId, movieId, price, showTimings } = req.body;
  const { userId } = req;
  const screening = await Screening.create({
    theatre: theatreId,
    movie: movieId,
    price,
    showTimings,
    author: userId,
  });

  return res
    .status(201)
    .json(ApiResponse.build(true, screening, "Screening created successfully"));
};

const getScreeningByMovieId = async (req, res) => {
  const { movieId } = req.params;
  const screenings = await Screening.find({ movie: movieId }).populate(
    "theatre",
  );

  const theatreById = new Map();
  for (const s of screenings) {
    if (s?.theatre?._id) {
      theatreById.set(String(s.theatre._id), s.theatre);
    }
  }
  const theatres = Array.from(theatreById.values());

  res
    .status(200)
    .json(
      ApiResponse.build(
        true,
        { theatres, screenings },
        "All screenings for a movie",
      ),
    );
};

module.exports = {
  getAllScreenings,
  getScreeningByMovieId,
};
