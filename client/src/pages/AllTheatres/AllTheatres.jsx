import React, { useEffect } from "react";
import { Card, List, Spin, Alert, Tag, Typography } from "antd";
import useHttp from "../../hooks/useHttp";
import "./AllTheatres.css";
import { getAllTheatres } from "../../services/theatre.service";

const { Title } = Typography;

const AllTheatres = () => {
  const { data, error, isLoading, sendRequest } = useHttp(getAllTheatres, true);

  useEffect(() => {
    sendRequest();
  }, []);

  const theatres = data?.theatres || [];

  return (
    <div className="all-theatres-wrapper">
      <Card className="all-theatres-card">
        <Title level={3} className="all-theatres-title">
          All Theatres
        </Title>

        {error && (
          <Alert
            type="error"
            message={error.message || "Failed to load theatres"}
            style={{ marginBottom: 16 }}
          />
        )}

        {!isLoading && !error && (
          <List
            dataSource={theatres}
            locale={{ emptyText: "No theatres available" }}
            renderItem={(item) => (
              <List.Item className="theatre-list-item">
                <List.Item.Meta
                  title={
                    <span className="theatre-name">
                      {item.name}
                      <Tag color="blue" className="capacity-tag">
                        Capacity: {item.capacity}
                      </Tag>
                    </span>
                  }
                  description={
                    <>
                      <div className="theatre-address">{item.address}</div>
                      <div className="theatre-contact">
                        Contact: {item.contactNo}
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default AllTheatres;
