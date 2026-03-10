import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router";
import AllMovies from "./pages/AllMovies/AllMovies";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMovies />} />
      </Routes>
    </Layout>
  );
};

export default App;
