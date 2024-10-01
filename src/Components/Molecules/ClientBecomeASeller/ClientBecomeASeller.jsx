import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useBecomeSellerMutation } from '@/services/clientsApi';
import { Button } from '../../ui/button';
import useSellerData from '../../hooks/useSellerData';
import { Input } from '../../ui/input';
import { setCredentials } from '../../../features/authSlice';

const ClientBecomeASeller = () => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.auth);

  const [becomeSeller, { isLoading }] = useBecomeSellerMutation();
  const { sellerData, isFetching, isError } = useSellerData(client?.id);

  const [sellerFormData, setSellerFormData] = useState({
    company_name: sellerData?.company_name || '',
    company_address: sellerData?.company_address || '',
    company_logo: null,
    company_vat_number: sellerData?.company_vat_number || '',
    company_kvk_number: sellerData?.company_kvk_number || '',
    client_id: client?.id,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerFormData({
      ...sellerFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await becomeSeller({ clientId: client.id, ...sellerFormData }).unwrap();
      toast.success(response.message || 'Successfully registered as a seller');
      
      // Update the client with the seller status
      dispatch(setCredentials({
        client: { ...client, is_seller: 1 } // Assuming `is_seller` flag will be set to 1 after registration
      }));
    } catch (error) {
      if (error?.status === 422) {
        setErrors(error.data.data);
      } else {
        toast.error(error?.data?.message || 'Failed to register as a seller');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 my-2">
          Company Name
        </label>
        <Input
          id="company_name"
          name="company_name"
          type="text"
          value={sellerFormData.company_name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="company_address" className="block text-sm font-medium text-gray-700 my-2">
          Company Address
        </label>
        <Input
          id="company_address"
          name="company_address"
          type="text"
          value={sellerFormData.company_address}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="company_vat_number" className="block text-sm font-medium text-gray-700 my-2">
          Company VAT Number
        </label>
        <Input
          id="company_vat_number"
          name="company_vat_number"
          type="text"
          value={sellerFormData.company_vat_number}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errors.company_vat_number && (
          <p className="text-red-600 text-sm">{errors.company_vat_number[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="company_kvk_number" className="block text-sm font-medium text-gray-700 my-2">
          Company KVK Number
        </label>
        <Input
          id="company_kvk_number"
          name="company_kvk_number"
          type="text"
          value={sellerFormData.company_kvk_number}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errors.company_kvk_number && (
          <p className="text-red-600 text-sm">{errors.company_kvk_number[0]}</p>
        )}
      </div>

      {errors.client_id && (
        <p className="text-red-600 text-sm">{errors.client_id[0]}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading || isFetching}>
        {isLoading || isFetching ? 'Submitting...' : 'Become a Seller'}
      </Button>
    </form>
  );
};

export default ClientBecomeASeller;
