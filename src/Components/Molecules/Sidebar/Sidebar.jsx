// Sidebar.jsx
import { Home, Users } from 'lucide-react'; // Icons

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
          <a href="/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <Home className="w-5 h-5 mr-3" /> Dashboard
          </a>
          <a href="/dashboard/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <Users className="w-5 h-5 mr-3" /> Users
          </a>
          {/* Add more links as needed */}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
