import React from "react";
import { Box, Laptop, MapPinIcon, DockIcon, Users, Home } from "lucide-react"; // Icons
import SidebarMenuItem from "../../Atoms/SidebarMenuItem/SidebarMenuItem"; // Import the SidebarMenuItem component
import routes from "../../../routes/routes";
import { useSelector } from "react-redux";

const ClientDashboardSidebar = ({ isSidebarOpen, toggleSidebar, sidebarRef }) => {
  const {client} = useSelector((state) => state.auth);
  const iconClass ="w-5 h-5 mr-3";
  return (
    <aside
      ref={sidebarRef}
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } fixed inset-y-0 z-30 w-64 bg-gray-800 text-white md:block md:static md:w-64 md:flex-shrink-0`}
      style={{ overflowY: "auto" }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Client Dashboard</h2>
        </div>
        <nav>
        <SidebarMenuItem
            to={routes.ClientDashboard.link}
            title="Dashboard"
            icon={<Home className={iconClass} />}
          />
          {/* <SidebarMenuItem
            to={routes.ClientDashboard.link}
            title="Devices"
            icon={<Laptop className={iconClass} />}
          />
          <SidebarMenuItem
            to={routes.ClientDashboard.link}
            title="Device Clusters"
            icon={<Box className={iconClass} />}
          /> */}
          {/* <SidebarMenuItem
            to={routes.ClientDashboard.link}
            title="Client Device Mappings"
            icon={<MapPinIcon className={iconClass} />}
          /> */}
           <SidebarMenuItem
            to={routes.ClientSellerProfile.link}
            title="Seller Profile"
            icon={<DockIcon className={iconClass} />}
          />
            <SidebarMenuItem
            to={routes.OwnInvoicesList.link(client.client_remotik_id)}
            title="Own Invoices"
            icon={<DockIcon className={iconClass} />}
          />
          <SidebarMenuItem
            to={routes.ClientInvoices.link(client.client_remotik_id)}
            title="Invoices"
            icon={<DockIcon className={iconClass} />}
          />
           <SidebarMenuItem
            to={routes.clientNodes.link(client.client_remotik_id)}
            title="Nodes"
            icon={<DockIcon className={iconClass} />}
          />
          {/* Add more links as needed */}
        </nav>
         
      </div>
    </aside>
  );
};

export default ClientDashboardSidebar;
