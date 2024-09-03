import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showErrorToast } from '../../helpers/toastHelper';

const AdminProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const role = useSelector((state) => state.auth.role) || localStorage.getItem('role');
  const location = useLocation();

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  // Handle unauthorized access to specific dashboards
  if(token){
    if (role === 'admin' && location.pathname.startsWith('/user')) {
      showErrorToast('404 not valid page');
      return <Navigate to="/" />;
    }
  
    if (role === 'client' && location.pathname.startsWith('/admin')) {
      showErrorToast('404 not valid page');
      return <Navigate to="/" />;
    }
  }
 

  return children;
};

AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtectedRoute;
