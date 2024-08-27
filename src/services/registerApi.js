// src/services/registerApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => {
        console.log(userData);
        return {
          url: '/register',
          method: 'POST',
          data: userData, // Change `body` to `data`
        };
      },
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
