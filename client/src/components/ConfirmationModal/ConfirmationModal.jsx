import { Modal } from "antd";
import React from "react";

const ConfirmationModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  title,
  message,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">{message}</p>
    </Modal>
  );
};

export default ConfirmationModal;
