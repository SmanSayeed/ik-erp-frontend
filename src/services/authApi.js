// src/services/authApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    clientLogin: builder.mutation({
      query: (credentials) => ({
        url: '/client/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    resendEmail: builder.mutation({
      query: (email) => ({
        url: '/resend-verification-email',
        method: 'POST',
        data: { email },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {useLogoutMutation, useAdminLoginMutation, useResendEmailMutation, useClientLoginMutation } = authApi;
