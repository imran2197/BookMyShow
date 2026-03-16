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
  theatres: "/theatres",
  userSpecificTheatres: "/userSpecificTheatres",
};

export const SCREENING_ENDPOINTS = {
  screenings: "/screenings",
};
