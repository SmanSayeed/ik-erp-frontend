import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useBecomeSellerMutation } from '@/services/clientsApi';
import { Button } from '../../ui/button';

const ClientBecomeASeller = () => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.auth);

  const [becomeSeller, { isLoading }] = useBecomeSellerMutation();

  const [sellerData, setSellerData] = useState({
    company_name: '',
    company_address: '',
    company_logo: '',
    company_vat_number: '',
    company_kvk_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerData({
      ...sellerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await becomeSeller({ clientId: client.id, ...sellerData }).unwrap();
      toast.success(response.message || 'Successfully registered as a seller');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to register as a seller');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          value={sellerData.company_name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="company_address" className="block text-sm font-medium text-gray-700">Company Address</label>
        <input
          id="company_address"
          name="company_address"
          type="text"
          value={sellerData.company_address}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="company_logo" className="block text-sm font-medium text-gray-700">Company Logo</label>
        <input
          id="company_logo"
          name="company_logo"
          type="file"
          value={sellerData.company_logo}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="company_vat_number" className="block text-sm font-medium text-gray-700">Company VAT Number</label>
        <input
          id="company_vat_number"
          name="company_vat_number"
          type="text"
          value={sellerData.company_vat_number}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="company_kvk_number" className="block text-sm font-medium text-gray-700">Company KVK Number</label>
        <input
          id="company_kvk_number"
          name="company_kvk_number"
          type="text"
          value={sellerData.company_kvk_number}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Become a Seller'}
      </Button>
    </form>
  );
};

export default ClientBecomeASeller;
