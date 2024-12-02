const TaskManager = artifacts.require("TaskManager");

contract("TaskManager", (accounts) => {
  it("should add a task", async () => {
    const taskManager = await TaskManager.deployed();
    await taskManager.addTask("Test Task", 100, { from: accounts[0] });

    const task = await taskManager.tasks(0);
    assert.equal(task.description, "Test Task", "Task description mismatch");
    assert.equal(task.reward.toNumber(), 100, "Task reward mismatch");
  });

  it("should assign a task", async () => {
    const taskManager = await TaskManager.deployed();
    await taskManager.assignTask(0, accounts[1], { from: accounts[0] });

    const task = await taskManager.tasks(0);
    assert.equal(task.assignedTo, accounts[1], "Task assignment failed");
  });

  it("should complete a task", async () => {
    const taskManager = await TaskManager.deployed();
    await taskManager.completeTask(0, { from: accounts[1] });

    const task = await taskManager.tasks(0);
    assert.isTrue(task.isComplete, "Task completion failed");
  });
});
