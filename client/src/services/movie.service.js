import axiosInstance from "../api/axiosInstance";
import { MOVIE_ENDPOINTS } from "../constants/constants";

const fetchAllMovies = async () => {
  const response = await axiosInstance.get(MOVIE_ENDPOINTS.movies);
  return response.data;
};

const fetchMovieById = async (id) => {
  const response = await axiosInstance.get(`${MOVIE_ENDPOINTS.movies}/${id}`);
  return response.data;
};

export { fetchAllMovies, fetchMovieById };
