import { useState } from 'react';
import { useRegisterMutation } from '../../services/registerApi';
import { toast } from 'react-toastify';
import RegisterForm from '../Molecules/RegisterForm/RegisterForm';
import Loader from '../Atoms/Loader/Loader';
import { Link } from 'react-router-dom';
import AuthLayout from '../Layout/AuthLayout';
import StyledLink from '../Atoms/StyledLink/StyledLink';

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
      const response = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role: 'client'
      }).unwrap();
      toast.success(response.message || 'Registration successful!');
    } catch (err) {
      setErrors(err?.data?.data || {});
      toast.error('Failed to register. Please try again.');
    }
  };

  return  (
    <>
    <AuthLayout>
    <div className="flex flex-col gap-2 justify-center items-center">
    <h2 className="text-3xl font-semibold text-center mb-1">Register</h2>
    <StyledLink to="/">Login</StyledLink>
      </div>

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
    </AuthLayout>
    
    </>
   
  );
}

export default RegisterPage;
