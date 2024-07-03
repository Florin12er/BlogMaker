// Dashboard.js
import React from "react";
import NavBar from "../components/NavBar";
import Create from "../components/Create";
import { getCurrentUserId } from "../utils/GetCurrentUserId";

function Dashboard() {
  const userId = getCurrentUserId(); // Get current user ID using auth function

  return (
    <div className="bg-gray-100">
      <NavBar />
      <Create userId={userId} />
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-gray-600">
          © 2024 Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;

