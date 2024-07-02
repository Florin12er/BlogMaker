import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (!token) {
    console.log("Redirecting to /login");
    return <Navigate to="/login" replace />;
  }
  console.log("Rendering children");
  return children; // Render the children when authenticated
};
export default RequireAuth;
