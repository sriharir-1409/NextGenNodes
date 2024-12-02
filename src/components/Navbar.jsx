import React, { useState } from "react";
import { Link } from "react-router-dom"; // Only import Link
import { isMetaMaskInstalled } from "../utils/blockchain";
import '../styles/Navbar.css';

const Navbar = ({ onLogout }) => { // Accept onLogout as a prop
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") ? true : false);
  const [menuActive, setMenuActive] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    if (onLogout) onLogout(); // Call the parent-provided logout function
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav>
      <div className="logo">Logo</div>

      {/* Desktop Menu */}
      <ul className={`desktop-menu ${menuActive ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {!isMetaMaskInstalled() && (
          <li><span>Please install MetaMask!</span></li>
        )}
        {isAuthenticated && (
           <Link to="/logout">Logout</Link>
          
        )}
      </ul>

      {/* Hamburger Menu Button */}
      <button className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </button>

      {/* Mobile Menu */}
      <div className={`menu ${menuActive ? "active" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          {!isMetaMaskInstalled() && (
            <li><span>Please install MetaMask!</span></li>
          )}
          {isAuthenticated && (
             <Link to="/logout">Logout</Link>
          
          )}
        </ul>
      </div>
    </nav>
  );
};
 {/* <li><button onClick={handleLogout}>
              Logout
            </button></li>*/}
            {/*<li><button onClick={handleLogout}>Logout</button></li>*/}

export default Navbar;
