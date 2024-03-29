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
              <Link to="/updateAccount">Update Account Info</Link>
            </li>
            <li>
              <Link to="/allUsers">Display All Users</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
