// src/Components/Auth/ProtectedDashboardRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedDashboardRoute({ children }) {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedDashboardRoute;
