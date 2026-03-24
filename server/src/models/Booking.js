const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seats: {
      type: Array,
      required: true,
    },
    totalAmount: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
