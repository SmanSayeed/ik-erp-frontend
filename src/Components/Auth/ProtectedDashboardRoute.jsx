import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showErrorToast } from '../../helpers/toastHelper';
import routes from '../../routes/routesLink';

function ProtectedDashboardRoute({ children }) {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const role = useSelector((state) => state.auth.role) || localStorage.getItem('role');
  const location = useLocation();

  if (!token) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
if(token){
  if (role === 'admin' && location.pathname.startsWith('/admin')) {
    return children;
  }
  else if (role === 'client' && location.pathname.startsWith('/user')) {
    return children;
  }
  else{
    showErrorToast('404 not valid page');
    if(role=='admin'){
      return <Navigate to={routes.adminDashboard.link} />;
    }else if(role=='client'){
      return <Navigate to={routes.userDashboard.link} />;
    }else{
      return <Navigate to="/" />;
    }
  
  }
}
  

  // Unauthorized access
  showErrorToast('404 not valid page');
  return <Navigate to="/" />;
}

ProtectedDashboardRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedDashboardRoute;
