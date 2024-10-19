// src/services/powerApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const powerApi = createApi({
  reducerPath: 'powerApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    getPowerUsage: builder.query({
      query: (filters) => ({
        url: '/admin/power-data',
        method: 'GET',
        params: filters || '',  
        // Send filters as query parameters for the GET request
      }),
    }),
    getLogPowerUsage: builder.query({
      query: (filters) => ({
        url: '/admin/power-data-sync-log',
        method: 'GET',
        params: filters || '',  
        // Send filters as query parameters for the GET request
      }),
    }),
  }),
});

export const { useGetPowerUsageQuery,useGetLogPowerUsageQuery } = powerApi;
