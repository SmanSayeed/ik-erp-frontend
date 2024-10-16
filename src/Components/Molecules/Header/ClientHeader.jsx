// Header.jsx
import { Menu, Bell } from "lucide-react"; // Icons
import { Button } from "../../ui/button";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { Link } from "react-router-dom";
import routes from "../../../routes/routes";
import { useSelector } from "react-redux";
const ClientHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const { client } = useSelector((state) => state.auth); 

  return (
    <header className="bg-blue-200 shadow p-4 flex justify-between items-center">
      <Button variant="ghost" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </Button>
      <h1 className="text-xl font-semibold hidden md:block">
        Client Dashboard
      </h1>
      <div className="flex items-center space-x-4">
      <div className="">
        {client?.is_seller !== 1 ? (
          <Link to={routes.ClientBecomeASeller.link}>
            <Button>Become a seller</Button>
          </Link>
        ) : (
          <Link to={routes.ClientSellerProfile.link}>
            <Button>Seller Profile</Button>
          </Link>
        )}
      </div>

        <Button variant="ghost" className="relative md:block hidden">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600" />
        </Button>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default ClientHeader;
