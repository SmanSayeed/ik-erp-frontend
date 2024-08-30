// src/routes/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../error-page";
import Dashboard from "../Components/Organism/Dashboard";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import { loginLoader } from "../loaders/loginloader";
import { registerLoader } from "../loaders/registerloader";
import RegisterPage from "../Components/Organism/RegisterPage";
import EmailVerificationPage from "../Components/Organism/EmailVerificationPage";
import UsersListPage from "../Components/Organism/Admin/UsersListPage";
import ProtectedDashboardRoute from "../Components/Auth/ProtectedDashboardRoute";
import EditProfile from "../Components/Molecules/EditProfile/EditProfile";
import ResetPassword from "../Components/Molecules/ResetPassword/ResetPassword";
import ForgotPassword from "../Components/Molecules/ResetPassword/ForgotPassword";
import ResetPasswordByEmail from "../Components/Molecules/ResetPassword/ResetPasswordByEmail";
import ProtectedDashboardUserRoute from "../Components/Auth/ProtectedDashboardUserRoute";
import UserDashboardLayout from "../Components/Layout/UserDashboardLayout";
import Profile from "../Components/Molecules/Profile/Profile";
import NotFoundPage from "../Components/Organism/NotFoundPage";
import { useSelector } from "react-redux";
import UserDashboardPage from "../Components/Organism/UserDashboardPage";

const ResetPasswordWrapper = () => {
  const user = useSelector((state) => state.auth.user);
  return <ResetPassword userId={user?.id} />;
};

const userRoutes = {
  path: "/user",
  element: (
    <ProtectedDashboardUserRoute>
      <UserDashboardLayout />
    </ProtectedDashboardUserRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <UserDashboardPage />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "edit-profile",
      element: <Profile />,
    },
    {
      path: "reset-password",
      element: <ResetPasswordWrapper />,
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
      path: "edit-profile",
      element: <EditProfile />,
    },
    {
      path: "reset-password",
      element: <ResetPasswordWrapper />,
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
        <App />
      </ProtectedRoute>
    ),
    loader: loginLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
  userRoutes,
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
