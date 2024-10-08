import { useState } from 'react';
import { useClientRegisterMutation } from '../../services/registerApi';
import { toast } from 'react-toastify';
import RegisterForm from '../Molecules/RegisterForm/RegisterForm';
import AuthLayout from '../Layout/AuthLayout';
import StyledLink from '../Atoms/StyledLink/StyledLink';
import routes from '../../routes/routes';

function ClientRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [client_remotik_id, setClient_remotik_id] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [register, { isLoading }] = useClientRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await register({
        name,
        email,
        password,
        client_remotik_id,
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
    <StyledLink to={routes.login.link}>{routes.login.title}</StyledLink>
      </div>

        <RegisterForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      client_remotik_id={client_remotik_id}
      setClient_remotik_id={setClient_remotik_id}
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

export default ClientRegisterPage;
