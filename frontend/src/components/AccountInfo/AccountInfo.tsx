import React, { useState } from "react";
// import { createAccount, getAccounts } from "../../ethersService";

const AccountInfo = () => {
//   const [ownerAddress, setOwnerAddress] = useState("");

//   const handleCreateAccount = async () => {
//     try {
//       await createAccount(ownerAddress);
//       alert("Account created successfully");
//     } catch (error) {
//       console.error("Error creating account:", error);
//       alert("Failed to create account");
//     }
//   };

//   const handleGetAccounts = async () => {
//     try {
//       const accounts = await getAccounts();
//       console.log(accounts);
//     } catch (error) {
//       console.error('Error fetching accounts:', error);
//     }
//   };

  return (
    <>
      <div>
        <h1>Create Account</h1>
        {/* <input
          type="text"
          value={ownerAddress}
          onChange={(e) => setOwnerAddress(e.target.value)}
          placeholder="Owner Address"
        />
        <button onClick={handleCreateAccount}>Create Account</button>
        <button onClick={handleGetAccounts}>Get Accounts</button> */}
      </div>
      <div id="events"></div>
      <div>
        <p id="owners"></p>
      </div>
    </>
  );
};

export default AccountInfo;
