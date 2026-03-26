import "./MyBookings.css";
import React, { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { getAllBookings } from "../../services/bookshow.service";

const MyBookings = () => {
  const { data: bookingsData, sendRequest: sendMyBookingsRequest } =
    useHttp(getAllBookings);

  useEffect(() => {
    sendMyBookingsRequest();
  }, []);

  if (!bookingsData) return null;

  if (!bookingsData.length) {
    return (
      <div className="mb-empty">
        <div className="mb-empty-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No bookings"
            className="mb-empty-img"
          />

          <h3>No Bookings Yet</h3>
          <p>Looks like you haven’t booked any tickets yet.</p>

          <button
            className="mb-btn-explore"
            onClick={() => (window.location.href = "/")}
          >
            Explore Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-page">
      <h2 className="mb-title">My Bookings</h2>

      <div className="mb-list">
        {bookingsData.map((booking) => {
          const show = booking?.show;
          const movie = show?.movie;

          return (
            <div className="mb-card" key={booking?._id}>
              {/* Poster */}
              <img
                src={movie?.posterUrl}
                alt={movie?.title}
                className="mb-poster"
              />

              {/* Details */}
              <div className="mb-info">
                <h3 className="mb-movie">{movie?.title}</h3>

                <p className="mb-meta">{show?.theatre.name}</p>

                <p className="mb-meta">
                  {new Date(booking?.createdAt).toDateString()} • {show?.time}
                </p>

                <p className="mb-meta">Seats: {booking?.seats.join(", ")}</p>

                <div className="mb-footer">
                  <span className="mb-price">₹{booking?.totalAmount}</span>

                  <span
                    className={`mb-status ${
                      booking?.status === "CONFIRMED" ? "confirmed" : "pending"
                    }`}
                  >
                    {booking?.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
