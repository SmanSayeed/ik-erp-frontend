import React from 'react';
import { useParams } from 'react-router-dom';
import PreviewInvoice from '../../Molecules/Invoice/PreviewInvoice';

export default function ViewInvoice() {
  const { invoice_id } = useParams();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Invoice #{invoice_id}</h1>
      <PreviewInvoice invoice_id={invoice_id} />
    </div>
  );
}
