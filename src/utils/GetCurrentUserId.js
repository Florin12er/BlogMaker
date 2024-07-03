// utils/auth.js

import { jwtDecode } from "jwt-decode";

export const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded; // Adjust based on your JWT structure
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return null;
};
