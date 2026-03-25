import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router";
import AllMovies from "./pages/AllMovies/AllMovies";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Admin from "./pages/Admin/Admin";
import Partner from "./pages/Partner/Partner";
import Show from "./pages/Partner/Show/Show";
import BookShow from "./pages/BookShow/BookShow";
import Checkout from "./pages/Payment/Checkout";
import PaymentReturn from "./pages/Payment/PaymentReturn";
import MyBookings from "./pages/MyBookings/MyBookings";

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
        <Route path="/partner/shows" element={<Show />} />
        <Route path="/book-show/:id" element={<BookShow />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/return" element={<PaymentReturn />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Layout>
  );
};

export default App;
