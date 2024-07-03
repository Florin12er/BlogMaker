import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // No token found, redirect to login
        navigate("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired, remove from localStorage and redirect to login
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle any decoding errors (e.g., invalid token format)
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
    };

    checkTokenValidity();
  }, [navigate]);

  return children;
};

export default RequireAuth;

