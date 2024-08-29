import NavBar from "../components/NavBar";
import Create from "../components/Create";

function Dashboard() {
  return (
    <div className="bg-gray-100">
      {" "}
      <NavBar /> <Create />{" "}
      <footer className="bg-gray-200 text-center p-4">
        {" "}
        <p className="text-gray-600">
          {" "}
          © 2024 Your Company. All rights reserved.{" "}
        </p>{" "}
      </footer>{" "}
    </div>
  );
}

export default Dashboard;
