import React, { useState, useEffect, useRef } from "react";
import {
  getDatabase,
  ref,
  set,
  get,
} from "firebase/database"; // Firebase Realtime Database
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage"; // Firebase Storage
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Authentication
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2"; // Import the Bar component for graph rendering
import "../styles/Profile.css";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    language: "",
    projectsCompleted: 0,
    projectsInProgress: 0,
    totalEarnings: 0,
  });
  const [resume, setResume] = useState(null);
  const [user, setUser] = useState(null); // For authentication
  const chartRef = useRef(null);
  let chartInstance;

  // Check authentication and fetch profile data
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch profile data
        const profileRef = ref(db, `users/${currentUser.uid}/profile`);
        get(profileRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setProfile(snapshot.val());
            }
          })
          .catch((error) => console.error("Error fetching profile:", error));
      } else {
        setUser(null); // User is not logged in
      }
    });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle resume upload
  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  // Save profile data to Firebase
  const saveProfile = async () => {
    if (!user) {
      alert("Please log in to save your profile.");
      return;
    }
  
    const db = getDatabase();
    const profileRef = ref(db, `users/${user.uid}/profile`);
  
    try {
      console.log("Saving profile data:", profile); // Debug log
      await set(profileRef, profile);
  
      if (resume) {
        const storage = getStorage();
        const resumeRef = storageRef(storage, `resumes/${user.uid}/${resume.name}`);
        await uploadBytes(resumeRef, resume);
        console.log("Resume uploaded successfully"); // Debug log
      }
  
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error); // Error log
      alert("There was an error saving your profile. Please try again.");
    }
  };
  
  // Generate graph data dynamically based on profile
  const graphData = {
    labels: ["JavaScript", "Python", "Java", "C++", "Ruby"], // Example languages
    datasets: [
      {
        label: "Projects",
        data: [
          profile.language === "JavaScript" ? 12 : 0,
          profile.language === "Python" ? 8 : 0,
          profile.language === "Java" ? 5 : 0,
          profile.language === "C++" ? 3 : 0,
          profile.language === "Ruby" ? 2 : 0,
        ], // Dynamic data based on profile
        backgroundColor: ["#f39c12", "#8e44ad", "#3498db", "#2ecc71", "#e74c3c"],
      },
    ],
  };

  return user ? (
    <div className="profile-container">
      <h1>Profile</h1>
      <form className="profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={profile.language}
            onChange={handleChange}
            placeholder="Enter your preferred language"
          />
        </label>
        <label>
          Projects Completed:
          <input
            type="number"
            name="projectsCompleted"
            value={profile.projectsCompleted}
            readOnly
            placeholder="Projects completed"
          />
        </label>
        <label>
          Projects In Progress:
          <input
            type="number"
            name="projectsInProgress"
            value={profile.projectsInProgress}
            readOnly
            placeholder="Projects in progress"
          />
        </label>
        <label>
          Total Earnings:
          <input
            type="number"
            name="totalEarnings"
            value={profile.totalEarnings}
            readOnly
            placeholder="Total earnings"
          />
        </label>
        <label>
          Upload Resume:
          <input type="file" onChange={handleResumeUpload} />
        </label>
      </form>
      <button className="save-button" onClick={saveProfile}>
        Save Profile
      </button>
      <div className="profile-graph">
        <h2>Language-Based Projects</h2>
        <Bar data={graphData} />
      </div>
    </div>
  ) : (
    <div>Please log in to view your profile.</div>
  );
};

export default Profile;
