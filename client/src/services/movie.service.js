import axiosInstance from "../api/axiosInstance";
import { MOVIE_ENDPOINTS, SCREENING_ENDPOINTS } from "../constants/constants";

const fetchAllMovies = async () => {
  const response = await axiosInstance.get(MOVIE_ENDPOINTS.movies);
  return response.data;
};

const fetchMovieById = async (id) => {
  const response = await axiosInstance.get(`${MOVIE_ENDPOINTS.movies}/${id}`);
  return response.data;
};

const fetchTheatresByMovieId = async (id) => {
  const response = await axiosInstance.get(
    `${SCREENING_ENDPOINTS.screenings}/${id}`,
  );
  return response.data;
};

const fetchMoviesNotInScreenings = async (id) => {
  const response = await axiosInstance.get(
    `${MOVIE_ENDPOINTS.movies}${SCREENING_ENDPOINTS.screenings}/${id}`,
  );
  return response.data;
};

export {
  fetchAllMovies,
  fetchMovieById,
  fetchTheatresByMovieId,
  fetchMoviesNotInScreenings,
};
