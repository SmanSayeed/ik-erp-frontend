import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const ProtectedRoute = ({ children }) => {
  // Get the token from Redux state or localStorage
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  // Check if the token exists
  if (token) {
    // If no token, redirect to login page
    return <Navigate to="/dashboard" />;
  }

  // If token exists, allow access to the protected route
  return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export default ProtectedRoute;
