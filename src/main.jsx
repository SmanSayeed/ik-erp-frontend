import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { store } from './store';
import './index.css';
import ErrorPage from "./error-page";
import Dashboard from './Components/Organism/Dashboard';
import DashboardLayout from './Components/Layout/DashboardLayout';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
// import ProtectedDashboardRoute from './Components/Auth/ProtectedDashboardRoute';
import { loginLoader } from './loaders/loginloader';
import { registerLoader } from './loaders/registerloader';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify
import RegisterPage from './Components/Organism/RegisterPage';
import EmailVerificationPage from './Components/Organism/EmailVerificationPage';
import UsersListPage from './Components/Organism/Admin/UsersListPage';
import router from './router.jsx';



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* ToastContainer added globally */}
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
    </Provider>
  </StrictMode>
);
