import "./MovieDetails.css";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useHttp from "../../hooks/useHttp";
import { fetchMovieById } from "../../services/movie.service";
import { Avatar, Button, Card, Col, Rate, Row, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movie, sendRequest } = useHttp(fetchMovieById, false);

  useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);

  if (!movie) return null;

  const { title, description, rating, runtime, cast, posterUrl } = movie;

  return (
    <div className="movieContainer">
      <Button
        type="text"
        className="backButton"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Row gutter={[24, 24]} align="top">
        <Col xs={24} md={9}>
          <div className="posterWrapper">
            <div className="posterAspect">
              <img src={posterUrl} alt={title} className="posterImage" />
            </div>
          </div>
        </Col>

        <Col xs={24} md={15}>
          <h1 className="movieTitle">{title}</h1>
          <div className="ratingRow">
            <div className="ratingBox">
              <Rate disabled allowHalf value={rating ? rating / 2 : 0} />

              <span className="ratingText">
                {rating?.toFixed(1) || "N/A"} / 10
              </span>
            </div>
            {runtime && <Tag color="magenta">⏱ {runtime} mins</Tag>}
          </div>
          {description && <p className="movieDescription">{description}</p>}
        </Col>
      </Row>

      {cast && cast.length > 0 && (
        <div className="castSection">
          <h2 className="castTitle">Cast</h2>

          <Row gutter={[20, 20]}>
            {cast.map((member) => (
              <Col key={member._id} xs={12} sm={8} md={6}>
                <Card
                  hoverable
                  className="castCard"
                  styles={{ body: { padding: 18 } }}
                >
                  <Avatar
                    src={member.profilePicture}
                    alt={member.name}
                    size={80}
                    className="castAvatar"
                  />

                  <div className="castName">{member.name}</div>

                  {member.alias && (
                    <div className="castAlias">as {member.alias}</div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
