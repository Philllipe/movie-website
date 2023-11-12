import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// Pages
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Person from "./pages/Person";
// Components
import { NavbarMain } from "./components/Navbar";
import { Footer } from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/person" element={<Person />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="*"
          element={<h1 className="error">Error 404: Not Found</h1>}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
