// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Manages chess accounts with features like game betting and account balances.
 * Each account can:
 * - Have games attached to it.
 * - Have a balance for betting in games.
 * - Allow the owner to deposit "money" for staking in games.
 * - Allow the owner to create new games against other ChessAccount holders.
 * - Restrict games to those with a positive balance.
 * - Ensure sufficient balance for the staked amount.
 */
contract ChessAccount {
    event AccountCreated(
        address indexed owner,
        uint256 indexed accountId,
        uint256 indexed createdAt,
    );

    struct Account {
        address owner;
        string userName;
        uint balance;
    }

    mapping(uint256 => Account) public accounts; // Account ID to Account mapping.
    mapping(address => uint256) public userAccounts; // Address to list of Account IDs mapping.
    mapping(address => bool) public members; // Tracks addresses that have accounts.

    uint256 private nextAccountId; // Incremental unique ID for new accounts.

    // Modifier to restrict function access to owner of account.
    modifier onlyAccountOwner() {
        require(
            accounts[userAccounts[msg.sender]].owner == msg.sender,
            "Not the account owner."
        );
        _;
    }

    // Modifier to check if the caller already has an account.
    modifier hasNoAccount() {
        require(!members[msg.sender], "Caller already has an account.");
        _;
    }

    /**
     * Creates a new chess account. The caller becomes the account's owner.
     * Emits an AccountCreated event.
     */
    function createAccount(string memory userName) external hasNoAccount {
        uint256 accountId = nextAccountId;
        userAccounts[msg.sender].owner = msg.sender;
        userAccounts[msg.sender].userName = userName;
        userAccounts[msg.sender].balance = 0;
        members[msg.sender] = true;
        nextAccountId++;
        emit AccountCreated(msg.sender, accountId, block.timestamp);
    }

    /**
     * Updates the account username.
     */
    function updateUsernameInfo(
        string memory newUserName,
    ) external onlyAccountOwner {
        accounts[userAccounts[msg.sender]].username = newUserName;
    }

    /**
     * Returns all account info for the given user address.
     */
    function getAccountInfo(
        address userAddress
    ) external view onlyAccountOwner returns (Account memory) {
        return accounts[userAccounts[msg.sender]];
    }
}
