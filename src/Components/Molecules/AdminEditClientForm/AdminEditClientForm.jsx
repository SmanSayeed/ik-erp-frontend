import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";


const AdminEditClientForm = ({ client,setClient, onSubmit }) => {
  const [isVip,setVip] = useState(client.is_vip);
  const [vipDiscount, setVipDiscount] = useState(client.vip_discount || 0);
 
  useEffect(() => {
    setVip(client.is_vip); // Update isVip state when client.is_vip changes
    setVipDiscount(client.is_vip ? client.vip_discount || 0 : 0); // Set vip_discount to 0 if is_vip is false
  }, [client]);

    // Sync vipDiscount when isVip changes
    useEffect(() => {
      if (!isVip) {
        setVipDiscount(0); // Set vip_discount to 0 if VIP is unchecked
      }
    }, [isVip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedClient = Object.fromEntries(formData.entries());
    // Convert checkbox values to boolean
    updatedClient.email_verified_at = formData.get('email_verified_at') === 'on';
    updatedClient.status = formData.get('status') === 'on';
    updatedClient.is_seller = formData.get('is_seller') === 'on';
    updatedClient.is_vip = formData.get('is_vip') === 'on';
    // Handle VIP discount based on isVip state
    if (!isVip) {
      updatedClient.vip_discount = 0; // Set vip_discount to 0 if VIP is unchecked
    } else {
      updatedClient.vip_discount = formData.get('vip_discount') || 0;
    }
    onSubmit(updatedClient);
  };

  const handleIsVipChange = () => {
   
    setVip((prevIsVip) => {
    
      const newIsVip = !prevIsVip;
      console.log(newIsVip?"Yes":"no");
      if (!newIsVip) {
        console.log("set to 0");
        setVipDiscount(0); // If not VIP, set the vip_discount to 0
      } else {
        setVipDiscount(client.vip_discount || 0); // If VIP, retain the client’s vip_discount or set default 0
      }
      
      return newIsVip;
    });
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
        />
      </div>
      <div>
        <label>Email: {client.email}</label>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          name="name"
          defaultValue={client.name}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <Input
          id="address"
          name="address"
          defaultValue={client.address || ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <Input
          id="phone"
          name="phone"
          defaultValue={client.phone || ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Leave blank to keep current password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
          />
        </div>
      </div>
      <div>
        <label htmlFor="payment_due_date" className="block text-sm font-medium text-gray-700">Payment Due Date</label>
        <Input
          id="payment_due_date"
          name="payment_due_date"
          type="date"
          defaultValue={client.payment_due_date ? client.payment_due_date.split('T')[0] : ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
            onChange={() => handleIsVipChange()}
            defaultChecked={client.is_vip}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
      </div>
     
      <div>
        <label htmlFor="vip_discount" className="block text-sm font-medium text-gray-700">Vip Discount- {isVip ? 'true' : 'false'} </label>

        <Input
          disabled={!isVip}
          id="vip_discount"
          name="vip_discount"
          type="number"
          value={vipDiscount || 0}
          onChange={(e) => setVipDiscount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" className="ml-3">Save</Button>
      </div>
    </form>
  );
};

export default AdminEditClientForm;
