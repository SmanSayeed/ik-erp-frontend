import { useState } from 'react';
import { useUpdateProfileMutation } from '@/services/clientsApi';  // Updated to `clientsApi`
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';  // Assuming Select component is available
import { Checkbox } from '@/components/ui/checkbox';  // Assuming Checkbox component is available
import { setCredentials } from '../../../features/authSlice';

const ClientEditOwnProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [clientType, setClientType] = useState(user?.client_type || 'buyer');
  const [paymentDueDate, setPaymentDueDate] = useState(user?.payment_due_date || '');
  const [vatSlab, setVatSlab] = useState(user?.vat_slab || '');
  const [gbsInformation, setGbsInformation] = useState(user?.gbs_information || '');
  const [isVip, setIsVip] = useState(user?.is_vip || false);
  const [vipDiscount, setVipDiscount] = useState(user?.vip_discount || '');
  const [status, setStatus] = useState(user?.status || true);
  const [parentClientId, setParentClientId] = useState(user?.parent_client_id || '');

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        name,
        email,
        address,
        phone,
        client_type: clientType,
        payment_due_date: paymentDueDate,
        vat_slab: vatSlab,
        gbs_information: gbsInformation,
        is_vip: isVip,
        vip_discount: vipDiscount,
        status,
        parent_client_id: parentClientId,
      };

      const response = await updateProfile(profileData).unwrap();
      toast.success(response.message || 'Profile updated successfully');
      dispatch(setCredentials({ user: response.data }));
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <Input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="clientType" className="block text-sm font-medium text-gray-700">Client Type</label>
        <select id="clientType" value={clientType} onChange={(e) => setClientType(e.target.value)} disabled={isLoading}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="both">Both</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="paymentDueDate" className="block text-sm font-medium text-gray-700">Payment Due Date</label>
        <Input id="paymentDueDate" type="date" value={paymentDueDate} onChange={(e) => setPaymentDueDate(e.target.value)} disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="vatSlab" className="block text-sm font-medium text-gray-700">VAT Slab</label>
        <Input id="vatSlab" type="number" value={vatSlab} onChange={(e) => setVatSlab(e.target.value)} disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="gbsInformation" className="block text-sm font-medium text-gray-700">GBS Information</label>
        <Input id="gbsInformation" type="text" value={gbsInformation} onChange={(e) => setGbsInformation(e.target.value)} disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="isVip" className="block text-sm font-medium text-gray-700">VIP Status</label>
        <Checkbox id="isVip" checked={isVip} onChange={(e) => setIsVip(e.target.checked)} disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="vipDiscount" className="block text-sm font-medium text-gray-700">VIP Discount</label>
        <Input id="vipDiscount" type="number" value={vipDiscount} onChange={(e) => setVipDiscount(e.target.value)} disabled={isLoading || !isVip} />
      </div>
      
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <Checkbox id="status" checked={status} onChange={(e) => setStatus(e.target.checked)} disabled={isLoading} />
      </div>
      
      <div>
        <label htmlFor="parentClientId" className="block text-sm font-medium text-gray-700">Parent Client ID</label>
        <Input id="parentClientId" type="number" value={parentClientId} onChange={(e) => setParentClientId(e.target.value)} disabled={isLoading} />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
    </>
    
  );
};

export default ClientEditOwnProfileForm;
