import { Link } from "react-router-dom";
import githubLogo from "/github-original.svg"; // Import or use the path to your SVG file

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
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
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none w-full"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 mb-2">Or login with:</p>
          <div className="flex justify-center">
            <button className="bg-white border-2 border-solid border-gray hover:bg-zinc-200 text-black py-2 px-4 rounded-md flex items-center space-x-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span>Google</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md flex items-center space-x-2 ml-2">
              <img
                src={githubLogo}
                alt="GitHub"
                className="h-6 w-6 fill-current"
              />
              <span>GitHub</span>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600">Register here</Link>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Forgot your password? <Link to="/reset-request" className="text-blue-500 hover:text-blue-600">Reset here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

