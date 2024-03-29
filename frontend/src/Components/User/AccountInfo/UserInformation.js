import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ethers } from "ethers";

const UserInformation = ({ contract, userAddress }) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const user = userAddress.provider.provider.accounts;

  useEffect(() => {
    const fetchUserAccounts = async () => {
      if (!contract) {
        console.log("Contract not ready");
        return;
      }
      console.log("UserAddress:", userAddress.provider.provider.accounts);

      try {
        console.log("Contract ready", contract);
        const accountsData = await contract.getAccountInfo(user);
        console.log("Accounts Data:", accountsData);

        const formattedAccounts = accountsData.map((account) => ({
          owner: account.owner, // If this is already an Ethereum address string, leave it as is
          userName: account.userName,
          balance: ethers.utils.formatEther(account.balance),
        }));
        console.log(formattedAccounts)
        setUserAccounts(formattedAccounts);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    };

    fetchUserAccounts();
  }, [contract, userAddress]);

  return (
    <div>
      <h2>Accounts for </h2>
      {userAccounts.length > 0 ? (
        userAccounts.map((account, index) => (
          <Card key={index} style={{ margin: "1rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Username: {account.userName}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      ) : (
        <p>No accounts found for this address.</p>
      )}
    </div>
  );
};

export default UserInformation;
