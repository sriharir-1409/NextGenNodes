// src/contracts/TaskContract.js
import { ethers } from "ethers";
import contractABI from "../smart_contracts/build/contracts/TaskManager.json";  // You should provide the correct ABI

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";  // Add the contract address after deploying it

export const TaskContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  // Function to create a new task
  const createTask = async (taskName, taskDescription, deadline) => {
    try {
      const tx = await contract.createTask(taskName, taskDescription, deadline);
      await tx.wait();
      console.log("Task Created:", tx);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Function to submit a task (freelancer submitting a task)
  const submitTask = async (taskId, submissionData) => {
    try {
      const tx = await contract.submitTask(taskId, submissionData);
      await tx.wait();
      console.log("Task Submitted:", tx);
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  return { createTask, submitTask };
};
