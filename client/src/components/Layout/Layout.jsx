import React, { useContext, useState } from "react";
import "./Layout.css";
import { Link, NavLink } from "react-router";

import {
  Layout as AntLayout,
  Avatar,
  Button,
  Collapse,
  Drawer,
  Dropdown,
  Space,
} from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import {
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  DownOutlined,
  PlusOutlined,
  AppstoreOutlined,
  HomeOutlined,
  PlaySquareOutlined,
  TagsOutlined,
  DashboardOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";

import UserContext from "../../context/user-context";

const { Panel } = Collapse;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(UserContext);

  const profileItems = [
    {
      key: "name",
      label: user?.name || "User",
    },
    {
      key: "role",
      label: user?.role ? `Role: ${user.role}` : "Role: N/A",
    },
    ...(user
      ? [
          {
            key: "logout",
            label: (
              <Button
                className="logout"
                type="default"
                size="small"
                shape="round"
                onClick={logout}
              >
                Logout
              </Button>
            ),
          },
        ]
      : []),
  ];

  const theatreItems = [
    {
      key: "1",
      icon: <PlusOutlined />,
      label: <Link to="/addTheatre">Add Theatre</Link>,
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: <Link to="/myTheatres">My Theatres</Link>,
    },
  ];

  const canCreateTheatre =
    isAuthenticated && (user?.role === "Admin" || user?.role === "Partner");

  return (
    <AntLayout className="layout">
      {/* HEADER */}
      <Header className="header">
        <div className="headerLeft">
          <Link to="/" className="logo">
            <TagsOutlined style={{ marginRight: "10px" }} />
            BookMyShow
          </Link>
        </div>

        <div className="navLinks">
          <NavLink to="/" className="navItem">
            <HomeOutlined />
            Home
          </NavLink>
          {user?.role === "Admin" && (
            <NavLink to="/admin" className="navItem">
              <DashboardOutlined />
              Admin Page
            </NavLink>
          )}

          {canCreateTheatre && (
            <Dropdown
              menu={{ items: theatreItems }}
              trigger={["click"]}
              overlayClassName="theatreDropdown"
            >
              <Space className="navItem">
                <PlaySquareOutlined />
                Theatre
                <CaretDownOutlined
                  style={{
                    transform: "scale(0.7)",
                    marginTop: "26px",
                    marginLeft: "-5px",
                  }}
                />
              </Space>
            </Dropdown>
          )}
        </div>

        <div className="headerRight">
          {user ? (
            <>
              <Dropdown
                menu={{ items: profileItems }}
                placement="bottomRight"
                overlayClassName="profileDropdown"
                arrow
                trigger={["click"]}
              >
                <Avatar
                  className="avatar"
                  size="large"
                  icon={<UserOutlined />}
                />
              </Dropdown>
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
              <Link to="/" className="navItem" onClick={() => setOpen(false)}>
                <HomeOutlined />
                Home
              </Link>
              {user?.role === "Admin" && (
                <Link
                  className="navItem"
                  to="/admin"
                  onClick={() => setOpen(false)}
                >
                  <DashboardOutlined />
                  Admin Page
                </Link>
              )}
              {canCreateTheatre && (
                <Collapse ghost className="mobileTreeMenu">
                  <Panel
                    header={
                      <span>
                        <PlaySquareOutlined style={{ marginRight: 2 }} />{" "}
                        Theatre
                      </span>
                    }
                    key="1"
                  >
                    <Link
                      to="/addTheatre"
                      onClick={() => setOpen(false)}
                      className="navItem"
                    >
                      <PlusOutlined style={{ marginRight: "10px" }} />
                      Add Theatre
                    </Link>
                    <Link
                      to="/myTheatres"
                      onClick={() => setOpen(false)}
                      className="navItem"
                    >
                      <AppstoreOutlined style={{ marginRight: "10px" }} />
                      My Theatres
                    </Link>
                  </Panel>
                </Collapse>
              )}
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
