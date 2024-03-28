
const provider = new ethers.providers.Web3Provider(window.ethereum);

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
      "function getPreviousGames(uint256 accountId) view returns ((uint256 gameId, address player1, address player2, uint256 betAmount, address winner, uint256 timestamp)[])"
];

//Contract address
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//Store the contract instance once gained access to metamask from client
let contract = null;

async function getAccounts() {
    await getAccess();
    const result = await contract.getAccounts();
    document.getElementById("accounts").innerHTML = result;
}

// async function createAccount() {
//     await getAccess();
//     const owner = document.getElementById("owner").value.split(",").filter(n => n);

//     await contract.createAccount(owner).then(() => alert("Success"));
// }

// async function getAccess() {
//     if (contract) return;
//     await provider.send("eth_requestAccounts", []);
//     const signer = provider.getSigner();
//     contract = new ethers.Contract(address, abi, signer);

//     const eventDisplay = document.getElementById("events");

//     //Listen for event for this id (Defined in smart contract)
//     contract.on("AccountCreated", (owner, id, event) => {
//         eventDisplay.append(`Chess Account Created: ID = ${id}, Owner = ${owner}`);
//     })
// }
