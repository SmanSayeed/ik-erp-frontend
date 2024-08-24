
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import LoginForm from '../Molecules/LoginForm/LoginForm';
import Loader from '../Atoms/Loader/Loader';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        localStorage.setItem('token', userData.data.token);
        toast.success('Login successful!');
        navigate('/dashboard');
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to login. Please try again.');
      }
    },
  });

  return isLoading ? <Loader /> : <LoginForm formik={formik} isLoading={isLoading} />;
}

export default LoginPage;
