import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reset Password</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
              Reset Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter reset code"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
          >
            Reset Password
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Remember your password? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;

