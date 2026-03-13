import axiosInstance from "../api/axiosInstance";
import { THEATRE_ENDPOINTS } from "../constants/constants";

const createTheatre = async (newTheatre) => {
  const response = await axiosInstance.post(
    THEATRE_ENDPOINTS.theatres,
    newTheatre,
  );
  return response.data;
};

const getAllTheatres = async () => {
  const response = await axiosInstance.get(THEATRE_ENDPOINTS.theatres);
  return response.data;
};

export { createTheatre, getAllTheatres };
