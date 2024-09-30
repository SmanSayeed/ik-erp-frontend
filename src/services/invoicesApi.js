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
    viewInvoice: builder.query({
      query: (invoice_id) => ({
        url: `/invoice/view/${invoice_id}`,
        method: 'GET',
      }),
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: `/invoice/generate`,
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
  }),
});

export const {
  useGetInvoicesListQuery,
  useViewInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useDownloadInvoiceQuery,
} = invoicesApi;
