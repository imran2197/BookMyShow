import "./MovieDetails.css";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useHttp from "../../hooks/useHttp";
import {
  fetchMovieById,
  fetchTheatresByMovieId,
} from "../../services/movie.service";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Rate,
  Row,
  Tag,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movie, sendRequest } = useHttp(fetchMovieById, false);

  const {
    data: screenings,
    error: theatresError,
    isLoading: isTheatresLoading,
    sendRequest: sendTheatresRequest,
  } = useHttp(fetchTheatresByMovieId, false);

  useEffect(() => {
    sendRequest(id);
    sendTheatresRequest(id);
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

      <Divider className="movie-theatres-divider" />
      <div className="movie-theatres-section">
        <h2 className="movie-theatres-title">Theatres screening this movie</h2>

        {theatresError && (
          <Alert
            message="Unable to load theatres"
            description={theatresError}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {!isTheatresLoading && !theatresError && (
          <>
            {(screenings?.theatres || []).length === 0 ? (
              <Empty description="No theatres are screening this movie yet." />
            ) : (
              <Row gutter={[12, 12]}>
                {(screenings?.theatres || []).map((t) => (
                  <Col key={t._id} xs={24} md={12}>
                    <Card
                      hoverable
                      className="movie-theatre-card"
                      title={t.name}
                      extra={
                        <Tag color="blue">
                          {t.capacity ? `Capacity: ${t.capacity}` : "Theatre"}
                        </Tag>
                      }
                    >
                      <div className="movie-theatre-info">
                        <div>{t.address || "-"}</div>
                        <div>Contact: {t.contactNo || "-"}</div>
                      </div>

                      <Button type="primary" className="movie-theatre-book-btn">
                        Book Ticket
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
