import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ethers } from 'ethers';

const UpdateAccountInfo = ({ contract }) => {
  const [accountInfo, setAccountInfo] = useState([]);
  const [updateInfo, setUpdateInfo] = useState({ userName: '', balance: 0, accountId: 0 });

  useEffect(() => {
    // Fetch account information logic (if applicable)
  }, [contract]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { accountId, userName, balance } = updateInfo;

    try {
      const tx = await contract.updateAccountInfo(
        accountId, 
        userName, 
        ethers.utils.parseUnits(balance.toString(), 'ether')
      );
      await tx.wait();
      alert('Account information updated successfully!');
    } catch (error) {
      console.error('Error updating account information:', error);
      alert('Failed to update account information. Make sure the account ID is correct and you are the owner.');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      {accountInfo.map(({ id, userName, balance }) => (
        <Card key={id}>
          <Card.Header>{userName}</Card.Header>
          <Card.Body>
            Balance: {balance}
          </Card.Body>
        </Card>
      ))}
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="accountId">
          <Form.Label>Account ID</Form.Label>
          <Form.Control type="number" name="accountId" value={updateInfo.accountId} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="userName">
          <Form.Label>New Username</Form.Label>
          <Form.Control type="text" name="userName" value={updateInfo.userName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="balance">
          <Form.Label>New Balance</Form.Label>
          <Form.Control type="number" name="balance" value={updateInfo.balance} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Account
        </Button>
      </Form>
    </div>
  );
};

export default UpdateAccountInfo;
