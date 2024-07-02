import { Link } from "react-router-dom";

function NavBar() {
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
        <form>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Logout
          </Link>
        </form>
      </header>
    </>
  );
}
export default NavBar;
