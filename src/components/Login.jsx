import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import "../styles/Login.css";

// Import the dashboard components
import FreelancerDashboard from "../components/FreelancerDashboard";
import CompanyDashboard from "../components/CompanyDashboard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);  // Track the user's role
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track if user is logged in
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User Data:", userData);

        // Set role and authentication state
        setRole(userData.role);
        setIsAuthenticated(true);

        alert(`Welcome, ${userData.email}`);
      } else {
        alert("User data not found in Firestore!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message); // Display any errors encountered
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");  // Navigate to the registration page
  };

  return (
    <div className="login-container">
      {!isAuthenticated ? (
        <>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="register-button">Login</button>
          </form>
          <div className="register-section">
            <p>New to the platform?</p>
            <button onClick={handleRegisterClick} className="register-button">Register</button>
          </div>
        </>
      ) : (
        // Render the dashboard based on the user's role
        <div className="dashboard-content">
          {role === "company" ? (
            <CompanyDashboard /> // Render Company Dashboard component
          ) : role === "freelancer" ? (
            <FreelancerDashboard /> // Render Freelancer Dashboard component
          ) : (
            <h2>Role not specified. Redirecting...</h2>
            // Optionally, you could set a timeout to navigate away
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
