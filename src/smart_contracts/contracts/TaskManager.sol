// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        string description;
        uint256 reward;
        bool isComplete;
        address assignedTo;
    }

    Task[] public tasks;
    address public owner;

    mapping(address => uint256) public gasCredits; // To store gas credits for freelancers/companies.

    event TaskAdded(uint256 taskId, string description, uint256 reward);
    event TaskAssigned(uint256 taskId, address freelancer);
    event TaskCompleted(uint256 taskId, address freelancer);
    event GasCreditsAdded(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Add gas credits to a freelancer or company account.
    function addGasCredits(address user, uint256 amount) public {
        require(msg.sender == owner, "Only owner can add gas credits");
        gasCredits[user] += amount;
        emit GasCreditsAdded(user, amount);
    }

    // Deduct gas credits from the user.
    function useGasCredits(address user, uint256 amount) internal {
        require(gasCredits[user] >= amount, "Not enough gas credits");
        gasCredits[user] -= amount;
    }

    // Add a new task. Owner only.
    function addTask(string memory _description, uint256 _reward) public {
        require(msg.sender == owner, "Only owner can add tasks");
        tasks.push(Task(_description, _reward, false, address(0)));

        // Owner receives gas credit deduction benefit.
        if (gasCredits[msg.sender] > 0) {
            useGasCredits(msg.sender, _reward);
        }

        emit TaskAdded(tasks.length - 1, _description, _reward);
    }

    // Assign a task to a freelancer. Owner only.
    function assignTask(uint256 taskId, address freelancer) public {
        require(msg.sender == owner, "Only owner can assign tasks");
        Task storage task = tasks[taskId];
        require(!task.isComplete, "Task already completed");
        task.assignedTo = freelancer;

        emit TaskAssigned(taskId, freelancer);
    }

    // Complete a task. Freelancer only.
    function completeTask(uint256 taskId) public {
        Task storage task = tasks[taskId];
        require(msg.sender == task.assignedTo, "Only assigned freelancer can complete task");
        require(!task.isComplete, "Task already completed");
        task.isComplete = true;

        // Freelancer receives gas credit deduction benefit.
        if (gasCredits[msg.sender] > 0) {
            useGasCredits(msg.sender, task.reward);
        }

        emit TaskCompleted(taskId, msg.sender);
    }

    // Get task details.
    function getTask(uint256 taskId) public view returns (string memory, uint256, bool, address) {
        Task storage task = tasks[taskId];
        return (task.description, task.reward, task.isComplete, task.assignedTo);
    }

    // Add funds to the contract (e.g., for subsidizing gas credits).
    function fundContract() public payable {}

    // Withdraw funds from the contract. Owner only.
    function withdrawFunds(uint256 amount) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(address(this).balance >= amount, "Insufficient contract balance");
        payable(owner).transfer(amount);
    }
}
