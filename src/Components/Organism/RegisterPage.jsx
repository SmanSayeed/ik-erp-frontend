import { useState } from 'react';
import { useRegisterMutation } from '../../services/registerApi';
import { toast } from 'react-toastify';
import RegisterForm from '../Molecules/RegisterForm/RegisterForm';
import Loader from '../Atoms/Loader/Loader';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }).unwrap();
      toast.success('Registration successful!');
    } catch (err) {
      setErrors(err?.data?.data || {});
      toast.error('Failed to register. Please try again.');
    }
  };

  return isLoading ? <Loader /> : (
    <RegisterForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      passwordConfirmation={passwordConfirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      errors={errors}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default RegisterPage;
