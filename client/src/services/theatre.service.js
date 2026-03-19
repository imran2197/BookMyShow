import axiosInstance from "../api/axiosInstance";
import { THEATRE_ENDPOINTS } from "../constants/constants";

const addTheatre = async (newTheatre) => {
  const response = await axiosInstance.post(
    THEATRE_ENDPOINTS.addTheatre,
    newTheatre,
  );
  return response.data;
};

const updateTheatre = async (payload) => {
  const response = await axiosInstance.put(
    THEATRE_ENDPOINTS.updateTheatre,
    payload,
  );
  return response.data;
};

const deleteTheatre = async (id) => {
  const response = await axiosInstance.delete(
    `${THEATRE_ENDPOINTS.deleteTheatre}/${id}`,
  );
  return response.data;
};

const getAllTheatres = async () => {
  const response = await axiosInstance.get(THEATRE_ENDPOINTS.getAllTheatres);
  return response.data;
};

const getOwnerSpecificTheatres = async (id) => {
  const response = await axiosInstance.get(
    `${THEATRE_ENDPOINTS.getOwnerSpecificTheatres}/${id}`,
  );
  return response.data;
};

const getTheatreById = async (id) => {
  const response = await axiosInstance.get(
    `${THEATRE_ENDPOINTS.getTheatreById}/${id}`,
  );
  return response.data;
};

export {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getOwnerSpecificTheatres,
  getTheatreById,
};
