import { BrowserProvider, hexlify } from "ethers";

// Ethereum provider (MetaMask)
export const getEthereumProvider = () => {
  if (typeof window.ethereum !== "undefined") {
    return new BrowserProvider(window.ethereum);
  } else {
    console.error("Please install MetaMask!");
    return null;
  }
};

// Get signer (used to sign transactions)
export const getSigner = async () => {
  const provider = getEthereumProvider();
  if (provider) {
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  }
  return null;
};

// Get the connected user's address
export const getUserAddress = async () => {
  const signer = await getSigner();
  if (signer) {
    const address = await signer.getAddress();
    return address;
  }
  return null;
};

// Check if the user has MetaMask installed
export const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== "undefined";
};

// Helper to switch network (e.g., to Rinkeby, Mainnet, etc.)
export const switchNetwork = async (networkId) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexlify(networkId) }],
    });
  } catch (error) {
    console.error("Failed to switch network", error);
  }
};
