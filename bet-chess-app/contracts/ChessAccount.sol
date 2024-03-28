
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
    event Deposit(
        address indexed user,
        uint value,
        uint timestamp
    );
    event AccountCreated(address owner, uint indexed id, uint timestamp);

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
    mapping(address => uint[]) previousPlayedUsers;  // Stores the ID's of the chess accounts for each completed game associated with each user

    uint nextGameId; // Inc so that each new game has a unique ID attached to it

    // Allows account owner to deposit funds into his/her account
    function deposit(uint accountId) external payable {}

    // The person who calls this will become the owner of this account
    function createAccount(address[] calldata newOwner) external {}

    // Proposes an amount for a game to be played
    function bet(uint accountId, uint amount) external {}

    // Once game is approved then will be allowed to withdrawl funds from account to stake in game
    function approveBet(uint accountId, uint amount) external {}

    //  Gets the balance of the users betChess account
    function getBalance(uint accountId) public view returns (uint) {}

    // Get all the games of a specified account
    function getPreviousGames(uint accountId) public view returns (Game[] memory) {}

    // Get all the chess accounts
    function getAccounts() public view returns (uint[] memory) {}
    
}