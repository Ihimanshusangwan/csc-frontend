import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./customer/login/Login";
import Dashboard from "./customer/dashboard/Dashboard";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
 <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/dashboard" element={ isLoggedIn ? <Dashboard /> : <Navigate to="/login" /> } />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
