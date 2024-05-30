import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './customer/login/Login';
import Dashboard from './customer/dashboard/Dashboard';
import ServicesContainer from './customer/services/ServicesContainer';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Spinner } from 'react-bootstrap';
import ServiceForm from './customer/service-form/ServiceForm';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return  <Spinner animation="border" />
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/services" element={isLoggedIn ? <ServicesContainer /> : <Navigate to="/login" />} />
      <Route path="/apply/:serviceId" element={isLoggedIn ? <ServiceForm /> : <Navigate to="/login" />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
