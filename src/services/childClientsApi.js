// src/services/clientsApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const childClientsApi = createApi({
  reducerPath: 'childClientsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl, // Assuming this contains the base URL for the Laravel API
  }),
  endpoints: (builder) => ({
    getChildClients: builder.query({
      query: (clientRemotikId) => ({
        url: `/client/child`,
        method: 'GET',
        params: { client_remotik_id: clientRemotikId }, // Sending the client_remotik_id as a query parameter
      }),
      transformResponse: (response) => response.data, // Extract the 'data' array from the API response
    }),

    registerChildClient: builder.mutation({
      query: (newClientData) => ({
        url: `/client/register`,
        method: 'POST',
        data: newClientData, // Send form data as request body
      }),
    }),

    updateChildClient: builder.mutation({
      query: ({newClientData,client_remotik_id,child_client_remotik_id}) => ({
        url: `/client/update-child-client/${client_remotik_id}/${child_client_remotik_id}`,
        method: 'PUT',
        data: newClientData, // Send form data as request body
      }),
    }),

    getChildClientProfile: builder.query({
      query: ({ client_remotik_id, child_client_remotik_id }) => ({
        url: `/client/child/profile/${client_remotik_id}/${child_client_remotik_id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetChildClientsQuery,useRegisterChildClientMutation , useGetChildClientProfileQuery, useUpdateChildClientMutation  } = childClientsApi; // Export the auto-generated hook for the query
