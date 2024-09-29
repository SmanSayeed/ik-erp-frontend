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
import ClientEditOwnProfileForm from "../Components/Molecules/ClientEditOwnProfileForm/ClientEditOwnProfileForm";
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
  ],
};

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
