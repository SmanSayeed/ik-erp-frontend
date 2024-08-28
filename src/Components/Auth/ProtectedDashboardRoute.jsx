// src/Components/Auth/ProtectedDashboardRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedDashboardRoute({ children }) {
  const token = localStorage.getItem('token'); // Get token from localStorage

  if (!token) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedDashboardRoute;
