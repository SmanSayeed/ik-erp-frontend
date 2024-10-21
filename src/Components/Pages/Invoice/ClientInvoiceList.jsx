import React, { useEffect, useState } from 'react';
import { useDeleteInvoiceMutation, useGetChildClientInvoicesListQuery } from '../../../services/invoicesApi';
import { Link, useParams } from 'react-router-dom';
import routes from '../../../routes/routes';
import Pagination from '../../Atoms/Pagination/Pagination';
import InvoiceCard from '../../Molecules/Invoice/InvoiceCard';


export default function ClientInvoiceList() {
  const { client_remotik_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading, refetch } = useGetChildClientInvoicesListQuery({ client_remotik_id, page: currentPage, perPage });
  const [deleteInvoice] = useDeleteInvoiceMutation();

  const [invoiceData, setInvoiceData] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    if (data && data.data) {
      setInvoiceData(data.data.data);
      setPagination(data.data.pagination); // Update pagination state
    }
  }, [data]);

  useEffect(() => {
    refetch(); // Refetch data when currentPage changes
  }, [refetch, currentPage]);

  const handleDelete = async (invoice_id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(invoice_id).unwrap();
        alert('Invoice deleted successfully');
        refetch(); // Refetch after deletion
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoice List</h1>
        <Link
          to={routes.ClientCreateInvoice.link(client_remotik_id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Invoice
        </Link>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="loader border-t-4 border-blue-500 w-12 h-12 border-solid rounded-full animate-spin"></div>
          <span className="ml-4 text-xl font-semibold">Loading invoices...</span>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">Error loading invoices: {error.message}</p>}

      {/* Invoice Cards */}
      {(!isLoading && !error && invoiceData.length > 0) ? (
        <div className="space-y-6">
          {invoiceData.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))}

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
      ) : (
        <p className="text-center py-4">No invoices found.</p>
      )}

      {/* No Invoices */}
      {!isLoading && !error && invoiceData.length === 0 && (
        <p className="text-center py-4">No invoices found.</p>
      )}
    </div>
  );
}
