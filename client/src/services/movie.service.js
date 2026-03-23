import axiosInstance from "../api/axiosInstance";
import { MOVIE_ENDPOINTS } from "../constants/constants";

const addNewMovie = async (values) => {
  const response = await axiosInstance.post(
    MOVIE_ENDPOINTS.addNewMovie,
    values,
  );
  return response.data;
};

const deleteMovie = async (id) => {
  const response = await axiosInstance.delete(
    `${MOVIE_ENDPOINTS.deleteMovie}/${id}`,
  );
  return response.data;
};

const updateMovie = async (values) => {
  const response = await axiosInstance.put(MOVIE_ENDPOINTS.updateMovie, values);
  return response.data;
};

const fetchAllMovies = async () => {
  const response = await axiosInstance.get(MOVIE_ENDPOINTS.getAllMovies);
  return response.data;
};

const fetchMovieById = async (id) => {
  const response = await axiosInstance.get(
    `${MOVIE_ENDPOINTS.getMovieById}/${id}`,
  );
  return response.data;
};

export {
  addNewMovie,
  deleteMovie,
  updateMovie,
  fetchAllMovies,
  fetchMovieById,
};
