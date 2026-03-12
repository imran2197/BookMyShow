import axiosInstance from "../api/axiosInstance";
import { MOVIE_ENDPOINTS } from "../constants/constants";

const fetchAllMovies = async () => {
  const response = await axiosInstance.get(MOVIE_ENDPOINTS.allMovies);
  return response.data;
};

export { fetchAllMovies };
