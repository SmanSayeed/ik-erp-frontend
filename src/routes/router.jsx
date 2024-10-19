// src/routes/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../error-page";
import Dashboard from "../Components/Organism/Dashboard";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import { loginLoader } from "../loaders/loginloader";
import { registerLoader } from "../loaders/registerloader";
import EmailVerificationPage from "../Components/Organism/EmailVerificationPage";
import UsersListPage from "../Components/Organism/Admin/UsersListPage";
import ProtectedDashboardRoute from "../Components/Auth/ProtectedDashboardRoute";
import EditProfile from "../Components/Molecules/EditProfile/EditProfile";
import ResetPassword from "../Components/Molecules/ResetPassword/ResetPassword";
import ForgotPassword from "../Components/Molecules/ResetPassword/ForgotPassword";
import ResetPasswordByEmail from "../Components/Molecules/ResetPassword/ResetPasswordByEmail";
import ClientDashboardLayout from "../Components/Layout/ClientDashboardLayout";
import Profile from "../Components/Molecules/Profile/Profile";
import NotFoundPage from "../Components/Organism/NotFoundPage";
import { useSelector } from "react-redux";
import ClientDashboardPage from "../Components/Organism/ClientDashboardPage";
import ClientProfilePage from "../Components/Organism/Client/ClientProfilePage";
import ClientEditOwnProfileForm from "../Components/Molecules/Clients/ClientEditOwnProfileForm/ClientEditOwnProfileForm";
import ClientRegisterPage from "../Components/Organism/ClientRegisterPage";
import AdminProtectedRoute from "../Components/Auth/AdminProtectedRoute";
import ClientLoginPage from "../Components/Organism/ClientLoginPage";
import AdminLoginPage from "../Components/Organism/AdminLoginPage";
import ClientsListPage from "../Components/Organism/Admin/ClientsListPage";
import ClientResetPassword from "../Components/Molecules/ResetPassword/ClientResetPassword";
import ClientBecomeASeller from "../Components/Molecules/ClientBecomeASeller/ClientBecomeASeller";
import AdminManageSellerProfile from "../Components/Organism/Admin/AdminManageSellerProfile";
import DeviceList from "../Components/Organism/Device/DeviceList";

import ClientsDevicesList from "../Components/Organism/ClientsDevicesList/ClientsDevicesList";
import InvoiceList from "../Components/Pages/Invoice/InvoiceList";
import ViewInvoice from "../Components/Pages/Invoice/ViewInvoice";
import EditInvoice from "../Components/Pages/Invoice/EditInvoice";
import CreateInvoice from "../Components/Pages/Invoice/CreateInvoice";
import SellerProfile from "../Components/Organism/Seller/SellerProfile";
import ClientRegisterChildClient from "../Components/Molecules/RegisterForm/ClientRegisterChildClient";
import ChildClientProfile from "../Components/Molecules/Profile/ChildClientProfile";
import ClientInvoiceList from "../Components/Pages/Invoice/ClientInvoiceList";
import ClientCreateInvoice from "../Components/Pages/Invoice/ClientCreateInvoice";
import ClientViewInvoice from "../Components/Pages/Invoice/ClientViewInvoice";
import NodesComponent from "../Components/Organism/Nodes/NodesComponent";
import ChildNodesComponent from "../Components/Organism/Nodes/ChildNodesComponent";
import ClientUpdateChildClient from "../Components/Molecules/RegisterForm/ClientUpdateChildClient";

import PowerUsagePage from "../Components/Organism/Admin/PowerUsagePage";

import PowerDataSyncLogPage from "../Components/Organism/Admin/PowerDataSyncLogPage";
import OwnInvoiceList from "../Components/Pages/Invoice/OwnInvoiceList";

const ResetPasswordWrapper = () => {
  const user = useSelector((state) => state.auth.user);
  return <ResetPassword userId={user?.id} />;
};

const ResetClientPasswordWrapper = () => {
  return <ClientResetPassword />;
};

const clientRoutes = {
  path: "/client",
  element: (
    <ProtectedDashboardRoute>
      <ClientDashboardLayout />
    </ProtectedDashboardRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <ClientDashboardPage />,
    },
    {
      path: "profile",
      element: <ClientProfilePage />,
    },
    {
      path: "edit-profile",
      element: <ClientEditOwnProfileForm />,
    },
    {
      path: "reset-password",
      element: <ResetClientPasswordWrapper />,
    },
    {
      path: "become-seller",
      element: <ClientBecomeASeller />,
    },
    {
      path: "seller-profile",
      element: <SellerProfile />,
    },
    {
      path: "create-child-client/:client_remotik_id/:child_client_remotik_id",
      element: <ClientRegisterChildClient />,
    },
    {
      path: "child-client-profile/:client_remotik_id/:child_client_remotik_id",
      element: <ChildClientProfile />,
    },
    {
      path: "update-child-client/:client_remotik_id/:child_client_remotik_id",
      element: <ClientUpdateChildClient />,
    },

    
    {
      path: "own-invoices/:client_remotik_id",
      element: <OwnInvoiceList />,
    },

    {
      path: "invoices/:client_remotik_id",
      element: <ClientInvoiceList />,
    },

    {
      path: "create-invoice/:client_remotik_id",
      element: <ClientCreateInvoice />,
    },
    {
      path: "edit-invoice/:invoice_id",
      element: <EditInvoice />,
    },

    

    {
      path: "view-invoice/:invoice_id",
      element: <ClientViewInvoice />,
    },
    {
      path: "nodes/:client_remotik_id",
      element: <ChildNodesComponent />,
    },
    
  ],
};


// ADMIN STARTS

const adminDashboardRoutes = {
  path: "/admin",
  element: (
    <ProtectedDashboardRoute>
      <DashboardLayout />
    </ProtectedDashboardRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "users/:id",
      element: <Profile />,
    },
    {
      path: "users",
      element: <UsersListPage />,
    },
    {
      path: "clients",
      element: <ClientsListPage />,
    },
    {
      path: "manage-seller/:clientId",
      element: <AdminManageSellerProfile />,
    },
    {
      path: "edit-profile",
      element: <EditProfile />,
    },
    {
      path: "reset-password",
      element: <ResetPasswordWrapper />,
    },
    {
      path: "devices",
      element: <DeviceList />,
    },
    {
      path: "clients-devices",
      element: <ClientsDevicesList />,
    },
   
    // {
    //   path: "invoices",
    //   element: <ClientsDevicesList />,
    // },
    {
      path: "invoices",
      element: <InvoiceList />,
    },
    {
      path: "create-invoice",
      element: <CreateInvoice />,
    },
    {
      path: "edit-invoice/:invoice_id",
      element: <EditInvoice />,
    },
    {
      path: "view-invoice/:invoice_id",
      element: <ViewInvoice />,
    },
    {
      path: "nodes",
      element: <NodesComponent />,
    },
    {
      path: "power-usage",
      element: <PowerUsagePage />,
    },
    {
      path: "power-data-sync-log",
      element: <PowerDataSyncLogPage />,
    },
  ],
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    loader: loginLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <ClientLoginPage />
      </ProtectedRoute>
    ),
    loader: loginLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLoginPage />
      </AdminProtectedRoute>
    ),
    loader: loginLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <ClientRegisterPage />,
    loader: registerLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password-by-email",
    element: <ResetPasswordByEmail />,
    loader: registerLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify-email",
    element: <EmailVerificationPage />,
  },
  clientRoutes,
  adminDashboardRoutes,
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
