import React, { useState, useEffect } from 'react';
import { useCreateInvoiceMutation } from '../../../services/invoicesApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PreviewInvoice from '../../Molecules/Invoice/PreviewInvoice'; // Import the PreviewInvoice component
import { useGetClientsFromNodeJsQuery } from '../../../services/clientsApi';

export default function CreateInvoice() {
  const [createInvoice, { isLoading, error }] = useCreateInvoiceMutation();
  const { data: clients, isLoading: isLoadingClients, error: errorClients } = useGetClientsFromNodeJsQuery();
  
  const [invoiceId, setInvoiceId] = useState(null); // Store invoice ID for preview
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    due_date: '',
    client_remotik_id: '',
  });

  const [formErrors, setFormErrors] = useState({}); // Store validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createInvoice(formData).unwrap();
      // Clear previous errors
      setFormErrors({});
      
      // Alert user
      toast.success('Invoice created successfully');

      // Set the invoice ID for preview
      setInvoiceId(data.id); // Assuming `data` contains the invoice ID

    } catch (err) {
      console.error('Failed to create invoice:', err?.data?.message);
      toast.error( err?.data?.message);

      if (err?.status === 422 && err?.data?.data) {
        setFormErrors(err.data.data); // Set validation errors if present
      }
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
            {formErrors?.from && (
              <p className="text-red-500 mt-1">{formErrors.from[0]}</p> // Show from date error if exists
            )}
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
            {formErrors?.to && (
              <p className="text-red-500 mt-1">{formErrors.to[0]}</p> // Show to date error if exists
            )}
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
            {formErrors?.due_date && (
              <p className="text-red-500 mt-1">{formErrors.due_date[0]}</p> // Show due date error if exists
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Client Remotik ID</label>
            <select
              required
              name="client_remotik_id"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Client</option>
              {clients?.data.map((client, index) => (
                <option key={index} value={client}>
                  {client}
                </option>
              ))}
            </select>
            {formErrors?.client_remotik_id && (
              <p className="text-red-500 mt-1">{formErrors.client_remotik_id[0]}</p> // Show error for client Remotik ID
            )}
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
