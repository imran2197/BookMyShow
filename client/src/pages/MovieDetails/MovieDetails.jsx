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
  Alert,
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

          <Row gutter={[32, 24]} align="middle">
            <Col xs={24} md={6}>
              <img src={posterUrl} alt={title} className="heroPoster" />
            </Col>

            <Col xs={24} md={18}>
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
        <Divider />

        <h2 style={{ padding: "15px 0px" }}>Theatres screening this movie</h2>

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
              <Empty description="No theatres are screening this movie yet." />
            ) : (
              <Row gutter={[16, 16]}>
                {(screenings?.theatres || []).map((t) => (
                  <Col key={t._id} xs={24} md={12}>
                    <Card hoverable className="theatreCard" title={t.name}>
                      <div>{t.address}</div>
                      <div>📞 {t.contactNo}</div>

                      <Button type="primary" block className="bookBtn">
                        Book Ticket
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}

        <Divider />

        <h2>About the Movie</h2>

        <p className="description">{description}</p>

        {cast && cast.length > 0 && (
          <>
            <Divider />

            <h2>Cast</h2>

            <Row gutter={[20, 20]}>
              {cast.map((member) => (
                <Col key={member._id} xs={12} sm={8} md={4}>
                  <div className="castItem">
                    <Avatar src={member.profilePicture} size={90} />

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
