import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import {
  deleteTheatre,
  getOwnerSpecificTheatres,
} from "../../../services/theatre.service";
import UserContext from "../../../context/user-context";
import { Table, Button, message, Grid, Card, Tag, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  MailTwoTone,
  PhoneTwoTone,
  EnvironmentTwoTone,
  TeamOutlined,
  ContactsTwoTone,
  PlusCircleFilled,
} from "@ant-design/icons";
import TheatreForm from "../TheatreForm/TheatreForm";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

const TheatreList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { data: theatres, sendRequest: sendOwnerTheatresRequest } = useHttp(
    getOwnerSpecificTheatres,
    false,
  );

  const { sendRequest: sendDeleteTheatreRequest } = useHttp(
    deleteTheatre,
    false,
  );

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      sendOwnerTheatresRequest(user?._id);
    }
  }, [user, sendOwnerTheatresRequest]);

  const handleDelete = async () => {
    await sendDeleteTheatreRequest(selectedTheatre._id);
    message.success("Theatre deleted successfully!");
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
    sendOwnerTheatresRequest(user?._id);
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "contactNo",
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "capacity",
      title: "Capacity",
      dataIndex: "capacity",
      render: (text) => <span>{text} seats</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (sstatus, data) => {
        if (data.isActive) {
          return <span style={{ color: "green" }}>Active</span>;
        } else {
          return <span style={{ color: "red" }}>Inactive</span>;
        }
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (text, data) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheatre(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              danger
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                type="primary"
                icon={<PlusCircleFilled />}
                style={{
                  backgroundColor: "#e6f4ff",
                  borderColor: "#1677ff",
                  color: "#1677ff",
                  borderRadius: "20px",
                }}
              >
                Add Show
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  if (!theatres) {
    return null;
  }
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          className="primaryBtn"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theatre
        </Button>
      </div>

      {isMobile ? (
        <div style={{ marginTop: "10px" }}>
          {theatres?.map((theatre) => (
            <Card
              key={theatre._id}
              style={{ marginBottom: "10px", borderRadius: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "5px",
                }}
              >
                <Tag color={theatre.isActive ? "green" : "red"}>
                  {theatre.isActive ? "Active" : "Inactive"}
                </Tag>
              </div>
              <h3>{theatre.name}</h3>
              <div style={{ paddingLeft: "10px" }}>
                <p>
                  <MailTwoTone /> {theatre.email}
                </p>
                <p>
                  <PhoneTwoTone /> {theatre.contactNo}
                </p>
                <p>
                  <EnvironmentTwoTone /> {theatre.address}
                </p>
                <Tag
                  color="blue"
                  icon={<ContactsTwoTone />}
                  style={{ marginTop: "8px" }}
                >
                  Capacity: {theatre.capacity} Seats
                </Tag>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        setIsModalOpen(true);
                        setFormType("edit");
                        setSelectedTheatre(theatre);
                      }}
                    />
                    <Button
                      danger
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setSelectedTheatre(theatre);
                      }}
                      icon={<DeleteOutlined />}
                    />
                  </Space>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Table dataSource={theatres} columns={columns} rowKey="_id" />
      )}

      {isModalOpen && (
        <TheatreForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          formType={formType}
          sendOwnerTheatresRequest={sendOwnerTheatresRequest}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          isModalOpen={isDeleteModalOpen}
          handleOk={handleDelete}
          handleCancel={() => {
            setIsDeleteModalOpen(false);
            setSelectedTheatre(null);
          }}
          title="Delete Theatre"
          message="Are you sure you want to delete this theatre?"
        />
      )}
    </>
  );
};

export default TheatreList;
