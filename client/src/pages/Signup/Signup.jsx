import "/src/index.css";
import { roles } from "../../constants/constants";
import useHttp from "../../hooks/useHttp";
import { register } from "../../services/user.service";
import { Link, useNavigate } from "react-router";

import { Button, Card, Form, Input, message, Select, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Option } = Select;
const { Title, Text } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data, isLoading, sendRequest } = useHttp(register, false);

  const handleFinish = (values) => {
    sendRequest(values);
  };

  useEffect(() => {
    if (data) {
      message.success("Registration Successful. Please login.");
      navigate("/login");
    }
  }, [data, navigate]);
  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />
      <Card className="auth-card" bordered={false}>
        <div className="auth-card-header">
          <Title level={3} className="auth-title">
            Create your account
          </Title>
          <Text className="auth-subtitle">
            Join BookMyShow to discover and book the best movies, events and
            more.
          </Text>
        </div>
        <Form
          form={form}
          layout="vertical"
          className="auth-form"
          onFinish={handleFinish}
          initialValues={{ role: "User" }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ color: "#b3b3b3" }} />}
              placeholder="Enter your name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              size="large"
              prefix={<MailOutlined style={{ color: "#b3b3b3" }} />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "#b3b3b3" }} />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role" }]}
          >
            <Select size="large" placeholder="Select a role">
              {roles.map((role) => (
                <Option value={role.value}>{role.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="auth-submit-btn"
              loading={isLoading}
              disabled={isLoading}
            >
              Create account
            </Button>
          </Form.Item>
          <div
            style={{ textAlign: "center", color: "#374151", fontWeight: 500 }}
          >
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>

        <div className="auth-footer-text">
          <Text type="secondary">
            By continuing, you agree to our <span>Terms of Use</span> and{" "}
            <span>Privacy Policy</span>.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
