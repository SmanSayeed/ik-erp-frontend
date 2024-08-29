import React from 'react';
import InputField from '../../Atoms/InputField/InputField';
import { Button } from '../../ui/button';
import { useForgotPasswordMutation } from '../../../services/passwordApi';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../../Layout/AuthLayout';
import StyledLink from '../../Atoms/StyledLink/StyledLink';

function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await forgotPassword({ email: values.email }).unwrap();
        toast.success('Password reset email sent successfully!');
        resetForm(); // Clear the form after success
      } catch (error) {
        console.log("calling this",error)
        toast.error('Error sending password reset email');
      }
    },
  });

  return (
    <AuthLayout>
      <div className="text-center p-10">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Send Reset Password Link'}
          </Button>
        </form>
        <StyledLink to="/">Back</StyledLink>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
