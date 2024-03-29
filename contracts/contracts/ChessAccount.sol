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
        uint256 accountId,
        uint256 timestamp
    );

    struct Account {
        address owner;
        string userName;
        uint balance;
    }

    mapping(uint256 => Account) public accounts; // Account ID to Account mapping.
    mapping(address => uint256[]) public userAccounts; // Address to list of Account IDs mapping.
    mapping(address => bool) public members; // Tracks addresses that have accounts.

    uint256 private nextAccountId = 1; // Incremental unique ID for new accounts.

    // Modifier to restrict function access to the account owner.
    modifier onlyAccountOwner(uint256 accountId) {
        require(accounts[accountId].owner == msg.sender, "Not the account owner.");
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
        uint256 accountId = nextAccountId++;
        accounts[accountId] = Account({owner: msg.sender, userName: userName, balance: 0});
        userAccounts[msg.sender].push(accountId);
        members[msg.sender] = true;
        emit AccountCreated(msg.sender, accountId, block.timestamp);
    }

    // New function to return userName and balance for a given account ID.
    function getAccountInfo(uint256 accountId) external view returns (string memory userName, uint balance) {
        Account storage account = accounts[accountId];
        return (account.userName, account.balance);
    }

    /**
     * Returns all account IDs owned by the caller.
     */
    function getAccounts() external view returns (uint256[] memory) {
        return userAccounts[msg.sender];
    }
}
