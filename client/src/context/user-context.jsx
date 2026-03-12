import { createContext, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { fetchProfile, login, logout } from "../services/user.service";
import { useNavigate } from "react-router";
import { message } from "antd";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const {
    data: loginData,
    error: loginError,
    sendRequest: sendLoginRequest,
  } = useHttp(login, false);

  const {
    data: logoutData,
    error: logoutError,
    sendRequest: sendLogoutRequest,
  } = useHttp(logout, false);

  const { data: profile, sendRequest: sendFetchProfileRequest } = useHttp(
    fetchProfile,
    false,
  );

  // Fetch profile when app loads
  useEffect(() => {
    sendFetchProfileRequest();
  }, []);

  // When login succeeds
  useEffect(() => {
    if (!loginData) return;

    message.success({
      content: loginData.message,
      key: "loginSuccess",
    });

    sendFetchProfileRequest();
    navigate("/");
  }, [loginData]);

  // Login error
  useEffect(() => {
    if (!loginError) return;

    message.error({
      content: loginError || "Login failed",
      key: "loginError",
    });
  }, [loginError]);

  // When profile is fetched
  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  // Logout success
  useEffect(() => {
    if (!logoutData) return;

    setUser(null);

    message.success({
      content: "Logged out successfully",
      key: "logoutSuccess",
    });

    navigate("/");
  }, [logoutData]);

  // Logout error
  useEffect(() => {
    if (!logoutError) return;

    message.error({
      content: logoutError || "Logout failed",
      key: "logoutError",
    });
  }, [logoutError]);

  const loginUser = (userCreds) => {
    sendLoginRequest(userCreds);
  };

  const logoutUser = () => {
    sendLogoutRequest();
  };

  const context = {
    user,
    isAuthenticated: !!user,
    login: loginUser,
    logout: logoutUser,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
