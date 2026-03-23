import React from "react";

const SummaryContent = ({
  showData,
  selectedSeats,
  totalPrice,
  convFee,
  grandTotal,
}) => {
  return (
    <>
      <div className="bs-summary-movie">
        <div className="bs-summary-poster">
          {showData.movie.title.charAt(0)}
        </div>
        <div>
          <div className="bs-summary-movie-title">{showData.movie.title}</div>
          <div className="bs-summary-show-name">{showData.name}</div>
        </div>
      </div>

      <div className="bs-summary-divider" />

      <div className="bs-summary-label">Selected seats</div>
      {selectedSeats.length === 0 ? (
        <div className="bs-summary-empty">No seats selected yet</div>
      ) : (
        <div className="bs-seat-chips">
          {[...selectedSeats]
            .sort((a, b) => a - b)
            .map((s) => (
              <span key={s} className="bs-seat-chip">
                {s}
              </span>
            ))}
        </div>
      )}

      <div className="bs-summary-divider" />

      <div className="bs-price-row">
        <span className="bs-price-label">
          {selectedSeats.length} × ₹{showData.ticketPrice}
        </span>
        <span className="bs-price-val">₹{totalPrice.toFixed(0)}</span>
      </div>
      <div className="bs-price-row bs-price-row--conv">
        <span className="bs-price-label">Convenience fee</span>
        <span className="bs-price-val">₹{convFee}</span>
      </div>

      <div className="bs-summary-divider" />

      <div className="bs-price-row bs-price-row--total">
        <span>Total</span>
        <span>₹{selectedSeats.length > 0 ? grandTotal.toFixed(0) : 0}</span>
      </div>
    </>
  );
};

export default SummaryContent;
