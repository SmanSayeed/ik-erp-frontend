import React, { useEffect, useState } from 'react';
import { useGetInvoicesListQuery, useDeleteInvoiceMutation } from '../../../services/invoicesApi';
import { Link, useNavigate } from 'react-router-dom';
import apiConfig from '../../../config/apiConfig';
import routes from '../../../routes/routes';
import Pagination from '../../Atoms/Pagination/Pagination';

export default function InvoiceList() {
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const { data, error, isLoading, refetch } = useGetInvoicesListQuery(currentPage); // Pass current page to the query
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const navigate = useNavigate(); // For navigation

  // Set up invoice data only when it's available
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
  
    if (data && data?.data) {
      setInvoiceData(data?.data?.data); // Access 'data' array from the response
    }
  }, [data]);

  useEffect(() => {
    refetch(); // Refetch data on mount or page change
  }, [currentPage, refetch]);

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
    try {
      const downloadUrl = `${apiConfig.baseUrl}/invoice/download/${invoice_id}`;
      window.location.href = downloadUrl;
    } catch (err) {
      console.error('Failed to download invoice:', err);
    }
  };

  const thStyle = "py-2 px-4 border-b text-left text-sm font-medium";

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Invoice List</h1>
        <Link to={routes.adminCreateInvoice.link} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Invoice
        </Link>
      </div>

      {/* Show loader when data is loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="loader border-t-4 border-blue-500 w-12 h-12 border-solid rounded-full animate-spin"></div>
          <span className="ml-4 text-xl font-semibold">Loading invoices...</span>
        </div>
      )}

      {/* Show error message if there is an error */}
      {error && <p className="text-red-500">Error loading invoices: {error.message}</p>}

      {/* Render the table only if data is loaded */}
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className={thStyle}>ID</th>
                <th className={thStyle}>Client Name</th>
                <th className={thStyle}>Email</th>
                <th className={thStyle}>Generated by</th>
                <th className={thStyle}>Total Cost</th>
                <th className={thStyle}>Status</th>
                <th className={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData && invoiceData.length > 0 ? (
                invoiceData.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="py-2 px-4 border-b">{invoice.id}</td>
                    <td className="py-2 px-4 border-b">{invoice.client_name}</td>
                    <td className="py-2 px-4 border-b">{invoice.client_email}</td>
                    <td className="py-2 px-4 border-b">{invoice.invoice_generated_by_name}</td>
                    <td className="py-2 px-4 border-b">€{invoice.total_cost}</td>
                    <td className="py-2 px-4 border-b">{invoice.invoice_status}</td>
                    <td className="py-2 px-4 border-b flex gap-2">
                      <button className="text-gray-100 bg-slate-500 rounded px-2 py-1 font-semibold" onClick={() => handleDownload(invoice.id)}>
                        Download
                      </button>
                      <button className="text-red-100 bg-red-500 rounded px-2 py-1 font-semibold" onClick={() => handleDelete(invoice.id)}>
                        Delete
                      </button>
                      <Link className="text-blue-100 bg-blue-500 rounded px-2 py-1 font-semibold" to={routes.adminViewInvoice.link(invoice.id)}>View</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 border-b text-center">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && data?.meta && (
        <Pagination
          currentPage={data.meta.current_page}
          totalPages={data.meta.last_page}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
