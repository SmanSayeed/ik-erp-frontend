// src/services/usersApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './baseQuery';
import apiConfig from '../config/apiConfig';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery({
    baseUrl: apiConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ keyword, status, email_verified_at, role, order_by, order_direction, per_page, page }) => ({
        url: `/users`,
        params: {
          keyword,
          status,
          email_verified_at,
          role,
          order_by,
          order_direction,
          per_page,
          page,
        },
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => {
        // Log the data here
        console.log('Edit User Data:',data);
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/soft-delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useEditUserMutation, useDeleteUserMutation } = usersApi;
