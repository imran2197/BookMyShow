import React, { useContext } from "react";
import UserContext from "../../../context/user-context";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import useHttp from "../../../hooks/useHttp";
import { addTheatre, updateTheatre } from "../../../services/theatre.service";

const TheatreForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  formType,
  sendOwnerTheatresRequest,
}) => {
  const { user } = useContext(UserContext);

  const { sendRequest: sendAddTheatreRequest } = useHttp(addTheatre, false);

  const { sendRequest: sendUpdateTheatreRequest } = useHttp(
    updateTheatre,
    false,
  );

  const onFinish = async (values) => {
    if (formType === "add") {
      await sendAddTheatreRequest(values);
    } else {
      await sendUpdateTheatreRequest({ ...values, id: selectedTheatre._id });
    }
    message.success(
      formType === "add"
        ? "Theatre added successfully!"
        : "Theatre updated successfully!",
    );
    await sendOwnerTheatresRequest(user?._id);
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={selectedTheatre}
        onFinish={onFinish}
      >
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              name="name"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input placeholder="Theatre Name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Theatre email is required!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Contact No"
                  name="contactNo"
                  rules={[
                    { required: true, message: "Contact number is required!" },
                  ]}
                >
                  <Input placeholder="Contact No" maxLength={10} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required!" }]}
            >
              <Input.TextArea
                placeholder="Address"
                name="address"
                label="Address"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: "Capacity is required!" }]}
            >
              <Input placeholder="Capacity" />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button
              className="primaryBtn"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              {formType === "add" ? "Create" : "Save"}
            </Button>
            <Button
              className="secondaryBtn"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default TheatreForm;
