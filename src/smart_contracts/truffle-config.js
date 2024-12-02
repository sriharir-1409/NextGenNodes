module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost (default: none)
      port: 7545,         // The port Ganache is running on (default: 8545)
      network_id: "5777",    // Match any network id
      gas: 6721975,       // Gas limit (default: 6721975)
      gasPrice: 20000000000, // Gas price (default: 20000000000)
    },
  },

  compilers: {
    solc: {
      version: "^0.8.20",  // Version of Solidity to use (change as needed)
    },
  },          
};
