//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
    This contract will support users to posses a chess account
    - Account will have games attached to it
    - Account will have balance attached to it to bet in games played
    - Account will allow owner to deposit 'money' to stake against games
    - Account will allow owner to create new games against others who also posses a betChess account
    - Only allows games to be played with thoe who have a positive balance on their account
    - Only allows games to be played if the user posses a balance sufficient for the amount staked on
*/

contract ChessAccount {
    event Deposit(address indexed user, uint256 value, uint256 timestamp);
    event AccountCreated(
        address owner,
        uint256 indexed accountId,
        uint256 timestamp
    );
    event GameCreated(
        uint256 gameId,
        uint256 betAmount,
        address player1,
        address player2,
        uint256 timestamp
    );
    event GameResult(uint256 gameId, address winner, uint256 timestamp);

    modifier onlyAccountOwner(uint256 accountId) {
        require(
            accounts[accountId].owner == msg.sender,
            "Not the account owner"
        );
        _;
    }

    struct Account {
        address owner;
        uint balance;
    }

    struct Game {
        uint gameId;
        address player1;
        address player2;
        uint betAmount;
        address winner; // Will use address(0) to represent a draw/tie
        uint timestamp;
    }

    mapping(uint => Account) public accounts; // Account ID to Account
    mapping(uint => Game[]) public accountGames; // Account ID to list of games
    mapping(address => uint[]) previousPlayedUsers; // Stores the ID's of the chess accounts for each completed game associated with each user

    uint256 private nextAccountId = 1; // Inc so that each new account has a unique ID attached to it
    uint private nextGameId = 1; // Inc so that each new game has a unique ID attached to it

    // Allows account owner to deposit funds into his/her account
    function deposit(
        uint accountId
    ) external payable onlyAccountOwner(accountId) {
        accounts[accountId].balance += msg.value;
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    // The person who calls this will become the owner of this account
    function createAccount(address newOwner) external {
        uint256 accountId = nextAccountId++;
        accounts[accountId] = Account({owner: newOwner, balance: 0});
        emit AccountCreated(msg.sender, accountId, block.timestamp);
    }

    // Proposes an amount for a game to be played
    function bet(uint accountId, uint amount) external {}

    // Once game is approved then will be allowed to withdrawl funds from account to stake in game
    function approveBet(uint accountId, uint amount) external {}

    //  Gets the balance of the users betChess account
    function getBalance(uint accountId) public view returns (uint) {
        return accounts[accountId].balance;
    }

    // Get all the games of a specified account
    function getPreviousGames(
        uint accountId
    ) public view returns (Game[] memory) {
        return accountGames[accountId];
    }

    // Get all the chess accounts
    function getAccounts() public view returns (Account[] memory) {
        Account[] memory allAccounts = new Account[](nextAccountId - 1);
        for (uint256 i = 1; i < nextAccountId; i++) {
            allAccounts[i - 1] = accounts[i];
        }
        return allAccounts;
    }
}
