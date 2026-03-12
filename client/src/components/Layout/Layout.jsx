import React, { useContext, useState } from "react";
import "./Layout.css";
import { Link } from "react-router";

import { Layout as AntLayout, Avatar, Button, Drawer, Dropdown } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";

import UserContext from "../../context/user-context";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(UserContext);

  const profileItems = [
    {
      key: "name",
      label: user?.name || "User",
    },
    {
      key: "role",
      label: user?.role ? `Role: ${user.role}` : "Role: N/A",
    },
  ];

  return (
    <AntLayout className="layout">
      {/* HEADER */}
      <Header className="header">
        <Link to="/" className="logo">
          BookMyShow
        </Link>

        {/* Desktop SignIn */}
        <div className="searchContainer">
          {user ? (
            <>
              <Dropdown
                menu={{ items: profileItems }}
                placement="bottomRight"
                arrow
              >
                <Avatar
                  className="avatar"
                  size="large"
                  icon={<UserOutlined />}
                />
              </Dropdown>
              <Button
                className="logout"
                type="default"
                size="small"
                shape="round"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button type="default" className="signupBtn">
                  Sign up
                </Button>
              </Link>
              <Link to="/login">
                <Button className="loginBtn">Login</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <MenuOutlined className="hamburger" onClick={() => setOpen(true)} />
      </Header>

      {/* DRAWER MENU */}
      <Drawer
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ height: "100%", padding: 0 }}
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
          <div className="menuContainer">
            <div className="navItems">
              <Link to="/movies" onClick={() => setOpen(false)}>
                Movies
              </Link>
              <Link to="/events" onClick={() => setOpen(false)}>
                Events
              </Link>
              <Link to="/sports" onClick={() => setOpen(false)}>
                Sports
              </Link>
            </div>
            {user ? (
              <div className="userSection">
                <div className="userInfo">
                  <Avatar
                    className="avatar"
                    size="large"
                    icon={<UserOutlined />}
                  />
                  <span className="userName">{user.name}</span>
                </div>

                <Button
                  className="logoutBtn"
                  type="default"
                  size="small"
                  shape="round"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
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
            )}
          </div>
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
  );
};

export default Layout;
