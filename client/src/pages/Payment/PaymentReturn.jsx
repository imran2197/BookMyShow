import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import moment from "moment";
import { Button } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
  HomeOutlined,
  CalendarOutlined,
  TagOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./PaymentReturn.css";
import useHttp from "../../hooks/useHttp";
import { paymentStatus } from "../../services/payment.service";

// ── Status states ─────────────────────────────────────────────
const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
};

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    data,
    error,
    sendRequest: confirmPayment,
  } = useHttp(paymentStatus, true);

  // ── Call API ────────────────────────────────────────────────
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    confirmPayment(sessionId);
  }, [searchParams]);

  // ── Derived values ──────────────────────────────────────────
  const payment = data?.payment;
  const booking = data?.booking;

  const seats = booking?.seats ?? [];

  const txnId = payment?.txnId ?? payment?.sessionId?.slice(-12)?.toUpperCase();

  const paidAt = payment?.updatedAt
    ? moment(payment.updatedAt).format("ddd, D MMM YYYY [at] h:mm A")
    : null;

  const bookedAt = booking?.createdAt
    ? moment(booking.createdAt).format("D MMM YYYY")
    : null;

  // ── Failed ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="pr-page pr-failed-page">
        <div className="pr-topstripe" />
        <div className="pr-center-wrap">
          <div className="pr-fail-icon">
            <CloseCircleFilled style={{ fontSize: 56, color: "#ef4444" }} />
          </div>
          <h1 className="pr-fail-title">Payment Failed</h1>
          <p className="pr-fail-msg">
            {error || "Something went wrong. Please try again."}
          </p>
          <div className="pr-fail-actions">
            <Button className="pr-btn-retry" onClick={() => navigate(-1)}>
              Try Again
            </Button>
            <Button className="pr-btn-home" onClick={() => navigate("/")}>
              <HomeOutlined />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-page">
      <div className="pr-topstripe" />

      <div className="pr-content">
        {/* Success badge */}
        <div className="pr-success-badge">
          <div className="pr-check-ring">
            <CheckCircleFilled style={{ fontSize: 36, color: "#22c55e" }} />
          </div>
          <div>
            <h1 className="pr-success-title">Booking Confirmed!</h1>
            <p className="pr-success-sub">
              Your tickets are confirmed. Enjoy the show!
            </p>
          </div>
        </div>

        {/* Ticket */}
        <div className="pr-ticket">
          <div className="pr-ticket-top">
            <div className="pr-ticket-logo">
              <TagOutlined style={{ fontSize: 16, color: "#fff" }} />
            </div>
            <div>
              <div className="pr-ticket-brand">BookMyShow</div>
              <div className="pr-ticket-subtitle">Official Booking Receipt</div>
            </div>
            <div className="pr-ticket-status-badge">
              <span className="pr-status-dot" />
              CONFIRMED
            </div>
          </div>

          {/* Divider */}
          <div className="pr-perf">
            <div className="pr-perf-circle pr-perf-circle--left" />
            <div className="pr-perf-line" />
            <div className="pr-perf-circle pr-perf-circle--right" />
          </div>

          {/* Body */}
          <div className="pr-ticket-body">
            <div className="pr-ticket-meta-row">
              <div className="pr-ticket-meta-item">
                <div className="pr-meta-label">Booking ID</div>
                <div className="pr-meta-val pr-mono">
                  {booking?._id?.toUpperCase()}
                </div>
              </div>
              <div className="pr-ticket-meta-item--right">
                <div className="pr-meta-label">Booked on</div>
                <div className="pr-meta-val">{bookedAt}</div>
              </div>
            </div>

            {/* Seats */}
            <div className="pr-seats-section">
              <div className="pr-meta-label" style={{ marginBottom: 10 }}>
                {seats.length} Seat{seats.length !== 1 ? "s" : ""}
              </div>
              <div className="pr-seat-chips">
                {[...seats]
                  .sort((a, b) => a - b)
                  .map((s) => (
                    <span key={s} className="pr-seat-chip">
                      {s}
                    </span>
                  ))}
              </div>
            </div>

            {/* Amount */}
            <div className="pr-amount-row">
              <div>
                <div className="pr-meta-label">Amount Paid</div>
                <div className="pr-amount">
                  ₹{payment?.amount?.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="pr-amount-status">
                <CheckCircleFilled style={{ fontSize: 14 }} />
                PAID
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pr-ticket-footer">
            <div className="pr-footer-row">
              <CreditCardOutlined />
              <span className="pr-meta-label">Txn ID</span>
              <span className="pr-txn pr-mono">{txnId}</span>
            </div>

            {paidAt && (
              <div className="pr-footer-row">
                <CalendarOutlined />
                <span className="pr-meta-label">Paid at</span>
                <span className="pr-txn">{paidAt}</span>
              </div>
            )}

            <div className="pr-footer-row">
              <FileTextOutlined />
              <span className="pr-meta-label">Payment method</span>
              <span className="pr-txn">{payment?.method ?? "card"}</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="pr-info-note">
          A confirmation has been sent to your registered email. Please carry a
          valid photo ID to the theatre.
        </p>

        {/* Actions */}
        <div className="pr-actions">
          <button className="pr-btn-home-primary" onClick={() => navigate("/")}>
            <HomeOutlined />
            Back to Home
          </button>
          <button
            className="pr-btn-bookings"
            onClick={() => navigate("/my-bookings")}
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;
