/* eslint-disable react-hooks/set-state-in-effect */
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Card,
  TimePicker,
  DatePicker,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { fetchAllMovies } from "../../../services/movie.service";
import { addShow, updateShow } from "../../../services/show.service";
import { useLocation } from "react-router";
import dayjs from "dayjs";

const ShowForm = ({ isEdit, setView, theatreId, setRefresh }) => {
  const location = useLocation();
  const selectedShow = location.state?.selectedShow;

  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const { data: movies, sendRequest: sendMovieRequest } = useHttp(
    fetchAllMovies,
    false,
  );

  const { data: addShowResponse, sendRequest: sendAddShowRequest } = useHttp(
    addShow,
    false,
  );
  const { data: updateShowResponse, sendRequest: sendUpdateShowRequest } =
    useHttp(updateShow, false);

  useEffect(() => {
    sendMovieRequest();
  }, []);

  useEffect(() => {
    if (!submitted) return;

    if (addShowResponse) {
      message.success("Show added successfully!");

      setRefresh((prev) => !prev);
      setView("table");
      setSubmitted(false);
    } else {
      message.error("Failed to add show");
      setSubmitted(false);
    }
  }, [addShowResponse]);

  useEffect(() => {
    if (!submitted) return;

    if (updateShowResponse) {
      message.success("Show updated successfully!");

      setRefresh((prev) => !prev);
      setView("table");
      setSubmitted(false);
    } else {
      message.error("Failed to update show");
      setSubmitted(false);
    }
  }, [updateShowResponse]);

  useEffect(() => {
    if (isEdit && selectedShow) {
      form.setFieldsValue({
        name: selectedShow.name,
        date: selectedShow.date ? dayjs(selectedShow.date) : null,
        time: selectedShow.time ? dayjs(selectedShow.time, "hh:mm A") : null,
        movie: selectedShow.movie?._id,
        ticketPrice: selectedShow.ticketPrice,
        totalSeats: selectedShow.totalSeats,
      });
    } else {
      form.resetFields();
    }
  }, [isEdit, selectedShow]);

  const onFinish = async (values) => {
    setSubmitted(true);
    const payload = {
      name: values.name,
      date: values.date.toDate(),
      time: values.time.format("hh:mm A"),
      movie: values.movie,
      ticketPrice: Number(values.ticketPrice),
      totalSeats: Number(values.totalSeats),
      theatre: theatreId,
    };

    if (isEdit) {
      await sendUpdateShowRequest(selectedShow._id, payload);
    } else {
      await sendAddShowRequest(payload);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <Card
        bordered={false}
        style={{ borderRadius: "12px" }}
        bodyStyle={{ padding: "16px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontWeight: 600 }}>
            {isEdit ? "Edit Show" : "Add Show"}
          </h2>
          <p style={{ margin: 0, color: "#888" }}>
            {isEdit
              ? "Update the show details"
              : "Fill the form to create a new show"}
          </p>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                name="name"
                label="Show Name"
                htmlFor="name"
                rules={[{ required: true, message: "Show name is required!" }]}
              >
                <Input size="large" placeholder="Enter the show name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                name="date"
                label="Date"
                htmlFor="date"
                rules={[{ required: true, message: "Date is required!" }]}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select date"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                name="time"
                label="Time"
                htmlFor="time"
                rules={[{ required: true, message: "Time is required!" }]}
              >
                <TimePicker
                  use12Hours
                  format="hh:mm A"
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select time"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                name="movie"
                label="Movie"
                htmlFor="movie"
                rules={[{ required: true, message: "Movie is required!" }]}
              >
                <Select
                  size="large"
                  options={movies?.map((m) => ({
                    label: m.title,
                    value: m._id,
                  }))}
                  placeholder="Select movie"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                name="ticketPrice"
                label="Ticket Price"
                htmlFor="ticketPrice"
                rules={[
                  { required: true, message: "Ticket price is required!" },
                ]}
              >
                <Input
                  type="number"
                  size="large"
                  placeholder="Enter ticket price"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                name="totalSeats"
                label="Total Seats"
                htmlFor="totalSeats"
                rules={[
                  { required: true, message: "Total seats is required!" },
                ]}
              >
                <Input
                  type="number"
                  size="large"
                  placeholder="Enter total seats"
                />
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              style={{ flex: "1 1 150px" }}
              onClick={() => setView("table")}
            >
              Back
            </Button>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ flex: "1 1 150px" }}
            >
              {isEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ShowForm;
