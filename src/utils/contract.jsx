// src/utils/contract.js
import { ethers } from "ethers";
import { getSigner } from "./blockchain";

// The ABI (Application Binary Interface) of the smart contract
import contractABI from '../smart_contracts/build/contracts/TaskManager.json';

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS"; 

// Create contract instance
export const getContractInstance = async () => {
  try {
    const signer = await getSigner();
    if (signer) {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      return contract;
    } else {
      throw new Error("No signer available");
    }
  } catch (err) {
    console.error("Error getting contract instance:", err);
    return null;
  }
};

// Function to create a new task (only accessible by companies)
export const createTask = async (taskName, taskDescription, deadline) => {
  try {
    const contract = await getContractInstance();
    if (contract) {
      const tx = await contract.createTask(taskName, taskDescription, deadline);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Task Created:", tx);
      return tx;
    } else {
      throw new Error("No contract instance available");
    }
  } catch (err) {
    console.error("Error creating task:", err);
    throw err;
  }
};

// Function to submit a task (for freelancers submitting completed tasks)
export const submitTask = async (taskId, submissionData) => {
  try {
    const contract = await getContractInstance();
    if (contract) {
      const tx = await contract.submitTask(taskId, submissionData);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Task Submitted:", tx);
      return tx;
    } else {
      throw new Error("No contract instance available");
    }
  } catch (err) {
    console.error("Error submitting task:", err);
    throw err;
  }
};

// Function to fetch the list of tasks
export const getTasks = async () => {
  try {
    const contract = await getContractInstance();
    if (contract) {
      const tasks = await contract.getAllTasks();
      return tasks;
    } else {
      throw new Error("No contract instance available");
    }
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};