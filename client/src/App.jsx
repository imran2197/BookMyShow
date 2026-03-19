import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router";
import AllMovies from "./pages/AllMovies/AllMovies";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import AddEditTheatre from "./pages/AddEditTheatre/AddEditTheatre";
import MyTheatres from "./pages/MyTheatres/MyTheatres";
import TheatreDetails from "./pages/TheatreDetails/TheatreDetails";
import Admin from "./pages/Admin/Admin";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/addTheatre" element={<AddEditTheatre />} />
        <Route path="/editTheatre" element={<AddEditTheatre />} />
        <Route path="/myTheatres" element={<MyTheatres />} />
        <Route path="/theatres/:id" element={<TheatreDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
};

export default App;
