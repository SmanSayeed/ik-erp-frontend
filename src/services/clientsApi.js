// src/services/clientsApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({  
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/client/profile`,
        method: 'PUT',
        data,
      }),
    }),
    clientResetPassword: builder.mutation({
      query: ({ data }) => ({
        url: `/client/reset-password`,
        method: 'PUT',
        data,
      }),
    }),
    clientGetProfile: builder.query({
      query: () => ({
        url: `/client/profile`,
        method: 'GET',
      }),
    }),
   
    becomeSeller: builder.mutation({
      query: (data) => ({
        url: `/client/become-seller/${data.clientId}`,
        method: 'POST',
        data,
      }),
    }),
    getSellerInfo: builder.query({
      query: (clientId) => ({
        url: `/client/seller/${clientId}`,
        method: 'GET',
      }),
    }),
    getClientsFromNodeJs: builder.query({
      query: () => ({
        url: `/clients/nodejs`,
        method: 'GET',
      }),
    }),
    updateSellerInfo: builder.mutation({
      query: ({ clientId, data }) => {
        console.log("clientData ",clientId,data);
        return({
        url: `/client/seller/${clientId}`,
        method: 'PUT',
        data,
      })},
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useClientResetPasswordMutation,
  useClientGetProfileQuery,
  useBecomeSellerMutation,
  useGetSellerInfoQuery,
  useLazyGetSellerInfoQuery,
  useUpdateSellerInfoMutation,
  useGetClientsFromNodeJsQuery
} = clientsApi;
