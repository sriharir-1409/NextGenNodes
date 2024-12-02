import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import TaskList from "./TaskList";
import Profile from "./Profile"; // Importing Profile component
import "../styles/FreelancerDashboard.css";

const FreelancerDashboard = () => {
  const [menuActive, setMenuActive] = useState(false); // State for managing mobile menu toggle
  const [activeSection, setActiveSection] = useState(null); // State to track active section (null means default view with buttons)
  const [testActive, setTestActive] = useState(false); // State to manage test state (whether test is active or not)
  const [userAnswer, setUserAnswer] = useState(""); // State for user's answer
  const [score, setScore] = useState(null); // State to store the score after test completion
  const navigate = useNavigate(); // Navigation hook for redirecting users

  // Predefined questions and answers for the test
  const questions = [
    {
      language: "JavaScript",
      question: "What is the output of the following code: `console.log(2 + '2')`?",
      correctAnswer: "'22'",
      explanation: "In JavaScript, adding a number and a string results in string concatenation.",
    },
  ];

  // Toggle menu visibility on small screens
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Function to handle link clicks to set active section and close the test
  const handleLinkClick = (section) => {
    setActiveSection(section);
    setTestActive(false);  // Close the test when a link is clicked
    setScore(null);         // Reset score when navigating to a new section
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication token
    localStorage.removeItem("role"); // Clear role if applicable
    navigate("/login"); // Redirect to login page
  };

  // Function to handle logo click to reset to default
  const handleLogoClick = () => {
    setActiveSection(null);
    setTestActive(false);
    setScore(null); // Reset score when logo is clicked
  };

  // Start the test when 'Test' button is clicked
  const handleTestStart = () => {
    setTestActive(true);
    setActiveSection(null);
  };

  // Function to check the user's answer and provide a score
  const handleSubmitAnswer = () => {
    const currentQuestion = questions[0];
    const correctAnswer = currentQuestion.correctAnswer;

    if (userAnswer === correctAnswer) {
      setScore(50); // Full correct answer: Expert
    } else if (userAnswer.trim().length > 0) {
      setScore(25); // Small mistakes: Intermediate
    } else {
      setScore(15); // Completely incorrect: Beginner
    }

    setTestActive(false); // End the test after submitting the answer
  };

  return (
    <div>
      {/* Sticky Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={handleLogoClick}>
          FreelancerHub
        </div>

        {/* Desktop Menu */}
        <ul className={`navbar-links ${menuActive ? "active" : ""}`}>
          <li>
            <a href="#profile" onClick={() => handleLinkClick("profile")}>
              Profile
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => handleLinkClick("projects")}>
              Projects
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => handleLinkClick("about")}>
              About
            </a>
          </li>
          <li>
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout(); // Ensure smooth logout and redirection
              }}
            >
              Logout
            </a>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      </nav>

      {/* Main Dashboard Container */}
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Freelancer Dashboard</h1>
          <p>Welcome back! Manage your tasks and explore opportunities.</p>
        </header>

        <div className="dashboard-content">
          {/* Render Profile Section */}
          {activeSection === "profile" && (
            <div id="profile" className="dashboard-card">
              <Profile />
            </div>
          )}

          {/* Render Projects Section */}
          {activeSection === "projects" && (
            <div id="projects" className="dashboard-card">
              <h2>Projects</h2>
              <p>Current Projects: 2</p>
              <p>Recent Submissions: 1</p>
            </div>
          )}

          {/* Render About Section */}
          {activeSection === "about" && (
            <div id="about" className="dashboard-card">
              <h2>About</h2>
              <p>
                This platform connects freelancers with opportunities to showcase
                their skills and manage tasks efficiently.
              </p>
            </div>
          )}

          {/* Default View with Quick Actions */}
          {activeSection === null && !testActive && (
            <div id="actions" className="dashboard-card">
              <h2>Quick Actions</h2>
              <button className="glass-button" onClick={handleTestStart}>
                Test
              </button>
              <button className="glass-button">Submit Portfolio</button>
            </div>
          )}

          {/* Test Modal */}
          {testActive && (
            <div id="test" className="dashboard-card">
              <h2>Test Your Skills</h2>
              <p>{questions[0].question}</p>
              <textarea
                placeholder="Write your code here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              ></textarea>
              <button className="glass-button" onClick={handleSubmitAnswer}>
                Submit Answer
              </button>
            </div>
          )}

          {/* Display Score after submission */}
          {score !== null && (
            <div id="score" className="dashboard-card">
              <h2>Your Score</h2>
              <p>Score: {score}/100</p>
              {score === 50 && <p>Great! You're an expert in this language.</p>}
              {score === 25 && (
                <p>You're an intermediate. A little more practice will make you an expert!</p>
              )}
              {score === 15 && <p>Beginner level. Keep practicing, you'll get better!</p>}
            </div>
          )}

          {/* Logout Section */}
        {activeSection === "logout" && (
          <div>
            <h1>Logout</h1>
            <p>You have successfully logged out.</p>
            <Link to="/">Go to Homepage</Link>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
