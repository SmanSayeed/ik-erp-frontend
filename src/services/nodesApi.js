// src/services/nodesApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const nodesApi = createApi({
  reducerPath: 'nodesApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    getNodes: builder.query({
      query: (filters) => ({
        url: '/nodes',
        method: 'GET',
        params: filters || '',  
        // Send filters as query parameters for the GET request
      }),
    }),
  }),
});

export const { useGetNodesQuery } = nodesApi;
