import axiosInstance from "../api/axiosInstance";
import { THEATRE_ENDPOINTS } from "../constants/constants";

const createTheatre = async (newTheatre) => {
  const response = await axiosInstance.post(
    THEATRE_ENDPOINTS.theatres,
    newTheatre,
  );
  return response.data;
};

const getMyTheatres = async () => {
  const response = await axiosInstance.get(
    THEATRE_ENDPOINTS.userSpecificTheatres,
  );
  return response.data;
};

const getTheatreById = async (id) => {
  const response = await axiosInstance.get(
    `${THEATRE_ENDPOINTS.theatres}/${id}`,
  );
  return response.data;
};

export { createTheatre, getMyTheatres, getTheatreById };
