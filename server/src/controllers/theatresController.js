const Theatre = require("../models/Theatre");
const ApiResponse = require("../core/ApiResponse");

const addTheatre = async (req, res) => {
  const { name, address, contactNo, email, capacity } = req.body;
  const { userId } = req;
  const theatre = await Theatre.create({
    name,
    address,
    contactNo,
    email,
    capacity,
    owner: userId,
  });
  return res
    .status(201)
    .json(ApiResponse.build(true, { theatre }, "Theatre created successfully"));
};

const updateTheatre = async (req, res) => {
  const { id } = req.body;
  const theatre = await Theatre.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res
    .status(200)
    .json(ApiResponse.build(true, { theatre }, "Theatre updated successfully"));
};

const deleteTheatre = async (req, res) => {
  const { id } = req.params;
  await Theatre.findByIdAndDelete(id);
  return res
    .status(200)
    .json(ApiResponse.build(true, {}, "Theatre deleted successfully"));
};

const getAllTheatres = async (req, res) => {
  const allTheatres = await Theatre.find({}).populate("owner");
  return res
    .status(200)
    .json(ApiResponse.build(true, allTheatres, "All theatres fetched"));
};

const getOwnerSpecificTheatres = async (req, res) => {
  const { id } = req.params;
  const theatres = await Theatre.find({ owner: id }).populate('owner');
  return res
    .status(200)
    .json(
      ApiResponse.build(true,  theatres , "Theatres fetched successfully"),
    );
};

const getTheatreById = async (req, res) => {
  const { id } = req.params;
  const theatre = await Theatre.findOne({ _id: id }).populate({
    path: "owner",
    select: "-password",
  });
  return res
    .status(200)
    .json(ApiResponse.build(true, theatre, "Theaatre fetched successfully"));
};

module.exports = {
  addTheatre,
  updateTheatre,
  deleteTheatre,

  getAllTheatres,
  getOwnerSpecificTheatres,
  getTheatreById,
};
