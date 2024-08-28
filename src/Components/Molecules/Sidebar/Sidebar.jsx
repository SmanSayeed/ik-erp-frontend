// Sidebar.jsx
import { Box, Container, DockIcon, Home, Laptop, MapPinIcon, MapPinOff, Paperclip, Users } from 'lucide-react'; // Icons
import { Link } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar, sidebarRef }) => {
  return (
    <aside
      ref={sidebarRef}
      className={`${
        isSidebarOpen ? 'block' : 'hidden'
      } fixed inset-y-0 z-30 w-64 bg-gray-800 text-white md:block md:static md:w-64 md:flex-shrink-0`}
      style={{ overflowY: 'auto' }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav>
          <Link to="/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <Home className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/dashboard/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <Users className="w-5 h-5 mr-3" /> Users
          </Link>
          <Link to="/dashboard/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <Laptop className="w-5 h-5 mr-3" /> Devices
          </Link>
          <Link to="/dashboard/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <Box className="w-5 h-5 mr-3" /> Device Clusters
          </Link>
          <Link to="/dashboard/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <MapPinIcon className="w-5 h-5 mr-3" /> Client Device Mappings
          </Link>
          <Link to="/dashboard/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <DockIcon className="w-5 h-5 mr-3" /> Invoices
          </Link>
          {/* Add more links as needed */}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
