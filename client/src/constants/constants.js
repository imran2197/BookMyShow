export const roles = [
  {
    label: "User",
    value: "User",
  },
  {
    label: "Partner",
    value: "Partner",
  },
];

export const MOVIE_ENDPOINTS = {
  addNewMovie: "/movies/add-movie",
  deleteMovie: "/movies/delete-movie",
  updateMovie: "/movies/update-movie",
  getAllMovies: "/movies/get-all-movies",
  getMovieById: "/movies",
};

export const USER_ENDPOINTS = {
  register: "/register",
  login: "/login",
  logout: "/logout",
  fetchProfile: "/fetchProfile",
};

export const THEATRE_ENDPOINTS = {
  addTheatre: "/add-theatre",
  updateTheatre: "/update-theatre",
  deleteTheatre: "/delete-theatre",

  getAllTheatres: "/get-all-theatres",
  getOwnerSpecificTheatres: "get-owner-specific-theatres",
  getTheatreById: "/get-theatre-by-id",
};
