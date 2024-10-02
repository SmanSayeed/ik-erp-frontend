// src/components/CreateInvoice.jsx
import React, { useState } from 'react';
import { useCreateInvoiceMutation } from '../../../services/invoicesApi';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/routes';

export default function CreateInvoice() {
  const [createInvoice, { isLoading, error }] = useCreateInvoiceMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    due_date: '',
    client_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInvoice(formData).unwrap();
      alert('Invoice created successfully');
      navigate(routes.adminInvoiceList.link);
    } catch (err) {
      console.error('Failed to create invoice:', err);
      alert('Failed to create invoice');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block font-semibold mb-1">Client ID</label>
          <input
            type="text"
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
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
    </div>
  );
}
