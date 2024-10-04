import InputField from '../../Atoms/Inputs/InputField/InputField';
import PropTypes from 'prop-types';
import CustomButton from '../../Atoms/CustomButton/CustomButton';
function AdminRegisterClientForm({ 
  name, 
  setName, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  passwordConfirmation, 
  setPasswordConfirmation, 
  errors, 
  handleSubmit, 
  isLoading,
  setClient_remotik_id,
  client_remotik_id ,
  address, setAddress,
  phone, setPhone,

}) {
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
       <InputField
        label="Address"
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={errors.passwordConfirmation}
      />
      <InputField
        label="phone"
        id="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={errors.passwordConfirmation}
      />
      <CustomButton label="Register" isLoading={isLoading} />
    </form>
  );
}

export default AdminRegisterClientForm;

AdminRegisterClientForm.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
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
  