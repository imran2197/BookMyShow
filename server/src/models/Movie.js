const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    description: {
      type: String,
      required: true,
    },
    cast: [
      {
        name: String,
        alias: String,
        profilePicture: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
