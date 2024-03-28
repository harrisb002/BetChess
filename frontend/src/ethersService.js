import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
const provider = new Web3Provider(window.ethereum);
console.log("The provider is", provider);

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
const address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

//Store the contract instance once gained access to metamask from client
let contract = null;

export async function createAccount(owner) {
  await getAccess();
  const owners = document.getElementById("owners").value.split(",").filter(n => n);
  await contract.createAccount(owners).then(() => alert("Success"));
}

export async function getAccounts() {
  await getAccess();
  console.log
  const result = await contract.getAccounts();
  document.getElementById("accounts").innerHTML = result;
}

export async function getAccess() {
  if (contract) return;
  console.log("The contract is", contract)

  await provider.send("eth_requestAccounts", []);
  
  const signer = provider.getSigner();

  console.log("The signer is", signer)

  contract = new ethers.Contract(address, abi, signer);
  console.log("The contract is", contract)


  const eventDisplay = document.getElementById("events");

  //Listen for event for this id (Defined in smart contract)
  contract.on("AccountCreated", (owner, id, timestamp) => {
      eventDisplay.append(`Account Created: ID = ${id}, Owner = ${owner}, Timestamp = ${timestamp}`);
  })
}