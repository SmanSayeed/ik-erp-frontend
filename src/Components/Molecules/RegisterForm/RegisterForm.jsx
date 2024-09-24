import InputField from '../../Atoms/InputField/InputField';
import PropTypes from 'prop-types';
import CustomButton from '../../Atoms/CustomButton/CustomButton';
function RegisterForm({ name, setName, email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation, errors, handleSubmit, isLoading,setClient_remotik_id,client_remotik_id }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Client Remotik ID"
        id="client_remotik_id"
        type="text"
        value={client_remotik_id}
        onChange={(e) => setClient_remotik_id(e.target.value)}
        error={errors.client_remotik_id}
      />
      <InputField
        label="Name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <InputField
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <InputField
        label="Confirm Password"
        id="password_confirmation"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        error={errors.passwordConfirmation}
      />
      <CustomButton label="Register" isLoading={isLoading} />
    </form>
  );
}

export default RegisterForm;

RegisterForm.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
    setPasswordConfirmation: PropTypes.func.isRequired,
    client_remotik_id:PropTypes.func.isRequired,
    setClient_remotik_id:PropTypes.func.isRequired,
    errors: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      client_remotik_id: PropTypes.string,
      passwordConfirmation: PropTypes.string,
    }),
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
  