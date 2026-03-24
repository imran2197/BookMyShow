const Payment = require("../models/Payment");
const ApiResponse = require("../core/ApiResponse");

const createPayment = async (req, res) => {
  const { userId, method, amount, bookingId } = req.body;

  const payment = await Payment.create({
    userId,
    method,
    amount,
    bookingId,
  });

  //   Call stripe payment gateway

  return res
    .status(201)
    .json(ApiResponse.build(true, payment, "Payment created successfully"));
};

module.exports = { createPayment };
