import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.delete(
        "https://blogapi-production-fb2f.up.railway.app/user/logout",
        {
          withCredentials: true, // Ensure credentials are sent
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear token from localStorage upon successful logout
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Blog Maker
          </Link>
          <Link to="#" className="text-gray-700 hover:text-gray-900">
            Blog Api
          </Link>
          <Link to="#" className="text-gray-700 hover:text-gray-900">
            See Blogs
          </Link>
        </div>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Logout
          </button>
        </form>
      </header>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}

export default NavBar;

