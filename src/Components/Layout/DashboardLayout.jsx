import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button'; // Shadcn UI button
import { Menu, X, Home, User, Users } from 'lucide-react'; // Icons

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } fixed inset-y-0 z-30 w-64 bg-gray-800 text-white md:block md:static`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <Button
              variant="ghost"
              className="md:hidden text-white"
              onClick={toggleSidebar}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <nav>
            <a
              href="/dashboard"
              className="flex items-center py-2 px-4 hover:bg-gray-700"
            >
              <Home className="w-5 h-5 mr-3" /> Dashboard
            </a>
            {/* <a
              href="/profile"
              className="flex items-center py-2 px-4 hover:bg-gray-700"
            >
              <User className="w-5 h-5 mr-3" /> Profile
            </a> */}
            <a
              href="/users"
              className="flex items-center py-2 px-4 hover:bg-gray-700"
            >
              <Users className="w-5 h-5 mr-3" /> Users
            </a>
            {/* More links... */}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <Button variant="ghost" className="md:hidden" onClick={toggleSidebar}>
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <Button variant="link" className="text-red-600" onClick={handleLogout}>
            Logout
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center shadow">
          <p>© 2024 Admin Dashboard</p>
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;
