import React, { useEffect, useState } from 'react';
import { useGetInvoicesListQuery, useDeleteInvoiceMutation } from '../../../services/invoicesApi';
import { Link, useNavigate } from 'react-router-dom';
import apiConfig from '../../../config/apiConfig';
import routes from '../../../routes/routes';
import Pagination from '../../Atoms/Pagination/Pagination';
import InvoiceCard from '../../Molecules/Invoice/InvoiceCard';// Import the InvoiceCard component

export default function InvoiceList() {
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const { data, error, isLoading, refetch } = useGetInvoicesListQuery({ page: currentPage }); // Pass current page to the query
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const navigate = useNavigate(); // For navigation

  // Set up invoice data only when it's available
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    if (data) {
      setInvoiceData(data?.data?.data || []); // Access 'data' array from the response
      setPagination(data?.data?.pagination || {});
    }
  }, [data]);

  useEffect(() => {
    refetch(); // Refetch data when currentPage changes
  }, [currentPage, refetch]);

  const handleDelete = async (invoice_id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(invoice_id).unwrap();
        alert('Invoice deleted successfully');
        refetch(); // Refetch to get updated list after deletion
      } catch (err) {
        console.error('Failed to delete invoice:', err);
        alert('Failed to delete invoice');
      }
    }
  };

  const handleDownload = async (invoice_id) => {
    try {
      const downloadUrl = `${apiConfig.baseUrl}/invoice/download/${invoice_id}`;
      window.location.href = downloadUrl;
    } catch (err) {
      console.error('Failed to download invoice:', err);
    }
  };

  const handleMaximize = async (invoice_id) => {
    try {
      const maximizeUrl = routes.adminViewInvoice.link( invoice_id);
      window.location.href = maximizeUrl;
    } catch (err) {
      console.error('Failed to view Invoice', err);
    }
  };

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

      {/* Render the cards only if data is loaded */}
      {!isLoading && !error && (
        <div className="width-full">
          {invoiceData.length > 0 ? (
            invoiceData.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onMaximize = {handleMaximize}
              />
            ))
          ) : (
            <p>No invoices found.</p>
          )}
        </div>
      )}

      {/* Pagination and total counts */}
      {!isLoading && pagination && (
        <div className="mt-4">
          <p className="text-sm mb-2">
            Total Invoices: {pagination.total} | Total Pages: {pagination.last_page}
          </p>
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
