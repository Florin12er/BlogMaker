import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Register</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

