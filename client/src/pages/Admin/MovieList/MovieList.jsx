import "./MovieList.css";
import { Button, Card, Col, Form, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import { deleteMovie, fetchAllMovies } from "../../../services/movie.service";
import { formatReleaseDate, formatRuntime } from "../../../utils/Format";
import MovieForm from "../MovieForm/MovieForm";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");

  const { data: movies, sendRequest: sendMoviesRequest } = useHttp(
    fetchAllMovies,
    false,
  );

  const { sendRequest: sendDeleteRequest } = useHttp(deleteMovie, false);

  const handleOk = async () => {
    await sendDeleteRequest({ id: selectedMovie._id });
    setIsDeleteModalOpen(false);
    sendMoviesRequest();
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    sendMoviesRequest();
  }, [sendDeleteRequest, sendMoviesRequest]);

  return (
    <div className="movie-list-container">
      <div className="movie-header">
        <Button
          className="primaryBtn"
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Movie
        </Button>
      </div>

      <Row gutter={[20, 20]}>
        {movies?.map((movie) => (
          <Col xs={24} sm={8} md={6} lg={4} xl={4} key={movie._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={movie.title}
                  src={movie.posterUrl}
                  className="movie-poster"
                />
              }
              actions={[
                <span
                  className="editIcon"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedMovie(movie);
                    setFormType("edit");
                  }}
                >
                  <EditOutlined key="edit" />
                  Edit
                </span>,
                <span
                  className="deleteIcon"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSelectedMovie(movie);
                  }}
                >
                  <DeleteOutlined key="delete" />
                  Delete
                </span>,
              ]}
            >
              <Card.Meta
                title={movie.title}
                description={
                  <div className="movie-details">
                    <p className="movieDescription">
                      {movie.description}
                    </p>
                    <p>
                      <b>Runtime:</b> {formatRuntime(movie.runtime)}
                    </p>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap",
                      }}
                    >
                      <b>Genre:</b> {movie.genre.join(", ")}
                    </p>
                    <p>
                      <b>Language:</b> {movie.language}
                    </p>
                    <p>
                      <b>Release:</b> {formatReleaseDate(movie.releaseDate)}
                    </p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          refreshMovies={sendMoviesRequest}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          isModalOpen={isDeleteModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          title="Delete Movie?"
          message={"Are you sure you want to delete this movie?"}
        />
      )}
    </div>
  );
};

export default MovieList;
