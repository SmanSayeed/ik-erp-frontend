import React, { useState } from 'react';
import { useCreateInvoiceMutation } from '../../../services/invoicesApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PreviewInvoice from '../../Molecules/Invoice/PreviewInvoice'; // Import the PreviewInvoice component
import { useGetClientsFromNodeJsQuery } from '../../../services/clientsApi';

export default function CreateInvoice() {
  const [createInvoice, { isLoading, error }] = useCreateInvoiceMutation();

  const {data:clients, isLoading: isLoadingClients, error: errorClients} = useGetClientsFromNodeJsQuery();

  console.log("clients from node js ",clients?.data);

  const [invoiceId, setInvoiceId] = useState(null); // Store invoice ID for preview
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    due_date: '',
    client_remotik_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createInvoice(formData).unwrap();

      // Alert user
      toast.success('Invoice created successfully');

      // Set the invoice ID for preview
      setInvoiceId(data.id); // Assuming `data` contains the invoice ID

      // Optional: Navigate to another route if needed
      // navigate(routes.adminInvoiceList.link);
    } catch (err) {
      console.error('Failed to create invoice for child client:', err?.data?.message);
      toast.error('Failed. '+err?.data?.message);
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
            <label className="block font-semibold mb-1">Client Remotik ID</label>
            <select required    name="client_remotik_id"  onChange={handleChange}  className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">Select Client</option>
              {clients?.data.map((client,index) => (
                <option key={index} value={client}>
                  {client}
                </option>
              ))}
            </select>
           
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
