// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Freelance Platform</h1>
      <p>Find and complete confidential projects securely.</p>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
