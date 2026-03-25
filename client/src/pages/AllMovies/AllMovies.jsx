import React, { useEffect, useMemo, useState } from "react";
import { fetchAllMovies } from "../../services/movie.service";
import { Col, Row, Input, Tag, Typography } from "antd";
import { FireFilled, SearchOutlined } from "@ant-design/icons";
import Movie from "../../components/Movie/Movie";

import "./AllMovies.css";

const { Title, Text } = Typography;
const AllMovies = () => {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetchAllMovies();
      setMovies(res.data);
    })();
  }, []);

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    if (!search.trim()) return movies;

    return movies.filter((m) =>
      m.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [movies, search]);

  if (!movies) return null;

  if (!filteredMovies.length) {
    return (
      <div className="movies-page">
        <div className="movies-hero">
          <div className="movies-hero-text">
            <Tag color="red" icon={<FireFilled />} className="movies-pill">
              Now Showing
            </Tag>
            <Title level={2} className="movies-title">
              Movies in Theatres
            </Title>
            <Text className="movies-subtitle">
              Browse what's trending this week and find your next favourite
              watch.
            </Text>
          </div>

          <Input
            className="movies-search-input"
            placeholder="Search movies..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Empty State */}
        <div className="movies-empty">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png"
            alt="No movies"
            className="movies-empty-img"
          />

          <h3>No movies found</h3>

          <p>
            {search
              ? "Try searching with a different keyword."
              : "No movies are available right now."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-page">
      <div className="movies-hero">
        <div className="movies-hero-text">
          <Tag color="red" icon={<FireFilled />} className="movies-pill">
            Now Showing
          </Tag>
          <Title level={2} className="movies-title">
            Movies in Theatres
          </Title>
          <Text className="movies-subtitle">
            Browse what&apos;s trending this week and find your next favourite
            watch.
          </Text>
        </div>
        <Input
          className="movies-search-input"
          placeholder="Search movies..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Row gutter={[16, 16]}>
        {filteredMovies &&
          filteredMovies.map((movie) => (
            <Col key={movie._id} xs={12} sm={8} md={6} lg={4} xl={4}>
              <Movie movie={movie} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default AllMovies;
