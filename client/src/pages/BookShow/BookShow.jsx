import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useHttp from "../../hooks/useHttp";
import { getShowById } from "../../services/show.service";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TagOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import moment from "moment";
import "./BookShow.css";
import SummaryContent from "./SummaryContent";
import { createBooking } from "../../services/bookshow.service";
import UserContext from "../../context/user-context";

const COLUMNS = 12;

const BookShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: showData, sendRequest: sendShowByIdRequest } = useHttp(
    getShowById,
    false,
  );
  const { data: booking, sendRequest: sendCreateBookingRequest } = useHttp(
    createBooking,
    false,
  );

  const { user } = useContext(UserContext);

  const bookedSeats = showData?.bookedSeats ?? [];
  const totalSeats = showData?.totalSeats ?? 0;
  const rows = Math.ceil(totalSeats / COLUMNS);
  const availableCount = totalSeats - bookedSeats.length;

  const rowLabel = (rowIndex) => {
    return String.fromCharCode(65 + rowIndex);
  };

  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return "booked";
    if (selectedSeats.includes(seatNumber)) return "selected";
    return "available";
  };

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber],
    );
  };

  const handleCreateBooking = async () => {
    await sendCreateBookingRequest({
      show: id,
      user: user._id,
      seats: selectedSeats,
      totalAmount: grandTotal,
    });
  };

  const totalPrice = selectedSeats.length * (showData?.ticketPrice ?? 0);
  const convFee = selectedSeats.length * 20;
  const grandTotal = totalPrice + convFee;

  useEffect(() => {
    sendShowByIdRequest({ id });
  }, []);

  useEffect(() => {
    if (booking) {
      navigate("/checkout", {
        state: {
          bookingId: booking._id,
          amount: grandTotal,
        },
      });
    }
  }, [booking, grandTotal, navigate]);

  if (!showData) return null;

  return (
    <div className="bs-page">
      {/*  Top Bar  */}
      <div className="bs-topbar">
        <Button
          className="bs-back-btn"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          <span className="bs-back-text">Back</span>
        </Button>

        <div className="bs-movie-info">
          <h1 className="bs-movie-title">{showData.movie.title}</h1>
          <div className="bs-theatre-line">
            <EnvironmentOutlined style={{ fontSize: 12 }} />
            {showData.theatre.name} &mdash; {showData.theatre.address}
          </div>
        </div>
      </div>

      {/*  Meta Strip  */}
      <div className="bs-meta-strip">
        <div className="bs-meta-chip">
          <CalendarOutlined />
          <span>{moment(showData.date).format("ddd, D MMM YYYY")}</span>
        </div>
        <div className="bs-meta-dot" />
        <div className="bs-meta-chip">
          <ClockCircleOutlined />
          <span>{moment(showData.time, "HH:mm").format("h:mm A")}</span>
        </div>
        <div className="bs-meta-dot" />
        <div className="bs-meta-chip">
          <TagOutlined />
          <span>₹ {showData.ticketPrice} / seat</span>
        </div>
        <div className="bs-meta-dot" />
        <div className="bs-meta-chip">
          <span className="bs-avail-dot" />
          <span>
            <strong>{availableCount}</strong> of {totalSeats} available
          </span>
        </div>
      </div>

      {/*  Main Layout  */}
      <div className="bs-layout">
        {/* Seats */}
        <div className="bs-seat-section">
          <div className="bs-screen-wrap">
            <div className="bs-screen-bar" />
            <div className="bs-screen-label">SCREEN</div>
          </div>

          <div className="bs-grid-scroll">
            <div className="bs-seat-grid">
              {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className="bs-seat-row">
                  <span className="bs-row-label">{rowLabel(rowIndex)}</span>
                  {[...Array(COLUMNS)].map((_, colIndex) => {
                    const seatNumber = rowIndex * COLUMNS + colIndex + 1;
                    if (seatNumber > totalSeats)
                      return <span key={colIndex} className="bs-seat-gap" />;
                    const status = getSeatStatus(seatNumber);
                    return (
                      <button
                        key={seatNumber}
                        className={`bs-seat bs-seat--${status}`}
                        onClick={() => toggleSeat(seatNumber)}
                        title={`Seat ${seatNumber}`}
                        disabled={status === "booked"}
                      >
                        {seatNumber}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="bs-legend">
            <div className="bs-legend-item">
              <span className="bs-legend-swatch bs-legend-swatch--available" />
              Available
            </div>
            <div className="bs-legend-item">
              <span className="bs-legend-swatch bs-legend-swatch--selected" />
              Selected
            </div>
            <div className="bs-legend-item">
              <span className="bs-legend-swatch bs-legend-swatch--booked" />
              Booked
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar  */}
      <div className="bs-mobile-bar">
        <div className="bs-mobile-bar-info">
          <div className="bs-mobile-bar-seats">
            {selectedSeats.length === 0
              ? "No seats selected"
              : `${selectedSeats.length} seat${selectedSeats.length > 1 ? "s" : ""} · ${[...selectedSeats].sort((a, b) => a - b).join(", ")}`}
          </div>
          <div className="bs-mobile-bar-total">
            ₹{selectedSeats.length > 0 ? grandTotal.toFixed(0) : "0"}
          </div>
        </div>
        <button
          className="bs-mobile-bar-btn"
          onClick={() => selectedSeats.length > 0 && setSheetOpen(true)}
          disabled={selectedSeats.length === 0}
        >
          {selectedSeats.length === 0 ? "Select Seats" : "Review & Pay"}
        </button>
      </div>

      {/* Bottom Sheet */}
      <div
        className={`bs-sheet-overlay${sheetOpen ? " open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setSheetOpen(false)}
      >
        <div className="bs-sheet">
          <div className="bs-sheet-handle" />
          <div className="bs-sheet-title">Booking Summary</div>
          <SummaryContent
            showData={showData}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            convFee={convFee}
            grandTotal={grandTotal}
          />
          <button className="bs-sheet-book-btn" onClick={handleCreateBooking}>
            Book {selectedSeats.length} Seat
            {selectedSeats.length > 1 ? "s" : ""}
          </button>
          <p className="bs-sheet-note">
            Tickets once booked cannot be exchanged or refunded.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookShow;
