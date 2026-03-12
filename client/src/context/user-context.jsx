import { createContext, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { fetchProfile, login, logout } from "../services/user.service";
import { useNavigate } from "react-router";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  const navigate = useNavigate();

  const {
    data: loginData,
    error: loginError,
    isLoading: isLoginLoading,
    sendRequest: sendLoginRequest,
  } = useHttp(login, false);

  const {
    data: logoutData,
    error: logoutError,
    isLoading: isLogoutLoading,
    sendRequest: sendLogoutRequest,
  } = useHttp(logout, false);

  const {
    data: profile,
    error: profileError,
    isLoading: isProfileLoading,
    sendRequest: sendFetchProfileRequest,
  } = useHttp(fetchProfile, false);

  useEffect(() => {
    sendFetchProfileRequest();
  }, []);

  const loginUser = (userCreds) => {
    sendLoginRequest(userCreds);
  };

  const logoutUser = () => {
    sendLogoutRequest();
  };

  const context = {
    user: profile,
    isAuthenticated: profile ? true : false,
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
