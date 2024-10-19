// src/services/invoicesApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const invoicesApi = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    getInvoicesList: builder.query({
      query: () => ({
        url: `/invoice/list`,
        method: 'GET',
      }),
    }),
    getChildClientInvoicesList: builder.query({
      query: ({ client_remotik_id, page = 1, perPage = 10 }) => ({
        url: `/client/invoice/child-client-invoice-list/${client_remotik_id}`,
        method: 'GET',
        params: { page, perPage }, // Pass pagination parameters as query params
      }),
    }),
    viewInvoice: builder.query({
      query: (invoice_id) => ({
        url: `/invoice/view/${invoice_id}`,
        method: 'GET',
      }),
    }),
    createInvoice: builder.mutation({
      query: (data) =>( {
        url:  `/invoice/generate`,
        method: 'POST',
        data,
      }),
    }),

    createChildClientInvoice: builder.mutation({
      query: (data) =>( {
        url:  `/client/invoice/generate`,
        method: 'POST',
        data,
      }),
    }),
    
    updateInvoice: builder.mutation({
      query: ({ invoice_id, data }) => ({
        url: `/invoice/update/${invoice_id}`,
        method: 'PUT',
        data,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (invoice_id) => ({
        url: `/invoice/delete/${invoice_id}`,
        method: 'DELETE',
      }),
    }),
    downloadInvoice: builder.query({
      query: (invoice_id) => ({
        url: `/invoice/download/${invoice_id}`,
        method: 'GET',
        responseType: 'blob',
         // For handling file download
      }),
    }),
    previewInvoice: builder.query({
      query: (invoice_id) => ({
        url: `/invoice/preview/${invoice_id}`,
        method: 'GET',
        responseType: 'blob',  // Return the response as a Blob for preview
      }),
    }),

    getOwnInvoicesList: builder.query({
      query: ({ client_remotik_id, page = 1, perPage = 10 }) => ({
        url: `/client/invoice/invoice-for/${client_remotik_id}`,
        method: 'GET',
        params: { page, perPage }, // Pass pagination parameters as query params
      }),
    }),

  }),
});

export const {
  useGetInvoicesListQuery,
  useViewInvoiceQuery,
  useCreateInvoiceMutation,
  useCreateChildClientInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useDownloadInvoiceQuery,
  usePreviewInvoiceQuery,
  useGetChildClientInvoicesListQuery,
  useGetOwnInvoicesListQuery
} = invoicesApi;
