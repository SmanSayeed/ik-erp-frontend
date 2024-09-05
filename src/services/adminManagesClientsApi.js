import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const adminManagesClientsApi = createApi({
  reducerPath: 'adminManagesClientsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${apiConfig.baseUrl}/admin/clients`,
  }),
  endpoints: (builder) => ({
    getClientsList: builder.query({
      query: (filters) => ({
        url: '/',
        method: 'GET',
        params: filters, // Pass filters as query parameters
      }),
    }),
    getClientById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    updateClientProfile: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        data,
      }),
    }),
    updateClientInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        data,
      }),
    }),
    updateEmailVerification: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}/email-verification`,
        method: 'PATCH',
        data,
      }),
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}/status`,
        method: 'PATCH',
        data,
      }),
    }),
    restoreClient: builder.mutation({
      query: (id) => ({
        url: `/restore/${id}`,
        method: 'POST',
      }),
    }),
    getTrashedClients: builder.query({
      query: () => ({
        url: '/trashed',
        method: 'GET',
      }),
    }),
    softDeleteClient: builder.mutation({
      query: (id) => ({
        url: `/${id}/soft-delete`,
        method: 'DELETE',
      }),
    }),
    hardDeleteClient: builder.mutation({
      query: (id) => ({
        url: `/${id}/hard-delete`,
        method: 'DELETE',
      }),
    }),
    updateClientPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}/password`,
        method: 'PATCH',
        data,
      }),
    }),
    updateSellerInfo: builder.mutation({
      query: ({ id, data }) => {
        const clientId = parseInt(id, 10); // Ensure id is an integer
        return {
          url: `/seller/${clientId}`,
          method: 'PUT',
          data,
        };
      },
    }),
  }),
});

export const {
  useGetClientsListQuery,
  useGetClientByIdQuery,
  useUpdateClientProfileMutation,
  useUpdateClientInfoMutation,
  useUpdateEmailVerificationMutation,
  useUpdateStatusMutation,
  useRestoreClientMutation,
  useGetTrashedClientsQuery,
  useSoftDeleteClientMutation,
  useHardDeleteClientMutation,
  useUpdateClientPasswordMutation,
  useUpdateSellerInfoMutation
} = adminManagesClientsApi;
