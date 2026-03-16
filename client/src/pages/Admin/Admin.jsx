import "./Admin.css";
import React from "react";
import MovieList from "./MovieList/MovieList";
import TheatresTable from "./TheatresTable/TheatresTable";
import { Tabs } from "antd";

const Admin = () => {
  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatresTable />,
    },
  ];
  return (
    <div style={{ padding: "25px" }}>
      <h1>Admin Page</h1>
      <Tabs items={tabItems} />
    </div>
  );
};

export default Admin;
