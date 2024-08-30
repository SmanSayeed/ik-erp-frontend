// src/Components/Auth/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify'; // Import toast for error messages

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const role = useSelector((state) => state.auth.role) || localStorage.getItem('role');
  const location = useLocation();

  // Function to show toast messages
  const showToast = (message) => {
    toast.error(message);
  };

  // Handle unauthorized access
  if (token && role) {
    if (role === 'admin') {
      if (location.pathname.startsWith('/user/dashboard')) {
        showToast('404 not valid page');
        // return <Navigate to="/" />;
      }
      return children;
    } 
    
    if (role === 'client') {
      if (location.pathname.startsWith('/admin/dashboard')) {
        showToast('404 not valid page');
        // return <Navigate to="/" />;
      }
      return children;
    }
  }

  // Handle cases where the token exists but the route is not valid
  // if (!token) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
