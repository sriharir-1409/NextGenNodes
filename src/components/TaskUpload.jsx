import React, { useState } from "react";
import { ethers } from "ethers";
import taskManagerABI from "../contracts/TaskManager.json"; // Import the ABI
import "../styles/TaskUpload.css";

const TaskUpload = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState(""); // Reward in ETH
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your deployed contract address

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) {
        alert("MetaMask is required to interact with the blockchain!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, taskManagerABI.abi, signer);

      // Add task to the blockchain
      const tx = await contract.addTask(description, ethers.utils.parseEther(reward));
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      alert("Task uploaded successfully!");
    } catch (error) {
      console.error("Error uploading task:", error);
    }
  };

  return (
    <div>
      <h2>Upload New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Reward in ETH"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          required
        />
        <button type="submit">Upload Task</button>
      </form>
    </div>
  );
};

export default TaskUpload;
