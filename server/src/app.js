const express = require("express");
const cors = require("cors");
const moviesRoutes = require("./routes/movies");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/movies", moviesRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).json({
    success: false,
    message,
  });
});

module.exports = app;
