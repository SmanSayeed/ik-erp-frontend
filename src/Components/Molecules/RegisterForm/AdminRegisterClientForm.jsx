import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";


const AdminRegisterClientForm = ({ client, onSubmit }) => {
  const [isVip,setVip] = useState(client.is_vip);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const addedClientInfo = Object.fromEntries(formData.entries());
    // Convert checkbox values to boolean
    addedClientInfo.email_verified_at = formData.get('email_verified_at') === 'on';
    addedClientInfo.status = formData.get('status') === 'on';

    addedClientInfo.is_seller = formData.get('is_seller') === 'on';
    addedClientInfo.is_vip = formData.get('is_vip') === 'on';
    onSubmit(addedClientInfo);
    setVip(addedClientInfo.is_vip);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div>
        <label htmlFor="client_remotik_id" className="block text-sm font-medium text-gray-700">Client Remotik ID</label>
        <Input
          id="client_remotik_id"
          name="client_remotik_id"
          defaultValue={client.client_remotik_id}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required="true"
        />
      </div>
      <div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          name="email"
          defaultValue={client.email}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          name="name"
          defaultValue={client.name}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <Input
          id="address"
          name="address"
          defaultValue={client.address || ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <Input
          id="phone"
          name="phone"
          defaultValue={client.phone || ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
      <div>
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          placeholder="Re-type password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
    
      <div>
        <label htmlFor="vat_slab" className="block text-sm font-medium text-gray-700">VAT Slab</label>
        <Input
          id="vat_slab"
          name="vat_slab"
          type="number"
          step="0.01"
          defaultValue={client.vat_slab || ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
      <div>
        <label htmlFor="gbs_information" className="block text-sm font-medium text-gray-700">GBS Information</label>
        <Input
          id="gbs_information"
          name="gbs_information"
          defaultValue={client.gbs_information || ''}
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
            onChange={() => setVip(!isVip)}
            defaultChecked={client.is_vip}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              required="true"
          />
        </div>
      </div>
     
      <div>
        <label htmlFor="vip_discount" className="block text-sm font-medium text-gray-700">Vip Discount </label>

        <Input
          disabled={!isVip}
          id="vip_discount"
          name="vip_discount"
          type="number"
          defaultValue={client.vip_discount}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required="true"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Verified</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="email_verified_at"
            name="email_verified_at"
            defaultChecked={client.email_verified_at !== null}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              required="true"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="status"
            name="status"
            defaultChecked={client.status}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              required="true"
          />
        </div>
        <div>
        <label htmlFor="is_seller" className="block text-sm font-medium text-gray-700">Is Seller</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_seller"
            name="is_seller"
            defaultChecked={client.is_seller}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              required="true"
          />
        </div>
      </div>
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" className="ml-3">Save</Button>
      </div>
    </form>
  );
};

export default AdminRegisterClientForm;
