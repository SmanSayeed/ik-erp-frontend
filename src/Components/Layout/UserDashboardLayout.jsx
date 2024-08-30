// DashboardLayout.jsx
import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Molecules/Header/Header';
import UserDashboardSidebar from '../Molecules/Sidebar/UserDashBoardSidebar';
import UserHeader from '../Molecules/Header/UserHeader';

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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
    <div className="flex h-screen overflow-hidden">
      <UserDashboardSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarRef={sidebarRef}
      />
      <div className={`w-[100vw] flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`} >
        <UserHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 sm:p-2 md:p-2 lg:p-2 bg-gray-100 overflow-x-auto ">
          <Outlet />
        </main>
        <footer className="bg-white p-4 text-center shadow">
          <p>© 2024 User Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
