import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router";
import AllMovies from "./pages/AllMovies/AllMovies";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import AddTheatre from "./pages/AddTheatre/AddTheatre";
import AllTheatres from "./pages/AllTheatres/AllTheatres";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/addTheatre" element={<AddTheatre />} />
        <Route path="/AllTheatres" element={<AllTheatres />} />
      </Routes>
    </Layout>
  );
};

export default App;
