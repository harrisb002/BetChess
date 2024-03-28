import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
const provider = new Web3Provider(window.ethereum);

const abi = [
  "event AccountCreated(address owner, uint256 indexed id, uint256 timestamp)",
  "event Deposit(address indexed user, uint256 value, uint256 timestamp)",
  "function accountGames(uint256, uint256) view returns (uint256 gameId, address player1, address player2, uint256 betAmount, address winner, uint256 timestamp)",
  "function accounts(uint256) view returns (address owner, uint256 balance)",
  "function approveBet(uint256 accountId, uint256 amount)",
  "function bet(uint256 accountId, uint256 amount)",
  "function createAccount(address[] newOwner)",
  "function deposit(uint256 accountId) payable",
  "function getAccounts() view returns (uint256[])",
  "function getBalance(uint256 accountId) view returns (uint256)",
  "function getPreviousGames(uint256 accountId) view returns ((uint256 gameId, address player1, address player2, uint256 betAmount, address winner, uint256 timestamp)[])",
];

//Contract address
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//Store the contract instance once gained access to metamask from client
let contract = null;

async function getProviderOrSigner(signer = false) {
  await provider.send("eth_requestAccounts", []); // Request access
  return signer ? provider.getSigner() : provider;
}

export async function getContract(signer = false) {
  if (!contract) {
    const providerOrSigner = await getProviderOrSigner(signer);
    contract = new ethers.Contract(address, abi, providerOrSigner);
  }
  return contract;
}

export async function createAccount(owner) {
  const contractWithSigner = await getContract(true);
  const tx = await contractWithSigner.createAccount(owner);
  return tx.wait(); // Wait for transaction to be mined
}

export async function getAccounts() {
  const contract = await getContract();
  return contract.getAccounts();
}
