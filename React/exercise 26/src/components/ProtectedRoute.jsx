import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the current location
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
