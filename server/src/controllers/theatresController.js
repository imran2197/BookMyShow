const Theatre = require("../models/Theatre");
const ApiResponse = require("../core/ApiResponse");

const createTheatre = async (req, res) => {
  const { name, capacity, address, contactNo } = req.body;
  const { userId } = req;
  const theatre = await Theatre.create({
    name,
    capacity,
    address,
    contactNo,
    user: userId,
  });
  return res
    .status(201)
    .json(ApiResponse.build(true, { theatre }, "Theatre Created Successfully"));
};

const getUserSpecificTheatres = async (req, res) => {
  const { userId } = req;
  const theatres = await Theatre.find({ user: userId });
  return res
    .status(200)
    .json(
      ApiResponse.build(true, { theatres }, "Theatres Fetched Successfully"),
    );
};

const getTheatreById = async (req, res) => {
  const { id } = req.params;
  const theatre = await Theatre.findOne({ _id: id }).populate({
    path: "user",
    select: "-password",
  });
  return res
    .status(200)
    .json(ApiResponse.build(true, theatre, "Theaatre fetched successfully"));
};

module.exports = {
  createTheatre,
  getUserSpecificTheatres,
  getTheatreById,
};
