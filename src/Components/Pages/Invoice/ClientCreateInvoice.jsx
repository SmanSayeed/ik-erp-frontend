import React, { useState } from 'react';
import { useCreateChildClientInvoiceMutation, useCreateInvoiceMutation } from '../../../services/invoicesApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PreviewInvoice from '../../Molecules/Invoice/PreviewInvoice'; // Import the PreviewInvoice component

export default function ClientCreateInvoice() {
  const { client_remotik_id } = useParams();
  const [createChildClientInvoice, { isLoading, error }] = useCreateChildClientInvoiceMutation();
  const [invoiceId, setInvoiceId] = useState(null); // Store invoice ID for preview
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    due_date: '',
    parent_client_remotik_id: client_remotik_id,
    child_client_remotik_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await createChildClientInvoice(formData,true).unwrap();

      if(data.id){
      // Alert user
      toast.success('Invoice created successfully');
      // Set the invoice ID for preview
      setInvoiceId(data.id); // Assuming `data` contains the invoice ID
      }else{
        console.log("Invoice create error-- ",error);
      }
      // Optional: Navigate to another route if needed
      // navigate(routes.adminInvoiceList.link);
    } catch (err) {
      console.error('Failed to create invoice:', err);
      alert('Failed to create invoice');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">From Date</label>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">To Date</label>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Parent Client Remotik ID</label>
            <input
              type="text"
              readOnly
              name="parent_client_remotik_id"
              value={formData.parent_client_remotik_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Child Client Remotik ID</label>
            <input
              type="text"
              name="child_client_remotik_id"
              value={formData.child_client_remotik_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Invoice...' : 'Create Invoice'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">Failed to create invoice</p>}
      </form>

      {invoiceId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
          {/* Pass the invoice ID to the PreviewInvoice component */}
          <PreviewInvoice invoice_id={invoiceId} />
        </div>
      )}
    </div>
  );
}
