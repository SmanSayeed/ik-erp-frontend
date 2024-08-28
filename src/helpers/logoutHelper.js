// src/helpers/logoutHelper.js
import { logout as logoutAction } from '@/features/auth/authSlice';
import { useLogoutMutation } from '@/services/authApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useLogoutHelper = () => {
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHelper = async () => {
    try {
      const response = await logoutApi().unwrap();
      dispatch(logoutAction());
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      toast.success(response.message || 'Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to log out.');
    }
  };

  return { logoutHelper };
};
