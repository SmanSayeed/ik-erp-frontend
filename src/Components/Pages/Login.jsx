// src/components/Pages/Login.jsx
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SidebarImage from "../Atoms/SidebarImage/SidebarImage";
import LoginPage from "../Organism/LoginPage";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        localStorage.setItem("token", userData.data.token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to login. Please try again.");
      }
    },
  });

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <LoginPage formik={formik} isLoading={isLoading} />
      </div>
      <SidebarImage imageUrl="https://ucarecdn.com/a9ed82c6-14f1-462e-849e-3b007c2aae87/" />
    </div>
  );
}

export default Login;