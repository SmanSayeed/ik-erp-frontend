import React, { useEffect, useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
// import { useAdminGetSellerInfoQuery, useGetClientByIdQuery } from '../../../services/adminManagesClientsApi';
import { useAdminGetSellerInfoQuery, useAdminUpdateSellerInfoMutation } from '../../../services/adminManagesClientsApi';

export default function AdminManageSellerProfile() {
  const { clientId } = useParams();
  const { data, isLoading, error } = useAdminGetSellerInfoQuery(clientId);

  console.log("seller data",data);
  const [adminUpdateSellerInfo] = useAdminUpdateSellerInfoMutation();
  const [formData, setFormData] = useState({
    company_name: '',
    company_address: '',
    company_logo: null,
    company_vat_number: '',
    company_kvk_number: '',
    company_iban_number: '',
    status: false,
    client_id:clientId,
    client_remotik_id:''
  });

  // Update formData when the data is fetched
  useEffect(() => {
    if (data && data.data ) {
      const sellerData = data.data;
      setFormData({
        company_name: sellerData.company_name || '',
        company_address: sellerData.company_address || '',
        company_logo: null,
        company_vat_number: sellerData.company_vat_number || '',
        company_kvk_number: sellerData.company_kvk_number || '',
        company_iban_number: sellerData.company_iban_number || '',
        status: sellerData.status===1? true: false,
        client_remotik_id:sellerData?.client_remotik_id
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData - ",formData)
    const payload = {
        company_name: formData.company_name,
        company_address: formData.company_address,
        company_logo: formData.company_logo, // Handle file uploading separately if needed
        company_vat_number: formData.company_vat_number,
        company_kvk_number: formData.company_kvk_number,
        status: formData.status?true:false,
      };
    console.log("payload - ",payload)
  
    try {
      await adminUpdateSellerInfo({ clientId, data: payload }).unwrap(); // Pass 'clientId' instead of 'id'
      toast.success('Seller profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update seller profile.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading seller profile: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Seller Profile</h2>
      {data && data.data && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
            <Input
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="company_address" className="block text-sm font-medium text-gray-700">Company Address</label>
            <Input
              id="company_address"
              name="company_address"
              value={formData.company_address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="company_logo" className="block text-sm font-medium text-gray-700">Company Logo</label>
            <Input
              id="company_logo"
              name="company_logo"
              type="file"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="company_vat_number" className="block text-sm font-medium text-gray-700">Company VAT Number</label>
            <Input
              id="company_vat_number"
              name="company_vat_number"
              value={formData.company_vat_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="company_kvk_number" className="block text-sm font-medium text-gray-700">Company KVK Number</label>
            <Input
              id="company_kvk_number"
              name="company_kvk_number"
              value={formData.company_kvk_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="company_iban_number" className="block text-sm font-medium text-gray-700">Company IBAN Number</label>
            <Input
              id="company_iban_number"
              name="company_iban_number"
              value={formData.company_iban_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" className="ml-3">Save</Button>
          </div>
        </form>
      )}
    </div>
  );
}
