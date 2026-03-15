import "./TheatreDetails.css";

import React, { useEffect } from "react";
import { getTheatreById } from "../../services/theatre.service";
import useHttp from "../../hooks/useHttp";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Form,
  InputNumber,
  message,
  Select,
  Tag,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  fetchAllMovies,
  fetchMoviesNotInScreenings,
} from "../../services/movie.service";
import { createScreening } from "../../services/screening.service";

const TheatreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: theatre, sendRequest: sendTheatreRequest } = useHttp(
    getTheatreById,
    false,
  );

  const {
    data: movies,
    error: moviesError,
    isLoading: isMoviesLoading,
    sendRequest: sendMoviesRequest,
  } = useHttp(fetchMoviesNotInScreenings, false);

  const {
    data: screening,
    error: screeningError,
    isLoading: isScreeningLoading,
    sendRequest: sendCreateScreeningRequest,
  } = useHttp(createScreening, false);

  useEffect(() => {
    if (id) {
      sendTheatreRequest(id);
    }
  }, [id, sendTheatreRequest]);

  useEffect(() => {
    if (id) {
      sendMoviesRequest(id);
    }
  }, [id, sendMoviesRequest]);

  useEffect(() => {
    if (screening) {
      message.success("Screening created successfully");
      form.resetFields(["movieId", "price", "showTimings"]);
    }
  }, [screening, form]);

  useEffect(() => {
    if (screeningError) {
      message.error(screeningError || "Failed to create screening");
    }
  }, [screeningError]);

  if (!theatre) return null;

  return (
    <div className="theatre-details-wrapper">
      <Button
        type="text"
        className="backButton"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Card
        className="theatre-card"
        title={
          <span className="theatre-card-title">
            {theatre.name}{" "}
            {typeof theatre.capacity !== "undefined" && (
              <Tag color="blue">Capacity: {theatre.capacity}</Tag>
            )}
          </span>
        }
      >
        <Descriptions bordered size="middle" column={1}>
          <Descriptions.Item label="Address">
            {theatre.address || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Contact">
            {theatre.contactNo || "-"}
          </Descriptions.Item>

          {theatre.user && (
            <Descriptions.Item label="Owner">
              {theatre.user.name || theatre.user.email || theatre.user._id}
            </Descriptions.Item>
          )}
        </Descriptions>

        <Divider className="theatre-divider" />

        <div className="theatre-section-title">Create Screening</div>

        <Form
          layout="vertical"
          form={form}
          onFinish={(values) =>
            sendCreateScreeningRequest({
              theatreId: id,
              movieId: values.movieId,
              price: values.price,
              showTimings: values.showTimings,
            })
          }
          className="screening-form"
        >
          <Form.Item
            label="Movie"
            name="movieId"
            rules={[{ required: true, message: "Please select a movie" }]}
            className="mb-3"
          >
            <Select
              placeholder={
                isMoviesLoading ? "Loading Movies..." : "Select a movie"
              }
              loading={isMoviesLoading}
              disabled={isMoviesLoading || !!moviesError}
              showSearch
              optionFilterProp="label"
              options={(movies || []).map((m) => ({
                value: m._id,
                label: m.title,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Ticket price"
            name="price"
            rules={[{ required: true, message: "Please enter a price" }]}
            className="mb-3"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="e.g. 200"
            />
          </Form.Item>

          <Form.Item
            label="Show timings"
            name="showTimings"
            rules={[
              {
                required: true,
                message: "Please add at least one show timing",
              },
              {
                type: "array",
                min: 1,
                message: "Please add at least one show timing",
              },
            ]}
            className="mb-3"
          >
            <Select mode="tags" placeholder="e.g.  3:00PM, 6:00PM" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isScreeningLoading}
              disabled={isScreeningLoading || isMoviesLoading || !!moviesError}
              className="backButton"
              style={{ marginBlock: 0 }}
            >
              Create Screening
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TheatreDetails;
