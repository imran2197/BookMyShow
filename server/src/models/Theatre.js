const mongoose = require("mongoose");

const TheatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Theatre = mongoose.model("Theatre", TheatreSchema);

module.exports = Theatre;
