// src/components/ViewInvoice.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useViewInvoiceQuery } from '../../../services/invoicesApi';

export default function ViewInvoice() {
  const { invoice_id } = useParams();
  const { data, error, isLoading } = useViewInvoiceQuery(invoice_id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoice: {error.message}</p>;

  const invoice = data?.data;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Invoice #{invoice?.invoice_id}</h1>
      <p>Client Name: {invoice?.client.name}</p>
      <p>Total Cost: {invoice?.totalInvoiceCost}</p>
      <p>Due Date: {invoice?.due_date}</p>
      {/* Render additional invoice details as needed */}
    </div>
  );
}
