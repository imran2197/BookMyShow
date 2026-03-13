const mongoose = require("mongoose");

const TheatreSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: String,
  contactNo: Number,
  capacity: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Theatre = mongoose.model("theatres", TheatreSchema);

module.exports = Theatre;
