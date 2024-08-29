import {
  useLoginMutation,
  useResendEmailMutation,
} from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import LoginForm from "../Molecules/LoginForm/LoginForm";
import Loader from "../Atoms/Loader/Loader";
import { useState } from "react";
import AuthLayout from "../Layout/AuthLayout";
import StyledLink from "../Atoms/StyledLink/StyledLink";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

function LoginPage() {
  const [resendLink, setResendLink] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resendEmail] = useResendEmailMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = await login(values).unwrap();
        const token = userData.data.token;
        const role = userData.data.user.role;
        const user = userData.data.user;
        const toRedux = { token, role, user };
        console.log('userData',toRedux);
       
        if (userData.data.token) {
          dispatch(setCredentials(toRedux));
          localStorage.setItem("token", userData.data.token);
          localStorage.setItem("role", userData.data.user.role); 
          toast.success("Login successful!");
          if(role === "admin") navigate("/dashboard");
          if(role=="client") navigate("/user/dashboard");
        } else {
          toast.error("Failed to login. Please try again.");
        }
      } catch (err) {
        const email_not_verified_error = "Email not verified.";
        toast.error(err?.data?.message || "Failed to login. Please try again.");
        if (err?.data?.message === email_not_verified_error) {
          setResendLink(true);
        }
      }
    },
  });

  const handleResendEmail = async () => {
    try {
      await resendEmail(formik.values.email).unwrap();
      toast.success("Verification email resent successfully.");
    } catch (err) {
      toast.error("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-3xl font-semibold text-center mb-1">Login</h2>
        <StyledLink to="/register">Register</StyledLink>
        </div>
     
        <LoginForm formik={formik} isLoading={isLoading} />
        {resendLink && (
          <>
            <p className="text-red-500">
              Please check your email to verify your account.
            </p>
            <button
              onClick={handleResendEmail}
              className="text-blue-600 hover:underline mb-4"
            >
              Resend Verification Email
            </button>
          </>
        )}
      </AuthLayout>
    </>
  );
}

export default LoginPage;
