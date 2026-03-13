const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Partner", "User"],
      default: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.methods.isPartner = function () {
  return this.role === "Partner";
};

userSchema.methods.isAdmin = function () {
  return this.role === "Admin";
};

const User = mongoose.model("users", userSchema);

module.exports = User;
