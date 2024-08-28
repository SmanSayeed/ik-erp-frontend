// src/components/ui/ProfileDropdown.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Edit, Lock } from 'lucide-react'; // Icons
import LogoutButton from './LogoutButton';

const ProfileDropdown = ({ profileImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Default profile image if none is provided
  const defaultImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={profileImage || defaultImage}
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
          <a href="/profile" className="flex items-center p-2 hover:bg-gray-100">
            <User className="w-5 h-5 mr-2" /> Profile
          </a>
          <a href="/profile/edit" className="flex items-center p-2 hover:bg-gray-100">
            <Edit className="w-5 h-5 mr-2" /> Edit Profile
          </a>
          <a href="/profile/change-password" className="flex items-center p-2 hover:bg-gray-100">
            <Lock className="w-5 h-5 mr-2" /> Change Password
          </a>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
