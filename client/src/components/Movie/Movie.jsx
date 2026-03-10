import React from "react";
import "./Movie.css";
import { Card, Rate } from "antd";

const Movie = ({ movie }) => {
  const { title, rating, genre, posterUrl } = movie;

  return (
    <Card
      hoverable
      cover={
        <div style={{ aspectRatio: "2/3", overflow: "hidden" }}>
          <img src={posterUrl} alt={title} className="posterImg" />
        </div>
      }
      styles={{ body: { padding: "8px 10px" } }}
    >
      <div className="title">{title}</div>
      <div className="ratingContainer">
        <Rate
          disabled
          allowHalf
          value={rating ? rating / 2 : 0}
          style={{ fontSize: 12 }}
        />
        <span style={{ fontSize: 12, color: "#666" }}>
          {rating.toFixed(1) || "N/A"}
        </span>
      </div>
      {genre && <div className="genre">{genre}</div>}
    </Card>
  );
};

export default Movie;
