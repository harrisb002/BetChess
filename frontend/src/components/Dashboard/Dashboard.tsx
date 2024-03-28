import React from "react";
import { Link } from "react-router-dom"; // Import Link component

export default function Dashboard() {
  return (
    <>
      <div>
        <p>Dashboard</p>
        <nav>
          <ul>
            <li>
              <Link to="/referee">Referee Page</Link> {/* Link to the Referee page */}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
