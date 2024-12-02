import React, { useState, useEffect } from "react";
import { ethers } from "ethers"; // Correct direct import for ethers
import { Link } from "react-router-dom";
import taskManagerABI from "../smart_contracts/build/contracts/TaskManager.json"; // Ensure this file exists
import "../styles/TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your deployed contract address

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!window.ethereum) {
          alert("MetaMask is required to interact with the blockchain!");
          return;
        }

        // Initialize ethers provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, taskManagerABI.abi, signer);

        // Fetch task count (assuming the contract has a `getTaskCount` function)
        const taskCount = await contract.getTaskCount(); // Replace with actual method if different
        const fetchedTasks = [];

        // Fetch each task details
        for (let i = 0; i < taskCount; i++) {
          const task = await contract.getTask(i); // Replace with actual method if different
          fetchedTasks.push({
            id: i,
            description: task.description,
            reward: ethers.formatEther(task.reward), // Corrected method for formatting ETH value
            isComplete: task.isComplete,
          });
        }

        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li className="task-list-item" key={task.id}>
            <span>{task.description}</span> - <span>{task.reward} ETH</span>
            <span>{task.isComplete ? "Completed" : "Pending"}</span>
            <Link to={`/task-submission/${task.id}`}>
              <button className="task-list-button">Submit Task</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
