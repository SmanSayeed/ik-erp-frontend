// src/Components/Layout/DashboardLayout.jsx
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // Clear token from storage
    toast.success('Logged out successfully!');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <nav>
            <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</a>
            {/* More links... */}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button
            className="text-red-600 hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet /> {/* This will render the child routes */}
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
