const Theatre = require("../models/Theatre");
const ApiResponse = require("../core/ApiResponse");

const createTheatre = async (req, res) => {
  const { name, capacity, address, contactNo } = req.body;
  const theatre = await Theatre.create({ name, capacity, address, contactNo });
  res
    .status(201)
    .json(ApiResponse.build(true, { theatre }, "Theatre Created Successfully"));
};

const getTheatres = async (req, res) => {
  const { userId } = req;
  const theatres = await Theatre.find({});
  res
    .status(200)
    .json(
      ApiResponse.build(true, { theatres }, "Theatres Fetched Successfully"),
    );
};

module.exports = {
  createTheatre,
  getTheatres,
};
