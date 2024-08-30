// src/Components/Auth/ProtectedDashboardRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout';
import UserDashboardLayout from '../Layout/UserDashboardLayout';

function ProtectedDashboardRoute({ children }) {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const role = useSelector((state) => state.auth.role) || localStorage.getItem('role');
  if (!token) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }
  if(token && role){
    if(role=="admin"){
      return (
        <>
        <DashboardLayout>
          {children}
        </DashboardLayout>
        </>
      );
    }

    if(role=="client"){
      return (
        <>
        <UserDashboardLayout>
          {children}
        </UserDashboardLayout>
        </>
      );
    }
  }


}

export default ProtectedDashboardRoute;
