// src/services/registerApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        data: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
