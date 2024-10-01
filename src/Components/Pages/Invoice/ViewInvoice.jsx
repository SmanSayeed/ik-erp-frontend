import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePreviewInvoiceQuery, useDownloadInvoiceQuery } from '../../../services/invoicesApi';
import apiConfig from '../../../config/apiConfig';

export default function ViewInvoice() {
  const { invoice_id } = useParams();
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

  // const handleDownload = () => {
  //   refetchDownload().then((result) => {
  //     if (result.data) {
  //       // Debug the download blob data
  //       console.log('Download blob data:', result.data);

  //       if (result.data instanceof Blob) {
  //         const url = window.URL.createObjectURL(new Blob([result.data]));
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.setAttribute('download', `invoice_${invoice_id}.pdf`);
  //         document.body.appendChild(link);
  //         link.click();
  //         link.parentNode.removeChild(link);
  //       } else {
  //         console.error('Download data is not a Blob:', result.data);
  //       }
  //     }
  //   });
  // };

  const handleDownload = async (invoice_id) => {
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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Invoice #{invoice_id}</h1>
      <button   
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={() => handleDownload(invoice_id)}
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
