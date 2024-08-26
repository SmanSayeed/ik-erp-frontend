// src/services/baseQuery.js
import axios from 'axios';

const axiosBaseQuery = ({ baseUrl }) => async ({ url, method = 'GET', data, params }) => {
  console.log('axiosBaseQuery called', { url, method, data, params });
  
  try {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    const result = await axios({
      url: `${baseUrl}${url}`,
      method,
      data,
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return { data: result.data };
  } catch (axiosError) {
    console.error('Axios error:', axiosError);
    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

export default axiosBaseQuery;
