import axiosInstance from "../api/axiosInstance";
import { SCREENING_ENDPOINTS } from "../constants/constants";

const createScreening = async (values) => {
  const response = await axiosInstance.post(
    SCREENING_ENDPOINTS.screenings,
    values,
  );
  return response.data;
};

const getScreensByMovieId = async (id) => {
  const response = await axiosInstance.get(
    `${SCREENING_ENDPOINTS.screenings}/${id}`,
  );
  return response.data;
};

export { createScreening, getScreensByMovieId };
