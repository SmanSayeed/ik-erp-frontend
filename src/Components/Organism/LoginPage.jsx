
import { useLoginMutation, useResendEmailMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import LoginForm from '../Molecules/LoginForm/LoginForm';
import Loader from '../Atoms/Loader/Loader';
import { useState } from 'react';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

function LoginPage() {
  const [resendLink,setResendLink] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resendEmail] = useResendEmailMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        if(userData.data.token){
          localStorage.setItem('token', userData.data.token);
          toast.success('Login successful!');
          navigate('/dashboard');
        }else{
          toast.error('Failed to login. Please try again.');
        }
      
      } catch (err) {
        const email_not_verified_error = "Email not verified";
        toast.error(err?.data?.message || 'Failed to login. Please try again.');
        if(err?.data?.message === email_not_verified_error ){
          setResendLink(true);
        }
      }
    },
  });

  const handleResendEmail = async () => {
    try {
      await resendEmail().unwrap();
      toast.success('Verification email resent successfully.');
    } catch (err) {
      toast.error('Failed to resend verification email. Please try again.');
    }
  };

  return( 
    isLoading ? 
    <Loader /> : 
   (<>
      <LoginForm formik={formik} isLoading={isLoading} />
      {resendLink && (<>
        <p className="text-red-500">Please check your email to verify your account.</p>
        <button
            onClick={handleResendEmail}
            className="text-blue-600 hover:underline mb-4"
          >
            Resend Verification Email
          </button>
      </>
       )}
   </>
  
)
  );
}

export default LoginPage;
