import React, { useEffect, useState } from 'react';
import { useCreateChildClientInvoiceMutation } from '../../../services/invoicesApi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PreviewInvoice from '../../Molecules/Invoice/PreviewInvoice'; // Import the PreviewInvoice component
import { useGetChildClientsQuery } from '../../../services/childClientsApi';
import { useSelector } from 'react-redux';
import routes from '../../../routes/routes';

export default function ClientCreateInvoice() {
  const { client_remotik_id } = useParams();

  const {client} = useSelector((state) => state.auth);

  if(!client.is_seller){
    return <Navigate to={routes.ClientBecomeASeller.link} />;
  }

  const [createChildClientInvoice, { isLoading }] = useCreateChildClientInvoiceMutation();
  const [invoiceId, setInvoiceId] = useState(null); // Store invoice ID for preview
  const navigate = useNavigate();

  const { data: childClients, error: childClientError, isLoading: childClientLoading } = useGetChildClientsQuery(client_remotik_id);
  const [childClientData, setChildClientData] = useState([]);

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    due_date: '',
    parent_client_remotik_id: client_remotik_id,
    child_client_remotik_id: '',
  });

  const [formErrors, setFormErrors] = useState({}); // Store validation errors

  useEffect(() => {
    if (!childClientLoading && !childClientError) {
      setChildClientData(childClients);
    }
  }, [childClientLoading, childClientError, childClients]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createChildClientInvoice(formData).unwrap();

      if (data.id) {
        setFormErrors({}); // Clear previous errors
        toast.success('Invoice created successfully');
        setInvoiceId(data.id); // Set invoice ID for preview
      }
    } catch (err) {
      console.error('Failed to create invoice:', err);

      if (err?.status === 422 && err?.data?.data) {
        setFormErrors(err.data.data); // Set validation errors
      } else {
        toast.error('Failed to create invoice');
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
            <label className="block font-semibold mb-1">Parent Client Remotik ID</label>
            <input
              type="text"
              readOnly
              name="parent_client_remotik_id"
              value={formData.parent_client_remotik_id}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Child Client Remotik ID</label>
            <select
              name="child_client_remotik_id"
              value={formData.child_client_remotik_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Client</option>
              {childClientData.map((client, index) => (
                <option key={index} value={client.client_remotik_id}>
                  {client.name}
                </option>
              ))}
            </select>
            {formErrors?.child_client_remotik_id && (
              <p className="text-red-500 mt-1">{formErrors.child_client_remotik_id[0]}</p> // Show error for child client Remotik ID
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
          <PreviewInvoice invoice_id={invoiceId} /> {/* Pass the invoice ID to the PreviewInvoice component */}
        </div>
      )}
    </div>
  );
}
