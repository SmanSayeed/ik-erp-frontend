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
        return {
          url: `/users/${id}`,
          method: 'PUT',
          data: data,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/soft-delete`,
        method: 'DELETE',
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/user/profile`,
        method: 'PUT',
        data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/password`,
        method: 'PUT',
        data,
      }),
    }),
    getProfile: builder.query({
      query: (id) => ({
        url: id ? `/users/profile/${id}` : `/user/profile`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useEditUserMutation, useDeleteUserMutation, useUpdateProfileMutation,  useResetPasswordMutation , useGetProfileQuery } = usersApi;
