import React, { useEffect, useState } from "react";
import { fetchAllMovies } from "../../services/movie.service";
import { Col, Row } from "antd";
import Movie from "../../components/Movie/Movie";

const AllMovies = () => {
  const [movies, setMovies] = useState(null);
  console.log(movies);

  useEffect(() => {
    (async () => {
      const res = await fetchAllMovies();
      setMovies(res.data.data);
    })();
  }, []);

  if (!movies) return null;

  return (
    <div className="moviesContainer">
      <h2 className="heading">Movies In Theatres</h2>
      <Row gutter={[12, 16]}>
        {movies &&
          movies.map((movie) => (
            <Col key={movie._id} xs={12} sm={12} md={8} lg={6}>
              <Movie movie={movie} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default AllMovies;
