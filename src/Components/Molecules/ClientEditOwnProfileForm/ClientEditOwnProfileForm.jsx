import { useState } from 'react';
import { useUpdateProfileMutation } from '@/services/clientsApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { setCredentials } from '../../../features/authSlice';

const ClientEditOwnProfileForm = () => {
  const dispatch = useDispatch();
  const { client, token, role } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    address: client?.address || '',
    phone: client?.phone || '',
    payment_due_date: client?.payment_due_date || '',
    vat_slab: client?.vat_slab || '',
    gbs_information: client?.gbs_information || '',
    is_vip: client?.is_vip || false,
    vip_discount: client?.vip_discount || '',
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profileData).unwrap();
      toast.success(response.message || 'Profile updated successfully');
      console.log(response);
      dispatch(setCredentials({ 
        client: response.data.client,
        token,
        role
      }));
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          name="name"
          type="text"
          value={profileData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          value={profileData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <Input
          id="address"
          name="address"
          type="text"
          value={profileData.address}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <Input
          id="phone"
          name="phone"
          type="text"
          value={profileData.phone}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="payment_due_date" className="block text-sm font-medium text-gray-700">Payment Due Date</label>
        <Input
          id="payment_due_date"
          name="payment_due_date"
          type="date"
          value={profileData.payment_due_date}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="vat_slab" className="block text-sm font-medium text-gray-700">VAT Slab</label>
        <Input
          id="vat_slab"
          name="vat_slab"
          type="number"
          value={profileData.vat_slab}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="gbs_information" className="block text-sm font-medium text-gray-700">GBS Information</label>
        <Input
          id="gbs_information"
          name="gbs_information"
          type="text"
          value={profileData.gbs_information}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="is_vip" className="block text-sm font-medium text-gray-700">VIP Status</label>
        <Checkbox
          id="is_vip"
          name="is_vip"
          checked={profileData.is_vip}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="vip_discount" className="block text-sm font-medium text-gray-700">VIP Discount</label>
        <Input
          id="vip_discount"
          name="vip_discount"
          type="number"
          value={profileData.vip_discount}
          onChange={handleChange}
          disabled={isLoading || !profileData.is_vip}
        />
      </div>
      

     

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};

export default ClientEditOwnProfileForm;
