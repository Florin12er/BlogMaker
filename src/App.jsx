import { Link, Route, Routes } from "react-router-dom";
import DashBoard from "./routes/DashBoard";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ResetPassword from "./routes/Reset";
import ResetRequest from "./routes/ResetRequest";
import RequireAuth from "./routes/PrivateRoute";
import GitHubCallback from "./routes/GithubCallback";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <DashBoard />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-request" element={<ResetRequest />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/auth/github/callback" element={<GitHubCallback />} />
    </Routes>
  );
}

export default App;
