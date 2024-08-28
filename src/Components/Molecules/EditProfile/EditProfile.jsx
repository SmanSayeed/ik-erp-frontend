import { useState } from 'react';
import { useUpdateProfileMutation } from '@/services/usersApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setCredentials } from '../../../features/authSlice';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user, token, role } = useSelector((state) => state.auth);
  console.log("user",user);
  const [name, setName] = useState(user?.name || '');
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
console.log("user",user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile({ name }).unwrap();
      toast.success(response.message || 'Profile updated successfully');
      dispatch(setCredentials({
        user: response.data, 
      }));
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};

export default EditProfile;
