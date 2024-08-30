import InputField from '../../Atoms/InputField/InputField';

import PropTypes from 'prop-types';
import CustomButton from '../../Atoms/CustomButton/CustomButton';
import StyledLink from '../../Atoms/StyledLink/StyledLink';
function LoginForm({ formik, isLoading }) {
  return (
    <>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
      <InputField
        label="Email"
        id="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
      />
      <CustomButton label="Login" isLoading={isLoading} disabled={formik.isSubmitting} />
    </form>
      <StyledLink className="text-sm underline blue-500 font-bold " to="/forgot-password">Forgot password</StyledLink>
    </>

  );
}
LoginForm.propTypes = {
    formik: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
export default LoginForm;
