// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";
import Dashboard from "./Components/Organism/Dashboard";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
// import ProtectedDashboardRoute from './Components/Auth/ProtectedDashboardRoute';
import { loginLoader } from "./loaders/loginloader";
import { registerLoader } from "./loaders/registerloader";
import RegisterPage from "./Components/Organism/RegisterPage";
import EmailVerificationPage from "./Components/Organism/EmailVerificationPage";
import UsersListPage from "./Components/Organism/Admin/UsersListPage";
import ProtectedDashboardRoute from "./Components/Auth/ProtectedDashboardRoute";
import EditProfile from "./Components/Molecules/EditProfile/EditProfile";
import ResetPassword from "./Components/Molecules/ResetPassword/ResetPassword";
import { useSelector } from "react-redux";
import ForgetPassword from "./Components/Molecules/ResetPassword/ForgotPassword";
import ForgotPassword from "./Components/Molecules/ResetPassword/ForgotPassword";
import ResetPasswordByEmail from "./Components/Molecules/ResetPassword/ResetPasswordByEmail";
import ProtectedDashboardUserRoute from "./Components/Auth/ProtectedDashboardUserRoute";
import UserDashboardLayout from "./Components/Layout/UserDashboardLayout";
import Profile from "./Components/Molecules/Profile/Profile";

const ResetPasswordWrapper = () => {
  const user = useSelector((state) => state.auth.user);
  return <ResetPassword userId={user?.id} />;
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
    path: "/user/dashboard",
    element: (
      <ProtectedDashboardUserRoute>
        <UserDashboardLayout />
    </ProtectedDashboardUserRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
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
        path:"reset-password",
        element: <ResetPasswordWrapper />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedDashboardRoute>
        <DashboardLayout />
      </ProtectedDashboardRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "user-profile/:id",
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
        path:"reset-password",
        element: <ResetPasswordWrapper />,
      }
    ],
  },
  {
    path: "/verify-email",
    element: <EmailVerificationPage />,
  },
]);



export default router;
