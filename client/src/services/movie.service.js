import axiosInstance from "../api/axiosInstance";
import { MOVIE_ENDPOINTS } from "../constants/movie.constants";

const fetchAllMovies = () => {
  return axiosInstance.get(MOVIE_ENDPOINTS.allMovies);
};

export { fetchAllMovies };
