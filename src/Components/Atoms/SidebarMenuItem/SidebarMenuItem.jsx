import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

function SidebarMenuItem({ to, title, icon = <Home className="w-5 h-5 mr-3" /> }) {
  return (
    <Link to={to} className="flex items-center py-2 px-4 hover:bg-gray-700">
      {icon}
      {title}
    </Link>
  );
}

export default SidebarMenuItem;
