import React, { useState } from 'react';
import { useRegisterMutation } from '../../services/registerApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../Atoms/Loader/Loader';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('client');
  const [register, { isLoading }] = useRegisterMutation();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    try {
      const response = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      }).unwrap();

      // Debugging log
      console.log('Registration response:', response);

      toast('Registration successful!');
      // Optionally, redirect or perform additional actions here
    } catch (err) {
      if (err?.data?.data) {
        // Handle field-specific errors
        const fieldErrors = err.data.data;
        setErrors({
          name: fieldErrors.name ? fieldErrors.name.join(', ') : '',
          email: fieldErrors.email ? fieldErrors.email.join(', ') : '',
          password: fieldErrors.password ? fieldErrors.password.join(', ') : '',
          passwordConfirmation: fieldErrors.password_confirmation ? fieldErrors.password_confirmation.join(', ') : '',
          role: fieldErrors.role ? fieldErrors.role.join(', ') : '',
        });
      } else {
        toast.error('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
        <div className='flex flex-col items-center justify-center gap-2 mb-3'>
          <h2 className="text-3xl font-semibold text-center">Register</h2>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Login
          </Link>
        </div>

        {isLoading ? (
          <Loader /> // Show loader while processing
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full p-2 border border-gray-300 rounded ${errors.name ? 'border-red-500' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-2 border border-gray-300 rounded ${errors.email ? 'border-red-500' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full p-2 border border-gray-300 rounded ${errors.password ? 'border-red-500' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password_confirmation">
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                className={`w-full p-2 border border-gray-300 rounded ${errors.passwordConfirmation ? 'border-red-500' : ''}`}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              {errors.passwordConfirmation && <p className="text-red-500 text-sm">{errors.passwordConfirmation}</p>}
            </div>
            {/* Uncomment if you need role selection */}
            {/* <div>
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                className={`w-full p-2 border border-gray-300 rounded ${errors.role ? 'border-red-500' : ''}`}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div> */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://ucarecdn.com/a9ed82c6-14f1-462e-849e-3b007c2aae87/')" }}>
        {/* Background image */}
      </div>
    </div>
  );
}

export default Register;
