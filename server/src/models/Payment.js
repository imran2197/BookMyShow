const mongoose = require("mongoose");
const crypto = require("crypto");

const paymentSchema = new mongoose.Schema(
  {
    txnId: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: ["UPI", "CARD", "NET_BANKING", "WALLET", "CASH"],
    },
    amount: {
      type: Number,
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "CANCELLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to add txnId to the payment just before saving/creating the payment
paymentSchema.pre("save", function () {
  if (!this.txnId) {
    this.txnId = `TXN${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
