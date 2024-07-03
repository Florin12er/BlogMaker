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
          document.cookie =
            "token=; path=/; domain=blog-maker-two.vercel.app; SameSite=None; Secure";

          <Navigate to="/login" replace />;
          return;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        document.cookie =
          "token=; path=/; domain=blog-maker-two.vercel.app; SameSite=None; Secure";

        <Navigate to="/login" replace />;
        return;
      }
    };

    checkTokenValidity();
  }, []);

  return children;
};

export default RequireAuth;
