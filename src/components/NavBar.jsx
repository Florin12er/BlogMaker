import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      await axios.delete(
                "https://blogapi-1jcl.onrender.com/user/logout",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      navigate("/login"); // Redirect to /login route after logout
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-white">Blog Maker</Link>
          <div className="flex gap-6">
            <a
              href="https://blogs-nine-steel.vercel.app/"
              className="text-white hover:text-yellow-300 font-semibold transition duration-300 ease-in-out"
            >
              See Blogs
            </a>
            <a
              href="https://blogdocs.vercel.app"
              className="text-white hover:text-yellow-300 font-semibold transition duration-300 ease-in-out"
            >
              Blog Api Docs
            </a>
          </div>
          <form onSubmit={handleLogout}>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 container mx-auto" role="alert">{error}</div>}
    </>
  );
}

export default NavBar;

