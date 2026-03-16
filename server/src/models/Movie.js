const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    genre: {
      type: [],
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
