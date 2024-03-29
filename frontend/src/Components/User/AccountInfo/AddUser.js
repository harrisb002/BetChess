import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ethers } from 'ethers';

const AddUser = ({ contract }) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make sure userName is not empty
    if (!userName.trim()) {
      alert('Username is required!');
      return;
    }

    try {
      // Assuming contract is already instantiated with a signer
      const transaction = await contract.createAccount(userName);
      await transaction.wait();
      alert('Account created successfully!');
      setUserName(''); 
    } catch (error) {
      console.error('Failed to create account:', error);
      alert('Failed to create account. Make sure you don’t already have one.');
    }
  };

  return (
    <div className="add-user-form">
      <h2>Create New User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
