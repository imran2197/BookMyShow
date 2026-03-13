import "./AddTheatre.css";
import React, { useEffect } from "react";
import { Button, Card, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router";
import useHttp from "../../hooks/useHttp";
import { createTheatre } from "../../services/theatre.service";

const { Title, Text } = Typography;
const AddTheatre = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data, isLoading, error, sendRequest } = useHttp(createTheatre, false);

  useEffect(() => {
    if (data) {
      message.success("Theatre created successfully");
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error.message || "Failed to create theatre");
    }
  }, [error]);

  const onFinish = (values) => {
    sendRequest(values);
  };
  return (
    <div className="create-theatre-wrapper">
      <Card className="create-theatre-card">
        <Title level={3} className="create-theatre-title">
          Create Theatre
        </Title>

        <Text className="create-theatre-subtitle">
          Add a new theatre to your system
        </Text>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className="create-theatre-form"
        >
          <Form.Item
            label="Theatre Name"
            name="name"
            rules={[{ required: true, message: "Please enter theatre name" }]}
          >
            <Input placeholder="Enter theatre name" size="large" />
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please enter capacity" }]}
          >
            <Input placeholder="Enter capacity" size="large" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter full address" />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNo"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="primaryBtn"
              style={{ marginTop: "25px" }}
              disabled={isLoading}
              loading={isLoading}
            >
              Create Theatre
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddTheatre;
