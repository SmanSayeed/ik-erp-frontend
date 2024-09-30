// src/components/InvoiceList.js
import React from 'react';
import { useGetInvoicesListQuery, useDeleteInvoiceMutation } from '../../../services/invoicesApi';
import { Link, useNavigate } from 'react-router-dom';
import apiConfig from '../../../config/apiConfig';
import routes from '../../../routes/routes';
// Assuming you're using react-router

export default function InvoiceList() {
  const { data, error, isLoading , refetch} = useGetInvoicesListQuery();
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const navigate = useNavigate(); // For navigation

  const handleDelete = async (invoice_id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(invoice_id).unwrap();
        alert('Invoice deleted successfully');
        refetch();
      } catch (err) {
        console.error('Failed to delete invoice:', err);
        alert('Failed to delete invoice');
      }
    }
  };

  const handleView = (invoice_id) => {
    navigate(routes.adminViewInvoice.link(invoice_id));
  };

  const handleEdit = (invoice_id) => {
    navigate(routes.adminEditInvoice.link(invoice_id));
  };

  const handleDownload = async (invoice_id) => {
    // Call the API to download the invoice
    try {
        // Create the download link by hitting the backend directly
        const downloadUrl = `${apiConfig.baseUrl}/invoice/download/${invoice_id}`;
        window.location.href = downloadUrl;
      } catch (err) {
        console.error('Failed to download invoice:', err);
      }
    // try {
    //   const response = await fetch(`/invoice/download/${invoice_id}`);
    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', `invoice_${invoice_id}.pdf`);
    //   document.body.appendChild(link);
    //   link.click();
    //   link.parentNode.removeChild(link);
    // } catch (err) {
    //   console.error('Failed to download invoice:', err);
    // }
  };

  return (
    <div className="container mx-auto px-2 py-8">
        <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Invoice List</h1>
        <Link to={routes.adminCreateInvoice.link} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Invoice</Link>
        </div>
      
      {isLoading && <p>Loading invoices...</p>}
      {error && <p>Error loading invoices: {error.message}</p>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-1 px-2 border-b text-left">ID</th>
              <th className="py-1 px-2 border-b text-left">Client Name</th>
              <th className="py-1 px-2 border-b text-left">Email</th>
              <th className="py-1 px-2 border-b text-left">Total Cost</th>
              <th className="py-1 px-2 border-b text-left">Status</th>
              <th className="py-1 px-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data.length > 0 ? (
              data.data.data.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="py-1 px-2 border-b text-left">{invoice.id}</td>
                  <td className="py-1 px-2 border-b text-left">{invoice.client_name}</td>
                  <td className="py-1 px-2 border-b text-left">{invoice.client_email}</td>
                  <td className="py-1 px-2 border-b text-left">€{invoice.total_cost}</td>
                  <td className="py-1 px-2 border-b text-left">{invoice.invoice_status}</td>
                  <td className="py-1 px-2 border-b text-left flex gap-2 justify-start items-center">
                    <button className="text-gray-100 bg-slate-500 rounded px-2 py-1 font-semibold" onClick={() => handleDownload(invoice.id)}>Download</button>
                    {/* <button className="text-blue-100 bg-blue-500 rounded px-2 py-1 font-semibold" onClick={() => handleView(invoice.id)}>View</button>
                    <button className="text-yellow-100 bg-yellow-500 rounded px-2 py-1 font-semibold" onClick={() => handleEdit(invoice.id)}>Edit</button> */}
                    <button className="text-red-100 bg-red-500 rounded px-2 py-1 font-semibold" onClick={() => handleDelete(invoice.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-1 px-2 border-b text-center">No invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
