import React, { useState } from "react";
import "./Layout.css";
import { BrowserRouter, Link } from "react-router";

import { Layout as AntLayout, Button, Drawer } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";

import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <AntLayout className="layout">
        {/* HEADER */}
        <Header className="header">
          <Link to="/" className="logo">
            BookMyShow
          </Link>

          {/* Desktop SignIn */}
          <div className="searchContainer">
            <Link to="/signup">
              <Button type="default" className="signupBtn">
                Sign up
              </Button>
            </Link>
            <Link to="/login">
              <Button className="loginBtn">Login</Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <MenuOutlined className="hamburger" onClick={() => setOpen(true)} />
        </Header>

        {/* DRAWER MENU */}
        <Drawer
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          title={
            <div className="drawerHeader">
              <span style={{ fontWeight: 700, fontSize: 18 }}>BookMyShow</span>
              <span className="closeBtn" onClick={() => setOpen(false)}>
                <CloseOutlined />
              </span>
            </div>
          }
          closeIcon={false}
        >
          <div className="drawerSearch">
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button className="mobileLoginBtn" block>
                Login
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)}>
              <Button type="default" className="signupBtn" block>
                Sign up
              </Button>
            </Link>
          </div>
        </Drawer>

        {/* CONTENT */}
        <Content className="content">{children}</Content>

        {/* FOOTER */}
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
