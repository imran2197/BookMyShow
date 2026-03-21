import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import useHttp from "../../../hooks/useHttp";
import {
  deleteShow,
  getAllShowsByTheatre,
} from "../../../services/show.service";
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

const ShowTable = ({ setView, id, refresh }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShowId, setSelectedShowId] = useState(null);

  const { data: shows, sendRequest: sendShowsRequest } = useHttp(
    getAllShowsByTheatre,
    false,
  );

  const { sendRequest: sendDeleteShowRequest } = useHttp(deleteShow, false);

  const handleDelete = async () => {
    await sendDeleteShowRequest(selectedShowId);
    message.success("Show deleted successfully!");
    setIsDeleteModalOpen(false);
    setSelectedShowId(null);
    sendShowsRequest({ id });
  };

  useEffect(() => {
    if (id) {
      sendShowsRequest({ id });
    }
  }, [id, refresh]);

  const columns = [
    { title: "Show Name", dataIndex: "name" },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      render: (_, data) => data.movie?.title,
    },
    {
      title: "Price",
      dataIndex: "ticketPrice",
      render: (text) => `₹ ${text}`,
    },
    {
      title: "Seats",
      dataIndex: "totalSeats",
      render: (text) => (
        <>
          <AppstoreOutlined /> {text}
        </>
      ),
    },
    {
      title: "Available",
      render: (_, data) => data.totalSeats - (data.bookedSeats?.length || 0),
    },
    {
      title: "Actions",
      render: (_, data) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => {
              setView("edit");
              navigate("/partner/shows", {
                state: {
                  selectedShow: data,
                  theatreId: id,
                },
              });
            }}
          >
            <EditOutlined />
          </Button>

          <Button
            danger
            onClick={() => {
              setSelectedShowId(data._id);
              setIsDeleteModalOpen(true);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: 0 }}>Shows</h3>

        <Button
          type="primary"
          onClick={() => {
            setView("form");
            navigate("/partner/shows", {
              state: { theatreId: id },
            });
          }}
        >
          Add Show
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={shows}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
      />

      {isDeleteModalOpen && (
        <ConfirmationModal
          isModalOpen={isDeleteModalOpen}
          handleOk={handleDelete}
          handleCancel={() => {
            setIsDeleteModalOpen(false);
          }}
          title="Delete Theatre"
          message="Are you sure you want to delete this theatre?"
        />
      )}
    </>
  );
};

export default ShowTable;
