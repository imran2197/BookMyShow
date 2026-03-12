import axiosInstance from "../api/axiosInstance";
import { USER_ENDPOINTS } from "../constants/constants";

const register = async (newUser) => {
  const response = await axiosInstance.post(USER_ENDPOINTS.register, newUser);
  return response.data;
};

const login = async (userCredentials) => {
  const response = await axiosInstance.post(
    USER_ENDPOINTS.login,
    userCredentials,
  );
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.get(USER_ENDPOINTS.logout);
  return response.data;
};

const fetchProfile = async () => {
  const response = await axiosInstance.get(USER_ENDPOINTS.fetchProfile);
  return response.data;
};

export { register, login, logout, fetchProfile };
