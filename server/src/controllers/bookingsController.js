const { BadRequestError } = require("../core/ApiError");
const Booking = require("../models/Booking");
const Show = require("../models/Show");
const ApiResponse = require("../core/ApiResponse");

const createBooking = async (req, res) => {
  const { show, user, seats, totalAmount } = req.body;

  const existingBooking = await Show.findOne({
    _id: show,
    bookedSeats: { $in: [...seats] },
  });

  if (existingBooking) {
    throw new BadRequestError(
      "Few of the seats are already booked for this show.",
    );
  }

  const newBooking = await Booking.create({
    show,
    user,
    seats,
    totalAmount,
  });

  const showDetails = await Show.findById({ _id: show });
  showDetails.bookedSeats = [...showDetails.bookedSeats, ...seats];
  showDetails.save();

  res
    .status(200)
    .json(ApiResponse.build(true, newBooking, "Booking created successfully"));
};

module.exports = {
  createBooking,
};
