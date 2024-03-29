import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const AccountInfo = ({ contract }) => {
  const [accountInfo, setAccountInfo] = useState([]);

  useEffect(() => {
    if (!contract) return;

    const fetchAccounts = async () => {
      try {
        // Assuming `getAccounts` returns an array of account IDs owned by the caller
        const accountIds = await contract.getAccounts().call();
        const info = await Promise.all(accountIds.map(async (id) => {
          // Fetch userName and balance for each account ID
          const info = await contract.getAccountInfo(id).call();
          return { id, userName: info[0], balance: info[1] };
        }));
        console.log("Info is: ", info)
        setAccountInfo(info);
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };

    fetchAccounts();
  }, []);

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
    </div>
  );
};

export default AccountInfo;
