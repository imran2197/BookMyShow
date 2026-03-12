import "/src/index.css";

import { Link } from "react-router";
import { useContext } from "react";
import UserContext from "../../context/user-context";

import { Form, Input, Button, Card, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useContext(UserContext);
  const handleFinish = (values) => {
    login(values);
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <Card className="auth-card" bordered={false}>
        <div className="auth-card-header">
          <Title level={3} className="auth-title">
            Welcome back
          </Title>
          <Text className="auth-subtitle">
            Sign in to continue booking your favourite movies and events.
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleFinish} className="auth-form">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="auth-submit-btn"
            >
              Log in
            </Button>
          </Form.Item>

          <div
            style={{ textAlign: "center", color: "#374151", fontWeight: 500 }}
          >
            Don't have an account? <Link to="/signup">Register</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
