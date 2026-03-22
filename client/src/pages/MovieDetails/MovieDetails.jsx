import "./MovieDetails.css";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useHttp from "../../hooks/useHttp";
import {
  fetchMovieById,
  fetchTheatresByMovieId,
} from "../../services/movie.service";

import { Button, Card, Col, Divider, Empty, Rate, Row, Tag, Alert } from "antd";

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
  }, [id]);

  if (!movie) return null;

  const { title, description, rating, runtime, cast, posterUrl } = movie;

  return (
    <div className="moviePage">
      <div
        className="heroSection"
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <div className="heroOverlay">
          <Button
            type="text"
            className="backButton"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Row gutter={[24, 24]} align="middle">
            <Col xs={24}>
              <h1 className="heroTitle">{title}</h1>

              <div className="heroMeta">
                <div className="heroRating">
                  <Rate disabled allowHalf value={rating ? rating / 2 : 0} />
                  <span>{rating?.toFixed(1) || "N/A"} / 10</span>
                </div>

                {runtime && <Tag color="magenta">⏱ {runtime} mins</Tag>}
              </div>

              <Button type="primary" size="large" className="heroBookBtn">
                Book Tickets
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      <div className="movieContent">
        <h2 className="sectionTitle">Now Showing In</h2>

        {theatresError && (
          <Alert
            message="Unable to load theatres"
            description={theatresError}
            type="error"
            showIcon
          />
        )}

        {!isTheatresLoading && !theatresError && (
          <>
            {(screenings?.theatres || []).length === 0 ? (
              <Empty description="No theatres available" />
            ) : (
              <Row gutter={[16, 16]}>
                {(screenings?.theatres || []).map((t) => (
                  <Col key={t._id} xs={24} sm={12} md={8}>
                    <Card hoverable className="theatreCard">
                      <h3>{t.name}</h3>
                      <p>{t.address}</p>
                      <p>📞 {t.contactNo}</p>

                      <Button type="primary" block className="bookBtn">
                        Book Now
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}

        <Divider />

        <h2 className="sectionTitle">About</h2>
        <p className="description">{description}</p>

        {cast && cast.length > 0 && (
          <>
            <Divider />
            <h2 className="sectionTitle">Cast</h2>

            <Row gutter={[16, 16]}>
              {cast.map((member) => (
                <Col key={member._id} xs={12} sm={8} md={4}>
                  <div className="castItem">
                    <img
                      src={member.profilePicture}
                      alt={member.name}
                      className="castImage"
                    />
                    <div className="castName">{member.name}</div>
                    {member.alias && (
                      <div className="castAlias">as {member.alias}</div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
