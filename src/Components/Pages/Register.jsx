// src/components/Pages/Login.jsx

import SidebarImage from "../Atoms/SidebarImage/SidebarImage";
import RegisterPage from "../Organism/RegisterPage";
import { Link } from "react-router-dom";

function Register() {

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
        <Link to="/">Login</Link>
        <RegisterPage />
      </div>
      <SidebarImage imageUrl="https://ucarecdn.com/a9ed82c6-14f1-462e-849e-3b007c2aae87/" />
    </div>
  );
}

export default Register;
