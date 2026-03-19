import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router";
import AllMovies from "./pages/AllMovies/AllMovies";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Admin from "./pages/Admin/Admin";
import Partner from "./pages/Partner/Partner";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/partner" element={<Partner />} />
      </Routes>
    </Layout>
  );
};

export default App;
