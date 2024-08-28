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
        path: "users",
        element: <UsersListPage />,
      },
    ],
  },
  {
    path: "/verify-email",
    element: <EmailVerificationPage />,
  },
]);

export default router;
