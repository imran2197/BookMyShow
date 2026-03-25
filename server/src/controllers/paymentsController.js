const Payment = require("../models/Payment");
const ApiResponse = require("../core/ApiResponse");
const { BadRequestError } = require("../core/ApiError");
const Booking = require("../models/Booking");
const dotEnv = require("dotenv");
dotEnv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Stripe Documentation - https://docs.stripe.com/checkout/embedded/quickstart?client=react&lang=node
// Test card - Indian Test Visa Card: 4000 0035 6000 0008

const createPayment = async (req, res) => {
  const { userId, method, amount, bookingId } = req.body;

  const payment = await Payment.create({
    userId,
    method,
    amount,
    bookingId,
  });

  //   Call stripe payment gateway
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price_data: {
          currency: "inr", // or "usd", etc.
          product_data: {
            name: "Movie Ticket Booking", // whatever label you want
          },
          unit_amount: amount * 100, // amount in smallest currency unit (paise for INR)
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      bookingId,
      paymentId: payment._id.toString(),
    },
    return_url: `${process.env.FRONTEND_BASE_URL}return?session_id={CHECKOUT_SESSION_ID}`,
  });

  payment.sessionId = session.id;
  await payment.save();

  return res
    .status(201)
    .json(
      ApiResponse.build(
        true,
        { payment, clientSecret: session.client_secret, sessionId: session.id },
        "Payment created successfully",
      ),
    );
};

const sessionStatus = async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId) {
    throw new BadRequestError("sessionId is required");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const { bookingId, paymentId } = session.metadata || {};
  if (!bookingId || !paymentId) {
    throw new BadRequestError("Invalid session metadata");
  }

  const isPaid = session.payment_status === "paid";

  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    { status: isPaid ? "PAID" : "CANCELLED" },
    { returnDocument: "after" },
  );

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: isPaid ? "CONFIRMED" : "CANCELLED" },
    { returnDocument: "after" },
  );

  return res.status(200).json(
    ApiResponse.build(
      true,
      {
        payment,
        booking,
        stripeSession: {
          id: session.id,
          status: session.status,
          paymentStatus: session.payment_status,
        },
      },
      isPaid ? "Payment successful" : "Payment cancelled",
    ),
  );
};

module.exports = { createPayment, sessionStatus };
