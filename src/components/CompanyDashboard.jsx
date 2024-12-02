import React, { useState, useEffect } from "react";
import { getTasks, createTask } from "../utils/contract";  // Import functions for interacting with the contract
import { Link } from "react-router-dom";  // For navigation
import "../styles/CompanyDashboard.css";  // Import custom styles

const CompanyDashboard = () => {
  const [tasks, setTasks] = useState([
    // Default project for testing (completed)
    {
      id: 1,
      name: "Project A",
      description: "This is a default project to test.",
      deadline: "2024-12-15", 
      status: "Completed",  // Default status as completed
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    deadline: "",
  });
  const [activeSection, setActiveSection] = useState("companyHub");  // Default section is "companyHub"
  const [segments, setSegments] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({ amount: "", method: "" });

  // Fetch tasks from the contract
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Calculate the number of projects and completed projects
  const totalProjects = tasks.length;
  const completedProjects = tasks.filter(task => task.status === "Completed").length;

  // Handle task creation
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createTask(newTask.name, newTask.description, newTask.deadline);
      alert("Task created successfully!");

      // Refresh tasks after creation
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      // Clear the form
      setNewTask({ name: "", description: "", deadline: "" });
    } catch (err) {
      setError("Failed to create task. Please try again.");
      console.error("Error creating task:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Segmentation
  const handleSegmentation = (taskId) => {
    const segmentCount = prompt("Enter number of segments (e.g., 5 or 6):");
    if (segmentCount && !isNaN(segmentCount) && segmentCount > 0) {
      const segmentArray = Array.from({ length: segmentCount }, (_, i) => ({
        segmentId: i + 1,
        taskId,
        status: "Not Started",
      }));
      setSegments(segmentArray);
    } else {
      alert("Please enter a valid number.");
    }
  };

  // Handle Payment Process
  const handlePaymentProcess = (e) => {
    e.preventDefault();
    alert(`Payment of ${paymentDetails.amount} via ${paymentDetails.method} is being processed.`);
    setPaymentDetails({ amount: "", method: "" }); // Clear payment details after processing
  };

  // Handle Navbar Section Changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <button className="btn" onClick={() => setActiveSection("companyHub")}>
            Company Hub
          </button>
        </div>
        <ul className="navbar-links">
          <li>
            <button className="btn" onClick={() => handleSectionChange("projects")}>
              Projects
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => handleSectionChange("segmentation")}>
              Segmentation
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => handleSectionChange("payment")}>
              Payment Process
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => handleSectionChange("logout")}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Dashboard */}
      <div className="dashboard-container">
        {/* Display default "Uploaded Project Progress" page when "Company Hub" is pressed */}
        {activeSection === "companyHub" && (
          <div>
            <h1>Company Hub</h1>
            <h2>Uploaded Project Progress</h2>
            <p>Total Projects: {totalProjects}</p>
            <p>Completed Projects: {completedProjects}</p>

            {/* Projects List */}
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className="task-card">
                  <h3 className="task-title">Project: {task.name}</h3>
                  <p className="task-description">{task.description}</p>
                  <p className="task-deadline">
                    <strong>Deadline:</strong> {task.deadline}
                  </p>
                  <p className="task-status">
                    <strong>Status:</strong> {task.status}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show "Upload Project Details" form when "Projects" is pressed */}
        {activeSection === "projects" && (
          <div>
            <h1>Upload Project Details</h1>
            <form className="company-form" onSubmit={handleCreateTask}>
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={newTask.name}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={newTask.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <input
                type="date"
                name="deadline"
                value={newTask.deadline}
                onChange={handleInputChange}
                required
              />
              <button type="submit" disabled={loading} className="btn1">
                {loading ? "Uploading..." : "Upload Project"}
              </button>
            </form>

            {/* Table displaying the projects */}
            <h2>All Projects</h2>
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.deadline}</td>
                    <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Segmentation Section */}
        {activeSection === "segmentation" && (
          <div className="ov1">
            <h1>Segmentation</h1>
            <h2>Divide Project into Segments</h2>
            <ul className="hov1">
              {tasks.map((task) => (
                <li key={task.id}>
                  <h3>{task.name}</h3>
                  <button onClick={() => handleSegmentation(task.id)} className="btn1">
                    Segment Project
                  </button>
                </li>
              ))}
            </ul>
            {segments.length > 0 && (
              <div>
                <h3>Segments</h3>
                <ul>
                  {segments.map((segment) => (
                    <li key={segment.segmentId}>
                      Segment {segment.segmentId} - Status: {segment.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Payment Process Section */}
        {activeSection === "payment" && (
          <div>
            <h1>Payment Process</h1>
            <form className="company-form" onSubmit={handlePaymentProcess}>
              <h2>Enter Payment Details</h2>
              <input
                className="input"
                type="text"
                placeholder="Amount"
                value={paymentDetails.amount}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Payment Method"
                value={paymentDetails.method}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, method: e.target.value })}
                required
              />
              <button type="submit" className="btn1">
                Process Payment
              </button>
            </form>
          </div>
        )}

        {/* Logout Section */}
        {activeSection === "logout" && (
          <div>
            <h1>Logout</h1>
            <p>You have been logged out successfully.</p>
            <Link to="/" className="btn1">Go to Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
