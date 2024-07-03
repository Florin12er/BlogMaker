import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getCookie } from "../utils/GetCookie";

const RequireAuth = ({ children }) => {
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = getCookie("token");
      if (!token) {
        <Navigate to="/login" replace />;
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired, remove cookie and redirect to login
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.vercel.app; SameSite=None; Secure";
          <Navigate to="/login" replace />;
          return;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle any decoding errors (e.g., invalid token format)
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.vercel.app; SameSite=None; Secure";
        <Navigate to="/login" replace />;
        return;
      }
    };

    checkTokenValidity();
  }, []);

  return children;
};

export default RequireAuth;
