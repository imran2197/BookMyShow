import React, { useCallback, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { createPayment } from "../../services/payment.service";
import UserContext from "../../context/user-context";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingId, amount } = location.state;
  const { user } = useContext(UserContext);

  const fetchClientSecret = useCallback(async () => {
    const response = await createPayment({
      userId: user._id,
      method: "card",
      amount,
      bookingId,
    });

    return response.data.clientSecret;
  }, [amount, bookingId, user._id]); // ✅ Fixed: bookingId → show

  const options = { fetchClientSecret };

  return (
    <div style={{ maxWidth: 800, margin: "24px auto" }}>
      <div
        style={{
          maxWidth: "100%",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          background: "#ffffff",
          border: "1px solid #f3f4f6",
        }}
      >
        <Button
          className="bs-back-btn"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <h2
          style={{
            marginBottom: "8px",
            fontSize: "22px",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          Complete your payment
        </h2>

        {/* Test Info */}
        <div
          style={{
            fontSize: "13px",
            color: "#6b7280",
            lineHeight: "1.6",
            background: "#fff7ed",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #fde68a",
          }}
        >
          <p style={{ marginBottom: "6px" }}>
            <span style={{ marginTop: -3 }}>💳</span> Test card:
            <strong style={{ paddingLeft: "5px" }}> 4000 0035 6000 0008</strong>
          </p>
          <p style={{ marginBottom: "4px" }}>MM / YY: Any future date</p>
          <p style={{ margin: 0 }}>CVC: Any 3 digits</p>
        </div>
      </div>
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default Checkout;
