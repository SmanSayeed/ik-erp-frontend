// Header.jsx
import { Menu, Bell } from 'lucide-react'; // Icons
import { Button } from '@/components/ui/button';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Button variant="ghost" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </Button>
      <h1 className="text-xl font-semibold hidden md:block">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="relative md:block hidden">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600" />
        </Button>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
