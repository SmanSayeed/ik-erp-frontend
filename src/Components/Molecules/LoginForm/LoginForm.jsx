import InputField from '../../Atoms/InputField/InputField';
import Button from '../../Atoms/Button/Button';

import PropTypes from 'prop-types';
function LoginForm({ formik, isLoading }) {
  return (
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
      <Button label="Login" isLoading={isLoading} disabled={formik.isSubmitting} />
    </form>
  );
}
LoginForm.propTypes = {
    formik: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
export default LoginForm;
