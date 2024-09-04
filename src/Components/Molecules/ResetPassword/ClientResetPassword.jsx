import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StyledLink from '../../Atoms/StyledLink/StyledLink';
import routes from '../../../routes/routes';
import { useClientResetPasswordMutation } from '../../../services/clientsApi';

const ClientResetPassword = () => {
  const [resetPassword, { isLoading }] = useClientResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required('Old password is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Password confirmation is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await resetPassword({ data: values }).unwrap();
        toast.success(response.message || 'Password updated successfully');
      } catch (err) {
        if (err.status_code === 422) {
          const validationErrors = err.data?.password || [];
          validationErrors.forEach(error => toast.error(error));
        } else {
          toast.error(err.message || 'Failed to update password');
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="old_password" className="block text-sm font-medium text-gray-700">
          Old Password
        </label>
        <Input
          id="old_password"
          name="old_password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.old_password}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        {formik.touched.old_password && formik.errors.old_password ? (
          <div className="text-red-500 text-sm">{formik.errors.old_password}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password_confirmation}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
          <div className="text-red-500 text-sm">{formik.errors.password_confirmation}</div>
        ) : null}
      </div>

      <div className="flex justify-between">
        <StyledLink className="text-sm underline blue-500 font-bold " to={routes.forgotPassword.link}>{routes.forgotPassword.title}</StyledLink>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </form>
  );
};

export default ClientResetPassword;
