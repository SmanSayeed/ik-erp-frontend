// src/components/ui/LogoutButton.jsx
import React from 'react';
import { LogOut } from 'lucide-react'; // Icon
import { Button } from './button'; // Assuming you have a Button component
import { useLogoutHelper } from '@/helpers/logoutHelper';

const LogoutButton = () => {
  const { logoutHelper } = useLogoutHelper();

  const handleLogout = async () => {
    await logoutHelper(); // Handles the logout process
  };

  return (
    <Button
      onClick={handleLogout}
      className="w-full text-left flex items-center p-2 hover:bg-gray-100"
    >
      <LogOut className="w-5 h-5 mr-2" /> Logout
    </Button>
  );
};

export default LogoutButton;
