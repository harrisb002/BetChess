import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect, getContract } from "./services/ethersService";

import Navbar from "./components/Dashboard/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Referee from "./components/Referee/Referee";
import AccountInfo from "./components/AccountInfo/AccountInfo";

function App() {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) {
        handleInit();
      } else setConnected(false);
    });
  }, []);

  const handleInit = () => {
    setConnected(true);
    getContract().then(({ contract, signer }) => {
      setContract(contract);
    });
  };

  const connectCallback = async () => {
    const { contract } = await connect();
    setContract(contract);
    if (contract) {
      setConnected(true);
    }
  };

  const becomeMember = async () => {
    if (!contract) {
      alert("Please connect to metamask.");
      return;
    }

    const userAddress = contract.signer.getAddress();

    await contract
      .createAccount(userAddress)
      .then(() => {
        alert("Joined");
        setIsMember(true);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Router>
      <Navbar
        connect={connectCallback}
        connected={connected}
        becomeMember={becomeMember}
        isMember={isMember}
      />
      <div id="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/referee" element={<Referee />} />
          <Route path="/account" element={<AccountInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
