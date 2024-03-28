import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Referee from "./components/Referee/Referee";
import AccountInfo from "./components/AccountInfo/AccountInfo";

function App() {
  return (
    <Router>
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
