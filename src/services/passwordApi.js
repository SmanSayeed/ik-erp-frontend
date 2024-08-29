// src/services/authApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const passwordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: '/forgot-password',
        method: 'POST',
        data: credentials,
      }),
    }),
    resetPasswordByEmail: builder.mutation({
      query: (data) => {
        console.log('data',data)
        return({
        url: '/reset-password-by-email',
        method: 'POST',
        data: data ,
      })},
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordByEmailMutation } = passwordApi;
