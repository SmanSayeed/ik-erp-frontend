import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get route parameters
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useRegisterChildClientMutation } from '../../../services/childClientsApi'; // Import the mutation hook

const ClientRegisterChildClient = () => {
  // Get route parameters
  const { client_remotik_id, child_client_remotik_id } = useParams();

  // Mutation hook for registering a child client
  const [registerChildClient, { isLoading, isSuccess, isError }] = useRegisterChildClientMutation();

  // State for client data
  const [client, setClient] = useState({
    name: '',
    email: '',
    password: 'password',
    password_confirmation: 'password',
    client_remotik_id: child_client_remotik_id, // Set the child_client_remotik_id as client_remotik_id
    address: '',
    phone: '',
    email_verified_at: true,
    status: true,
    is_parent: false,
    is_child: true,
    parent_client_id: client_remotik_id, // Set the parent_client_id as the current client_remotik_id
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the mutation function to submit the form data
    await registerChildClient(client);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  return (
    <>
    <div>
    <p className='text-yellow-500 p-2 bg-slate-800 rounded'>
       This client has no profile
      </p>

      <h2 className='text-2xl my-3'>
        Register Client Profile
      </h2>
    
    </div>
      <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form Fields */}
      <input name="password" type="hidden" value="password" />
      <input name="password_confirmation" type="hidden" value="password" />

      <div>
        <label htmlFor="client_remotik_id" className="block text-sm font-medium text-gray-700">Client Remotik ID</label>
        <Input
          id="client_remotik_id"
          type="text"
          name="client_remotik_id"
          value={child_client_remotik_id}
          readOnly
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          name="email"
          value={client.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          name="name"
          value={client.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <Input
          id="address"
          name="address"
          value={client.address}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <Input
          id="phone"
          name="phone"
          value={client.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="vat_slab" className="block text-sm font-medium text-gray-700">VAT Slab</label>
        <Input
          id="vat_slab"
          name="vat_slab"
          type="number"
          step="0.01"
          value={client.vat_slab}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="gbs_information" className="block text-sm font-medium text-gray-700">GBS Information</label>
        <Input
          id="gbs_information"
          name="gbs_information"
          value={client.gbs_information}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end">
        <Button type="submit" className="ml-3" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>

      {/* Feedback for Success or Error */}
      {isSuccess && <div className="text-green-500 mt-2">Client registered successfully!</div>}
      {isError && <div className="text-red-500 mt-2">Error registering client. Please try again.</div>}
    </form>
    </>
  
  );
};

export default ClientRegisterChildClient;
