import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Rate,
  Divider,
} from "antd";
import "./MovieForm.css";
import React, { useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import useHttp from "../../../hooks/useHttp";
import { addNewMovie, updateMovie } from "../../../services/movie.service";

const MovieForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedMovie,
  setSelectedMovie,
  formType,
  refreshMovies,
}) => {
  const { data: newMovieData, sendRequest: sendAddNewMovieRequest } = useHttp(
    addNewMovie,
    false,
  );
  const { data: updatedMovieData, sendRequest: sendUpdateMovieRequest } =
    useHttp(updateMovie, false);

  const [form] = Form.useForm();
  const { Option } = Select;

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    values.releaseDate = new Date(values.releaseDate);
    values.runtime = Number(values.runtime);
    if (formType === "add") {
      sendAddNewMovieRequest(values);
    } else {
      const payload = {
        ...values,
        id: selectedMovie._id,
      };
      sendUpdateMovieRequest(payload);
    }
  };

  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Punjabi",
  ];

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  useEffect(() => {
    if (newMovieData || updatedMovieData) {
      setIsModalOpen(false);
      refreshMovies();
    }
  }, [newMovieData, updatedMovieData, refreshMovies, setIsModalOpen]);

  useEffect(() => {
    if (selectedMovie) {
      form.setFieldsValue({
        ...selectedMovie,
        releaseDate: selectedMovie.releaseDate
          ? new Date(selectedMovie.releaseDate).toISOString().split("T")[0]
          : null,
      });
    }
  }, [selectedMovie, form]);

  return (
    <Modal
      centered
      title={formType === "add" ? "🎬 Add Movie" : "✏️ Edit Movie"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={900}
      className="movie-modal"
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={selectedMovie}
        onFinish={handleSubmit}
      >
        {/* Movie Details */}

        <Divider orientation="left">Movie Details</Divider>

        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item
              label="Movie Name"
              name="title"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input size="large" placeholder="Enter movie name" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea rows={4} placeholder="Enter movie description" />
            </Form.Item>
          </Col>
        </Row>

        {/* Movie Information */}

        <Divider orientation="left">Movie Information</Divider>

        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Duration (minutes)"
              name="runtime"
              rules={[{ required: true, message: "Duration is required!" }]}
            >
              <Input type="number" min="0" placeholder="120" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: "Language required!" }]}
            >
              <Select
                placeholder="Select Language"
                options={languages.map((lang) => ({
                  value: lang,
                  label: lang,
                }))}
              ></Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Release Date"
              name="releaseDate"
              rules={[{ required: true, message: "Release date required!" }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
        </Row>

        {/* Genre + Rating */}

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: "Genre required!" }]}
            >
              <Select mode="multiple" placeholder="Select Genres">
                {genres.map((g) => (
                  <Option value={g}>{g}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Rating" name="rating">
              <Rate allowHalf />
            </Form.Item>
          </Col>
        </Row>

        {/* Poster */}

        <Divider orientation="left">Poster</Divider>

        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item
              label="Poster URL"
              name="posterUrl"
              rules={[{ required: true, message: "Poster URL is required!" }]}
            >
              <Input placeholder="Paste movie poster URL" />
            </Form.Item>
          </Col>
        </Row>

        {/* Cast */}

        <Divider orientation="left">Cast</Divider>

        <Form.List name="cast">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <div className="cast-row" key={key}>
                  <Form.Item
                    name={[name, "name"]}
                    className="cast-field"
                    rules={[{ required: true, message: "Actor name required" }]}
                  >
                    <Input placeholder="Actor Name" />
                  </Form.Item>

                  <Form.Item name={[name, "alias"]} className="cast-field">
                    <Input placeholder="Character Name" />
                  </Form.Item>

                  <Form.Item
                    name={[name, "profilePicture"]}
                    className="cast-field"
                  >
                    <Input placeholder="Profile Image URL" />
                  </Form.Item>

                  <Button
                    danger
                    className="cast-remove-btn"
                    onClick={() => remove(name)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="dashed" block onClick={() => add()}>
                + Add Cast
              </Button>
            </>
          )}
        </Form.List>

        {/* Buttons */}

        <Form.Item className="form-buttons">
          <Button
            size="large"
            onClick={handleCancel}
            className="secondaryBtn"
            style={{ marginRight: "20px" }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="primaryBtn"
          >
            {formType === "add" ? "Add Movie" : "Update Movie"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieForm;
