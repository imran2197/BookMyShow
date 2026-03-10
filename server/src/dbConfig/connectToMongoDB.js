const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected to DB");
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

module.exports = {
  connectDB,
  disconnectDB,
};
