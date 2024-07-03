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
        "https://blogapi-production-fb2f.up.railway.app/user/logout",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/login"); // Redirect to /login route after logout
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <header className="w-full bg-white border-b-2 border-solid border-black">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Blog Maker</h1>
          </div>
          <div className="flex gap-4">
            <a
              href="https://blogs-nine-steel.vercel.app/"
              className="font-bold hover:text-blue-500"
            >
              See Blogs
            </a>
            <Link
              to="#"
              className="font-bold hover:text-blue-500"
            >
              Blog Api Docs
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
        </div>
      </header>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}

export default NavBar;

