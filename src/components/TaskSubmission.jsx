import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import taskManagerABI from "../contracts/TaskManager.json";
import "../styles/TaskSubmission.css";

const TaskSubmission = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState("");
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

      // Mark the task as completed
      const tx = await contract.completeTask(id);
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      alert("Task marked as completed!");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div>
      <h2>Submit Task {id}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          placeholder="Write your submission (optional)"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskSubmission;
