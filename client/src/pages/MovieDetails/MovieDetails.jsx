import "./MovieDetails.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useHttp from "../../hooks/useHttp";
import { fetchMovieById } from "../../services/movie.service";
import { getAllTheatresByMovie } from "../../services/theatre.service";
import { formatRuntime } from "../../utils/Format";
import moment from "moment";
import {
  Avatar,
  Button,
  Input,
  Descriptions,
  Empty,
  Rate,
  Tag,
  Tabs,
} from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const { data: movie, sendRequest } = useHttp(fetchMovieById, false);
  const {
    data: theatres,
    isLoading: isTheatresLoading,
    sendRequest: sendAllTheatresByMovieRequest,
  } = useHttp(getAllTheatresByMovie, false);

  useEffect(() => {
    sendRequest(id);
  }, [id]);

  useEffect(() => {
    sendAllTheatresByMovieRequest({ movie: id, date: new Date(date) });
  }, [date]);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!movie) return null;

  const {
    title,
    language,
    genre,
    description,
    rating,
    runtime,
    cast,
    releaseDate,
    posterUrl,
  } = movie;

  const tabItems = [
    {
      key: "showings",
      label: "Now Showing",
      children: (
        <div>
          {/* Date Picker */}
          <div className="md-showings-header">
            <h2 className="md-section-label">Select Showtime</h2>
            <Input
              type="date"
              className="md-date-picker"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => e.target.value && setDate(e.target.value)}
            />
          </div>

          {/* No Theatres */}
          {!isTheatresLoading && theatres && theatres.length === 0 && (
            <div className="md-empty-wrap">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No theatres available for this movie on the selected date."
              />
            </div>
          )}

          {/* Theatre Cards */}
          {theatres &&
            theatres.length > 0 &&
            theatres.map((theatre) => (
              <div key={theatre._id} className="md-theatre-card">
                {/* Theatre Header */}
                <div className="md-theatre-head">
                  <div>
                    <div className="md-theatre-name">{theatre.name}</div>
                    <div className="md-theatre-addr">
                      <EnvironmentOutlined style={{ fontSize: 11 }} />
                      {theatre.address}
                    </div>
                  </div>
                  <Tag className="md-dolby-badge">Dolby Atmos</Tag>
                </div>

                {/* Show Times */}
                <div className="md-theatre-body">
                  {theatre.shows && theatre.shows.length > 0 ? (
                    <div className="md-shows-row">
                      {[...theatre.shows]
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((show) => (
                          <Button
                            key={show._id}
                            className="md-show-btn"
                            onClick={() => navigate(`/book-show/${show._id}`)}
                          >
                            {moment(show.time, "HH:mm").format("h:mm A")}
                          </Button>
                        ))}
                    </div>
                  ) : (
                    <span className="md-no-shows">No shows available</span>
                  )}
                </div>
              </div>
            ))}
        </div>
      ),
    },
    {
      key: "about",
      label: "About",
      children: (
        <div className="md-about-grid">
          {/* Synopsis */}
          <div>
            <h2 className="md-section-label">Synopsis</h2>
            <p className="md-description">{description}</p>
          </div>

          {/* Details */}
          <div>
            <h2 className="md-section-label">Details</h2>
            <Descriptions
              className="md-details-desc"
              column={1}
              colon={false}
              layout="horizontal"
              items={[
                {
                  key: "lang",
                  label: "Language",
                  children: language,
                },
                {
                  key: "genre",
                  label: "Genre",
                  children: genre.join(", "),
                },
                {
                  key: "runtime",
                  label: "Runtime",
                  children: formatRuntime(runtime),
                },
                {
                  key: "release",
                  label: "Release Date",
                  children: moment(releaseDate).format("D MMMM YYYY"),
                },
                {
                  key: "rating",
                  label: "Rating",
                  children: (
                    <span className="md-gold-rating">
                      {rating?.toFixed(1)} / 10
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      key: "cast",
      label: "Cast",
      children: (
        <div>
          <h2 className="md-section-label">Cast &amp; Crew</h2>
          <div className="md-cast-grid">
            {cast.map((member) => (
              <div key={member._id} className="md-cast-card">
                <Avatar
                  src={member.profilePicture}
                  alt={member.name}
                  className="md-cast-avatar"
                  size={80}
                />
                <div className="md-cast-name">{member.name}</div>
                {member.alias && (
                  <div className="md-cast-alias">as {member.alias}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="md-page">
      {/* Hero Section */}
      <section className="md-hero">
        <div
          className={`md-hero-bg ${heroLoaded ? "loaded" : "unloaded"}`}
          style={{ backgroundImage: `url(${posterUrl})` }}
        />
        <div className="md-hero-gradient" />

        {/* Back Button */}
        <Button
          className="md-back-btn"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {/* Hero Text */}
        <div className={`md-hero-content ${heroLoaded ? "visible" : "hidden"}`}>
          {/* Genre Tags */}
          <div className="md-tags">
            {genre.map((g) => (
              <Tag key={g} className="md-genre-tag">
                {g}
              </Tag>
            ))}
          </div>

          {/* Title */}
          <h1 className="md-title">{title}</h1>

          {/* Meta Row */}
          <div className="md-meta-row">
            <div className="md-rating-block">
              <Rate
                disabled
                allowHalf
                value={rating ? rating / 2 : 0}
                className="md-hero-rate"
              />
              <span className="md-rating-score">{rating?.toFixed(1)}</span>
              <div>
                <div className="md-rating-label">IMDb Score</div>
                <div className="md-rating-sub">/ 10</div>
              </div>
            </div>

            <div className="md-meta-dot" />

            <div className="md-meta-item">
              <ClockCircleOutlined style={{ fontSize: 13 }} />
              <strong>{formatRuntime(runtime)}</strong>
            </div>

            <div className="md-meta-dot" />

            <div className="md-meta-item">
              <CalendarOutlined style={{ fontSize: 13 }} />
              <strong>{moment(releaseDate).format("D MMMM YYYY")}</strong>
            </div>

            <div className="md-meta-dot" />

            <div className="md-meta-item">
              <GlobalOutlined style={{ fontSize: 13 }} />
              <strong>{language}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="md-body">
        <Tabs
          className="md-tabs"
          defaultActiveKey="showings"
          items={tabItems}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
