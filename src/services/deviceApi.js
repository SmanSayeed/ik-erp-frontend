// src/services/deviceApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const deviceApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    getDevices: builder.query({
      query: () => ({
        url: '/admin/devices',
        method: 'GET',
      }),
    }),
    getDeviceById: builder.query({
      query: (id) => ({
        url: `/admin/devices/${id}`,
        method: 'GET',
      }),
    }),
    createDevice: builder.mutation({
      query: (data) => ({
        url: '/admin/devices',
        method: 'POST',
        data,
      }),
    }),
    updateDevice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/devices/${id}`,
        method: 'PUT',
        data,
      }),
    }),
    deleteDevice: builder.mutation({
      query: (id) => ({
        url: `/admin/devices/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useGetDeviceByIdQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = deviceApi;
