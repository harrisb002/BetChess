import { ethers } from 'ethers';

const abi = [
  "event AccountCreated(address indexed owner, uint256 accountId, uint256 timestamp)",
  "function accounts(uint256) view returns (address owner, string userName, uint256 balance)",
  "function createAccount(string userName)",
  "function getAccountInfo(uint256 accountId) view returns (string userName, uint256 balance)",
  "function getAccounts() view returns (uint256[])",
  "function getAllAccounts() view returns ((address owner, string userName, uint256 balance)[])",
  "function members(address) view returns (bool)",
  "function updateAccountInfo(uint256 accountId, string newUserName, uint256 newBalance)",
  "function userAccounts(address, uint256) view returns (uint256)"
];

//Contract address
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const connect = async () => {
  await provider.send("eth_requestAccounts", []);
  return getContract();
};

export const getContract = async () => {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return { signer: signer, contract: contract };
};