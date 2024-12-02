// src/pages/About.js
import React from "react";
import '../styles/About.css';
import { FaShieldAlt, FaUserCheck, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-intro">
          Welcome to our platform, where confidentiality meets collaboration. We redefine the way companies and freelancers work together, ensuring secure, seamless, and impactful outcomes.
        </p>
      </header>

      <section className="about-features">
        <div className="feature-card">
          <FaShieldAlt className="feature-icon" />
          <h3>Confidentiality</h3>
          <p>Projects are segmented and protected to maintain the highest level of security and privacy.</p>
        </div>
        <div className="feature-card">
          <FaUserCheck className="feature-icon" />
          <h3>Credibility</h3>
          <p>Freelancers are screened and reviewed to ensure quality and reliability for every task.</p>
        </div>
        <div className="feature-card">
          <FaHandshake className="feature-icon" />
          <h3>Trust</h3>
          <p>Building a trusted platform where companies confidently outsource confidential work.</p>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Join Us Today</h2>
        <p>Be part of a revolution in freelancing and secure collaboration. Start your journey with us!</p>
        <button className="cta-button">Get Started</button>
      </section>
    </div>
  );
};

export default About;
