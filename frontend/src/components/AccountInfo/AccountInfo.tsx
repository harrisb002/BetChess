import React, { useState } from 'react';
import { createAccount } from '../../ethersService' ;

const AccountInfo = () => {
//   const [ownerAddress, setOwnerAddress] = useState('');

//   const handleCreateAccount = async () => {
//     try {
//       await createAccount([ownerAddress]);
//       alert('Account created successfully');
//     } catch (error) {
//       console.error('Error creating account:', error);
//       alert('Failed to create account');
//     }
//   };

//   const handleGetAccounts = async () => {
//     try {
//       const accounts = await getAccounts();
//       console.log(accounts); // Or update the UI accordingly
//     } catch (error) {
//       console.error('Error fetching accounts:', error);
//     }
//   };

  return (
    <div>
      {/* <input type="text" value={ownerAddress} onChange={(e) => setOwnerAddress(e.target.value)} placeholder="Owner Address" /> */}
      {/* <button onClick={handleCreateAccount}>Create Account</button>
      <button onClick={handleGetAccounts}>Get Accounts</button> */}
      {/* Display accounts or other UI elements here */}
    </div>
  );
};

export default AccountInfo;
