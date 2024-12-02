import { ethers } from "ethers";  // Import ethers.js to interact with MetaMask

const handleCreateTask = async (e) => {
  e.preventDefault();
  
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed. Please install it to interact with the blockchain.");
    return;
  }

  try {
    // Requesting MetaMask to connect
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Set up the provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Set up the contract instance
    const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
    const contractABI = [  // Replace with your contract ABI
      "function createTask(string name, string description, string deadline) public"
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    setLoading(true);
    
    // Calling the createTask function on the blockchain
    const tx = await contract.createTask(newTask.name, newTask.description, newTask.deadline, {
      gasLimit: 100000,  // Set an appropriate gas limit
    });

    // Wait for the transaction to be mined
    await tx.wait();

    alert("Task created successfully! Gas fees have been charged.");

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
