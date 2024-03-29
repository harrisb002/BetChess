import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect, getContract } from "./services/ethersService";

import Navbar from "./Components/User/Dashboard/Navbar";
import Dashboard from "./Components/User/Dashboard/Dashboard";
import Referee from "./Components/Chess/Components/Referee/Referee";
import AccountInfo from "./Components/User/AccountInfo/AccountInfo";

function App() {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [logedin, setLogedin] = useState(localStorage.getItem("isLogedIn") === "true");

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
        localStorage.setItem("isLogedIn", "true");
      })
      .catch((error) => alert(error.message));
  };

  const logout = () => {  
    // Clear membership status from localStorage
    localStorage.removeItem("isLogedIn");
  };
  

  return (
    <Router>
      <Navbar
        connect={connectCallback}
        connected={connected}
        becomeMember={becomeMember}
        logedin={logedin}
        logout={logout}
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
