import "./TheatresTable.css";
import React, { useEffect } from "react";
import useHttp from "../../../hooks/useHttp";
import {
  getAllTheatres,
  updateTheatre,
} from "../../../services/theatre.service";
import { Button, Table, Grid } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const TheatresTable = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { data: theatres, sendRequest: sendTheatresRequest } = useHttp(
    getAllTheatres,
    false,
  );

  const { sendRequest: sendUpdateTheatreRequest } = useHttp(
    updateTheatre,
    false,
  );

  useEffect(() => {
    sendTheatresRequest();
  }, [sendTheatresRequest]);

  const handleStatusChange = async (data) => {
    const payload = {
      ...data,
      id: data._id,
      isActive: !data.isActive,
    };

    await sendUpdateTheatreRequest(payload);
    await sendTheatresRequest();
  };

  // ✅ Desktop Table Columns
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
      responsive: ["md"],
    },
    {
      key: "contactNo",
      title: "Contact No",
      dataIndex: "contactNo",
      responsive: ["md"],
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "address",
      responsive: ["lg"],
    },
    {
      key: "owner",
      title: "Owner",
      render: (text, data) => <span>{data.owner?.name}</span>,
      responsive: ["md"],
    },
    {
      key: "status",
      title: "Status",
      render: (text, data) => (
        <span style={{ fontWeight: 500 }}>
          {data.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (text, data) => (
        <div className="d-flex align-items-center gap-10">
          {data.isActive ? (
            <Button
              shape="round"
              icon={<StopOutlined />}
              onClick={() => handleStatusChange(data)}
              style={{
                backgroundColor: "#fff2f0",
                borderColor: "#ff4d4f",
                color: "#ff4d4f",
                fontWeight: 500,
              }}
            >
              {!isMobile && "Deactivate"}
            </Button>
          ) : (
            <Button
              shape="round"
              icon={<CheckCircleOutlined />}
              onClick={() => handleStatusChange(data)}
              style={{
                backgroundColor: "#f6ffed",
                borderColor: "#52c41a",
                color: "#52c41a",
                fontWeight: 500,
              }}
            >
              {!isMobile && "Activate"}
            </Button>
          )}
        </div>
      ),
    },
  ];

  // ✅ Mobile Card UI
  const renderMobileCards = () => {
    return (
      <div className="mobile-container">
        {theatres?.map((item) => (
          <div className="mobile-card" key={item._id}>
            <div className="card-header">
              <h3>{item.name}</h3>
              <span
                className={item.isActive ? "status active" : "status inactive"}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="card-body">
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Contact:</strong> {item.contactNo}
              </p>
              <p>
                <strong>Owner:</strong> {item.owner?.name}
              </p>
            </div>

            <div className="card-actions">
              {item.isActive ? (
                <Button
                  shape="round"
                  icon={<StopOutlined />}
                  onClick={() => handleStatusChange(item)}
                  style={{
                    backgroundColor: "#fff2f0",
                    color: "#ff4d4f",
                    borderColor: "#ff4d4f",
                  }}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  shape="round"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleStatusChange(item)}
                  style={{
                    backgroundColor: "#f6ffed",
                    color: "#52c41a",
                    borderColor: "#52c41a",
                  }}
                >
                  Activate
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {theatres &&
        (isMobile ? (
          renderMobileCards()
        ) : (
          <Table
            dataSource={theatres}
            columns={columns}
            rowKey="_id"
            scroll={{ x: 800 }}
          />
        ))}
    </>
  );
};

export default TheatresTable;
