import React from "react";
import "./Movie.css";
import { Card, Rate } from "antd";
import { Link } from "react-router";

const Movie = ({ movie }) => {
  const { _id, title, rating, genre = [], posterUrl } = movie;

  return (
    <Link to={`/movies/${_id}`} className="movieLink">
      <Card
        hoverable
        className="movieCard"
        cover={
          <div className="posterWrapper">
            <img src={posterUrl} alt={title} className="posterImg" />

            {/* Gradient overlay */}
            <div className="overlay">
              <div className="overlayContent">
                <div className="title">{title}</div>

                <div className="ratingContainer">
                  <Rate
                    disabled
                    allowHalf
                    value={rating ? rating : 0}
                    style={{ fontSize: 12 }}
                  />
                  <span className="ratingText">
                    {rating ? rating.toFixed(1) : "N/A"}
                  </span>
                </div>

                {/* Genre pills */}
                <div className="genreContainer">
                  {genre.slice(0, 2).map((g, i) => (
                    <span key={i} className="genrePill">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
        styles={{ body: { display: "none" } }} // hide default body
      />
    </Link>
  );
};

export default Movie;
