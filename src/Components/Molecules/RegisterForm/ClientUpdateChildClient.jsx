import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get route parameters
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useGetChildClientProfileQuery, useUpdateChildClientMutation } from '../../../services/childClientsApi'; // Import the mutation hook
import { toast } from 'react-toastify';

const ClientUpdateChildClient = () => {
  // Get route parameters
  const { client_remotik_id, child_client_remotik_id } = useParams();

  const [isVip, setVip] = useState(false);

  const { data: childClientProfileData, isLoading: isLoadingChildClientProfile, error: childClientProfileError, refetch } = useGetChildClientProfileQuery({ client_remotik_id, child_client_remotik_id });

  // Mutation hook for updating a child client
  const [updateChildClient, { isLoading, isSuccess, isError, error }] = useUpdateChildClientMutation();

  // State for client data
  const [client, setClient] = useState({
    email: '',
    address: '',
    phone: '',
    gbs_information: '',
    vat_slab: '',
    name: '',
    is_vip: false,
    vip_discount: 0
  });

  useEffect(() => {
    if (childClientProfileData) {
      const childClient = childClientProfileData.data;
      setClient({
        email: childClient?.email || '',
        address: childClient?.address || '',
        phone: childClient?.phone || '',
        gbs_information: childClient?.gbs_information || '',
        vat_slab: childClient?.vat_slab || '',
        name: childClient?.name || '',
        is_vip: childClient?.is_vip || false,
        vip_discount: childClient?.vip_discount || 0
      });
      setVip(childClient?.is_vip || false); // Set the initial VIP state
    }
  }, [childClientProfileData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVip) {
      client.vip_discount = 0; // Set vip_discount to 0 if VIP is unchecked
    }
    // Pass an object with the necessary fields
    await updateChildClient({
      newClientData: client,
      client_remotik_id,
      child_client_remotik_id,
    })
      .unwrap() // Unwrap the result of the mutation
      .then(() => {
        toast.success('Client profile updated successfully');
        refetch();
      })
      .catch((error) => {
        toast.error('Failed to update client profile: ' + (error.data?.message || 'Unknown error'));
        console.error("Error updating child client: ", error);
      });
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'is_vip') {
      setVip(checked); // Set VIP state based on checkbox
      if (!checked) {
        setClient((prevClient) => ({
          ...prevClient,
          vip_discount: 0 // Reset vip_discount when VIP is unchecked
        }));
      }
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl my-3">Update Client Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        <input name="password" type="hidden" value="password" />
        <input name="password_confirmation" type="hidden" value="password" />

        <div>
          <span className="block text-sm font-bold text-gray-700">Client Remotik ID: {child_client_remotik_id}</span>
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

        <div>
          <label htmlFor="is_vip" className="block text-sm font-medium text-gray-700">Is VIP</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_vip"
              name="is_vip"
              checked={client.is_vip}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label htmlFor="vip_discount" className="block text-sm font-medium text-gray-700">VIP Discount</label>
          <Input
            disabled={!isVip}
            id="vip_discount"
            name="vip_discount"
            type="number"
            value={client.vip_discount}
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
      </form>
    </>
  );
};

export default ClientUpdateChildClient;
