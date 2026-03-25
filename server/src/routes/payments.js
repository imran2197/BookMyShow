const express = require("express");
const router = express.Router();

const {
  createPayment,
  sessionStatus,
} = require("../controllers/paymentsController");

router.post("/payments", createPayment);
router.get("/paymentStatus/:sessionId", sessionStatus);

module.exports = router;
