import React from "react";
import "./Layout.css";
import { BrowserRouter, Link } from "react-router";

import { Layout as AntLayout, Button, Input } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { SearchOutlined } from "@ant-design/icons";

const Layout = ({ children }) => {
  return (
    <BrowserRouter>
      <AntLayout className="layout">
        <Header className="header">
          <Link to="/" className="logo">
            BookMyShow
          </Link>
          <div className="searchContainer">
            <Input
              className="search"
              placeholder="Search..."
              prefix={<SearchOutlined />}
            />
            <Button type="default" size="small" className="signInBtn">
              Sign In
            </Button>
          </div>
        </Header>
        <Content className="content">{children}</Content>
        <Footer className="footer">
          <div style={{ marginBottom: 16 }}>
            <a href="#movies" className="footer-item">
              Movies
            </a>
            <a href="#events" className="footer-item">
              Events
            </a>
            <a href="#plays" className="footer-item">
              Plays
            </a>
            <a href="#sports" className="footer-item">
              Sports
            </a>
          </div>
          <div style={{ fontSize: 12 }}>
            © {new Date().getFullYear()} BookMyShow. All rights reserved.
          </div>
        </Footer>
      </AntLayout>
    </BrowserRouter>
  );
};

export default Layout;
