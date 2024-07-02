import { Link, Route, Routes } from "react-router-dom";
import DashBoard from "./routes/DashBoard";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ResetPassword from "./routes/Reset";
import ResetRequest from "./routes/ResetRequest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/reset-request" element={<ResetRequest/>}></Route>
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
