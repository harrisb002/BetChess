import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ethers } from 'ethers';

const DisplayAllUsers = ({ contract }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      console.log(contract);
      try {
        // Fetch all account information from the contract
        const accountsData = await contract.getAllAccounts();
        const formattedAccounts = accountsData.map((account, index) => ({
          id: index + 1,
          userName: account.userName,
          balance: ethers.utils.formatEther(account.balance),
        }));

        setAccounts(formattedAccounts);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };

    fetchAccounts();
  }, [contract]);

  return (
    <div>
      <h2>All User Accounts</h2>
      {accounts.length > 0 ? (
        accounts.map(({ id, userName, balance }) => (
          <Card key={id} style={{ margin: '1rem' }}>
            <Card.Header>Account ID: {id}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Username: {userName}</ListGroup.Item>
              <ListGroup.Item>Balance: {balance} ETH</ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
};

export default DisplayAllUsers;
