const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ApiError } = require("./core/ApiError");

const moviesRoutes = require("./routes/movies");
const usersRoutes = require("./routes/users");
const theatresRoutes = require("./routes/theatres");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());

// Routes
app.use(moviesRoutes);
app.use(usersRoutes);
app.use(theatresRoutes);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    const { status = 500, message = "Something Went Wrong!" } = err;
    return res.status(status).json({
      success: false,
      message,
    });
  }
  return res
    .status(500)
    .json({ success: false, message: "Something Went Wrong" });
});

module.exports = app;
