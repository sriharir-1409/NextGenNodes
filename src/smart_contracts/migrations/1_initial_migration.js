const MyContract = artifacts.require("MyContract");

module.exports = async function (deployer, network, accounts) {
  // Deploy the smart contract to the blockchain
  await deployer.deploy(MyContract);

  // Get the deployed contract instance
  const myContractInstance = await MyContract.deployed();

  console.log(`MyContract deployed at address: ${myContractInstance.address}`);
};
