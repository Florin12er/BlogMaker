import { Link } from "react-router-dom";
import Create from "../components/Create";
import NavBar from "../components/NavBar";
function DashBoard() {
  return (
    <div className="bg-gray-100">
      <NavBar />
      <Create />
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-gray-600">
          © 2024 Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default DashBoard;
