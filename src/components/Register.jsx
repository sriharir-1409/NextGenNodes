import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import "../styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("freelancer"); // Default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore with the selected role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role, // Include the selected role
        createdAt: new Date(),
      });

      alert("Registration successful!");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message);
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="register-container">
      <h1>  Registeration Form</h1>
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <label htmlFor="role">Select Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="freelancer">Freelancer</option>
          <option value="company">Company</option>
        </select>
        <button type="submit" className="login-button">Register</button>
      </form>

      <div className="login-section">
        <p>Already have an account?</p>
        <button onClick={handleLoginClick}  className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Register;
