import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/authApi';
import { setCredentials } from '../../features/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Loader from '../Atoms/Loader/Loader';// Import the Loader component

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

function Login() {
  const [login, { isLoading }] = useLoginMutation(); // Use isLoading from RTK Query
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
        localStorage.setItem('token', userData.data.token);// Store token in localStorage
        toast.success('Login successful!');
        navigate('/dashboard');
      } catch (err) {
        if (err?.data?.message) {
          toast.error(err.data.message); // Show error message from the API
        } else {
          toast.error('Failed to login. Please try again.');
        }
      }
    },
  });

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        {isLoading ? (
          <Loader /> // Show loader if isLoading is true
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="flex justify-between items-center">
              <Link to="/register" className="text-sm text-blue-600 hover:underline">
                Register
              </Link>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}
      </div>
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://ucarecdn.com/a9ed82c6-14f1-462e-849e-3b007c2aae87/')" }}>
        {/* Background image */}
      </div>
    </div>
  );
}

export default Login;
