// src/components/EditInvoice.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateInvoiceMutation, useViewInvoiceQuery } from '../../../services/invoicesApi';

export default function EditInvoice() {
  const { invoice_id } = useParams();
  const navigate = useNavigate();
  const { data: invoiceData, error, isLoading } = useViewInvoiceQuery(invoice_id);
  const [updateInvoice] = useUpdateInvoiceMutation();

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    total_cost: '',
    discount: '',
    due_date: '',
    // Add other fields as necessary
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInvoice({ invoice_id, data: formData }).unwrap();
      alert('Invoice updated successfully');
      navigate('/invoices');
    } catch (err) {
      console.error('Failed to update invoice:', err);
      alert('Failed to update invoice');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoice: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Edit Invoice</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="client_name"
          value={formData.client_name || invoiceData?.data.client_name}
          onChange={handleChange}
          placeholder="Client Name"
          required
        />
        <input
          type="email"
          name="client_email"
          value={formData.client_email || invoiceData?.data.client_email}
          onChange={handleChange}
          placeholder="Client Email"
          required
        />
        <input
          type="number"
          name="total_cost"
          value={formData.total_cost || invoiceData?.data.total_cost}
          onChange={handleChange}
          placeholder="Total Cost"
          required
        />
        {/* Add more fields as necessary */}
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Save</button>
      </form>
    </div>
  );
}
