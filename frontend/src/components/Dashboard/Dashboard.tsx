import React from "react";
import { Link } from "react-router-dom"; // Import Link component

export default function Dashboard() {
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Link to="/referee">Chessboard</Link> 
            </li>
            <li>
              <Link to="/account">Account Info</Link> 
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
