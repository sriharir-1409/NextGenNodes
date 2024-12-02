import React, { useState, useEffect } from "react";
import { isMetaMaskInstalled } from "./utils/blockchain";
import CompanyDashboard from "./components/CompanyDashboard";
import FreelancerDashboard from "./components/FreelancerDashboard";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";

import "./App.css";

// Define a component that uses the `useNavigate` hook
const AppContent = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate here

  useEffect(() => {
    // Check if MetaMask is installed
    setIsMetaMaskAvailable(isMetaMaskInstalled());
  }, []);

  const handleLogin = ({ address, role }) => {
    setUserAddress(address);
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserAddress(null); // Clear user address state
    setUserRole(null);    // Clear user role state
    localStorage.removeItem("authToken"); // Clear any stored authentication tokens (if used)
    //navigate("/login"); 
    
    setTimeout(() => {
      navigate("/login");
    }, 2000);// Redirect to login page
  };

  const renderDashboard = () => {
    if (!isMetaMaskAvailable) {
      return (
        <div className="error-message">
          <h2>Please install MetaMask to continue.</h2>
        </div>
      );
    }

    if (!userAddress) {
      return <Navigate to="/login" replace />;
    }

    if (!userRole) {
      return (
        <div className="error-message">
          <h2>User role not defined. Please log in again.</h2>
        </div>
      );
    }

    // Render the dashboard based on the user's role
    return userRole === "company" ? (
      <CompanyDashboard />
    ) : userRole === "freelancer" ? (
      <FreelancerDashboard />
    ) : (
      <div className="error-message">
        <h2>Invalid user role detected. Please log in again.</h2>
      </div>
    );
  };

  return (
    <div>
      {/* Show the Navbar if logged in */}
      {/*userAddress && <Navbar onLogout={handleLogout} />*/}

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={!userAddress ? <Home /> : <Navigate to="/dashboard" replace />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            !userAddress ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !userAddress ? (
              <Register />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Protected route for dashboard */}
        <Route
          path="/dashboard"
          element={
            userAddress ? (
              renderDashboard()
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
         <Route 
            path="/logout" 
               element={
                userAddress ?(
                  <Logout onLogout={handleLogout} />
                ):(
                  <Navigate to="/login" replace />
            )}
          />
        {/* Catch-all route */}
       {/*  <Route path="/logout" element={<Logout onLogout={handleLogout} />} />*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

// Wrap the AppContent in a Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
