import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Edit, Lock } from 'lucide-react'; // Icons
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '@/services/authApi';

const ProfileDropdown = ({ profileImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();

  // Default profile image if none is provided
  const defaultImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      dispatch(logoutAction());
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      toast.success(response.message || 'Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to log out.');
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        <img
          src={profileImage || defaultImage}
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
          <Link to="/profile" className="flex items-center p-2 hover:bg-gray-100">
            <User className="w-5 h-5 mr-2" /> Profile
          </Link>
          <Link to="/dashboard/edit-profile" className="flex items-center p-2 hover:bg-gray-100">
            <Edit className="w-5 h-5 mr-2" /> Edit Profile
          </Link>
          <Link to="/dashboard/reset-password" className="flex items-center p-2 hover:bg-gray-100">
            <Lock className="w-5 h-5 mr-2" /> Change Password
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center p-2 hover:bg-gray-100"
            disabled={isLoading}
          >
            <LogOut className="w-5 h-5 mr-2" /> {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
