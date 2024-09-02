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
    resetPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/${id}/password`,
        method: 'PUT',
        data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/client/profile`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useEditUserMutation, useDeleteUserMutation, useUpdateProfileMutation,  useResetPasswordMutation , useGetProfileQuery } = clientsApi;
