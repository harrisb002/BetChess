import { ethers } from 'ethers';

const abi = [
  "event AccountCreated(address owner, uint256 indexed accountId, uint256 timestamp)",
  "event Deposit(address indexed user, uint256 value, uint256 timestamp)",
  "event GameCreated(uint256 gameId, uint256 betAmount, address player1, address player2, uint256 timestamp)",
  "event GameResult(uint256 gameId, address winner, uint256 timestamp)",
  "function accountGames(uint256, uint256) view returns (uint256 gameId, address player1, address player2, uint256 betAmount, address winner, uint256 timestamp)",
  "function accounts(uint256) view returns (address owner, uint256 balance)",
  "function approveBet(uint256 accountId, uint256 amount)",
  "function bet(uint256 accountId, uint256 amount)",
  "function createAccount(address newOwner)",
  "function deposit(uint256 accountId) payable",
  "function getAccounts() view returns ((address owner, uint256 balance)[])",
  "function getBalance(uint256 accountId) view returns (uint256)",
  "function getPreviousGames(uint256 accountId) view returns ((uint256 gameId, address player1, address player2, uint256 betAmount, address winner, uint256 timestamp)[])"
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