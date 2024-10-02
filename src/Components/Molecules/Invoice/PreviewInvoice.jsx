import React, { useEffect, useState } from 'react';

import apiConfig from '../../../config/apiConfig';
import { useDownloadInvoiceQuery, usePreviewInvoiceQuery } from '../../../services/invoicesApi';

export default function PreviewInvoice({ invoice_id }) {
  const { data: previewBlob, error: previewError, isLoading: previewLoading } = usePreviewInvoiceQuery(invoice_id);
  const { data: downloadBlob, refetch: refetchDownload } = useDownloadInvoiceQuery(invoice_id, { skip: true });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (previewBlob) {
      console.log('Blob preview data:', previewBlob); // Debugging the blob data

      // Ensure previewBlob is a valid Blob
      if (previewBlob instanceof Blob) {
        const url = URL.createObjectURL(previewBlob);
        setPreviewUrl(url);

        // Cleanup the URL object when the component unmounts
        return () => URL.revokeObjectURL(url);
      } else {
        console.error('Expected a Blob, but received:', previewBlob);
      }
    }
  }, [previewBlob]);

  const handleDownload = async () => {
    try {
      const downloadUrl = `${apiConfig.baseUrl}/invoice/download/${invoice_id}`;
      window.location.href = downloadUrl;
    } catch (err) {
      console.error('Failed to download invoice:', err);
    }
  };

  if (previewLoading) return <p>Loading preview...</p>;
  if (previewError) return <p>Error loading invoice preview.</p>;

  return (
    <div>
      <button   
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={handleDownload}
      >
        Download Invoice
      </button>
      {previewUrl && (
        <iframe
          src={previewUrl}
          width="100%"
          height="1000px"
          title={`Invoice ${invoice_id}`}
          className="border-2 border-gray-300 mt-4"
        />
      )}
    </div>
  );
}
