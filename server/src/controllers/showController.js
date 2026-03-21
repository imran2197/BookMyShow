const Show = require("../models/Show");
const ApiResponse = require("../core/ApiResponse");

const addShow = async (req, res) => {
  const newShow = new Show(req.body);
  await newShow.save();
  res
    .status(201)
    .json(ApiResponse.build(true, newShow, "Show added successfully"));
};

const deleteShow = async (req, res) => {
  const { id } = req.params;
  await Show.findByIdAndDelete(id);
  res
    .status(200)
    .json(ApiResponse.build(true, null, "Show deleted successfully"));
};

const updateShow = async (req, res) => {
  const { id } = req.params;
  const { name, date, time, movie, ticketPrice, totalSeats, bookedSeats } =
    req.body;
  const updatedShow = await Show.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res
    .status(200)
    .json(ApiResponse.build(true, updatedShow, "Show updated successfully"));
};

const getAllShowsByTheatre = async (req, res) => {
  const { id } = req.body;
  const shows = await Show.find({ theatre: id }).populate("movie");
  res
    .status(200)
    .json(ApiResponse.build(true, shows, "Shows fetched successfully"));
};

const getAllTheatresByMovie = async (req, res) => {
  const { movie, date } = req.body;
  const shows = await Show.find({ movie, date }).populate("theatre");

  const uniqueTheatres = [];
  shows.forEach((show) => {
    let isTheatre = uniqueTheatres.find(
      (theatre) => theatre._id.toString() === show.theatre._id.toString(),
    );
    if (!isTheatre) {
      let showsOfThisTheatre = shows.filter(
        (s) => s.theatre._id.toString() === show.theatre._id.toString(),
      );
      uniqueTheatres.push({ ...show.theatre, shows: showsOfThisTheatre });
    }
  });
  res
    .status(200)
    .json(
      ApiResponse.build(true, uniqueTheatres, "Shows fetched successfully"),
    );
};

const getShowById = async (req, res) => {
  const { id } = req.body;
  const show = await Show.findById(id).populate("movie").populate("theatre");
  res
    .status(200)
    .json(ApiResponse.build(true, show, "Show fetched successfully"));
};

module.exports = {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
};
