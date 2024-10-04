import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useResetPasswordByEmailMutation } from '../../../services/passwordApi';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import InputField from '../../Atoms/Inputs/InputField/InputField';
import { Button } from '../../ui/button';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const ResetPasswordByEmail = () => {
  const [resetPasswordByEmail, { isLoading }] = useResetPasswordByEmailMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!email || !token) {
      toast.error('Invalid request. Missing email or token.');
      navigate('/'); // Redirect to home or error page
    }
  }, [email, token, navigate]);

  const handleSubmit = async (values) => {
    try {
        console.log('values,email,token',{ ...values, email, token });
      // Include email and token in the request payload
      await resetPasswordByEmail({ ...values, email, token }).unwrap();
      toast.success('Password reset successful! You can now log in.');
      navigate('/'); // Redirect to login page after successful reset
    } catch (error) {
      if (error.status === 422) {
        toast.error('The provided token is invalid or has already been used.');
      } else {
        toast.error('Error resetting password');
      }
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <Formik
        initialValues={{ password: '', password_confirmation: '' }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className="space-y-4">
            <InputField
              label="New Password"
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <InputField
              label="Confirm Password"
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={values.password_confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password_confirmation && errors.password_confirmation}
            />
            <Button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPasswordByEmail;
