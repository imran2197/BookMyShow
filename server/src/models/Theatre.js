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
    ref: "User",
  },
});

const Theatre = mongoose.model("Theatre", TheatreSchema);

module.exports = Theatre;
