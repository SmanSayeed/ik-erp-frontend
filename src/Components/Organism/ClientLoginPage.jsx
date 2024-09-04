import {
  useClientLoginMutation,
  useResendEmailMutation,
} from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import LoginForm from "../Molecules/LoginForm/LoginForm";
import { useState } from "react";
import AuthLayout from "../Layout/AuthLayout";
import StyledLink from "../Atoms/StyledLink/StyledLink";
import routes from "../../routes/routes";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

function ClientLoginPage() {
  const [resendLink, setResendLink] = useState(false);
  const [login, { isLoading }] = useClientLoginMutation();
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
        const clientData = await login(values).unwrap();
        const token = clientData.data.token;
        const role = clientData.data?.client?.role || "client"; // this role is important to check if user is admin or not
        const client = clientData.data?.client;
        const toRedux = { token, role, client };
        console.log('clientData',toRedux);
       
        if (clientData.data.token) {
          dispatch(setCredentials(toRedux));
          localStorage.setItem("token", clientData.data.token);
          localStorage.setItem("role", clientData.data.client.role); 
          toast.success("Login successful!");
          console.log("role======== ",role);
          if(role === "admin") navigate(routes.adminDashboard.link);
          if(role==="client") navigate(routes.ClientDashboard.link);
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
        <StyledLink to={routes.register.link}>{routes.register.title}</StyledLink>
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

export default ClientLoginPage;
