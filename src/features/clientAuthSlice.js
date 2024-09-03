import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const clientAuthSlice = createSlice({
  name: 'clientAuth',
  initialState: { client: null, token: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      state.client = action.payload.client;
      state.token = action.payload.token;
      state.role = action.payload.role;
      console.log('Credentials set: sss', state.client, state.token, state.role);
    },
    logout: (state) => {
      state.client = null;
      state.token = null;
      state.role = null;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['client', 'token'], // Ensure both `client` and `token` are persisted
};

export const { setCredentials, logout } = clientAuthSlice.actions;
export const clientAuthReducer = persistReducer(persistConfig, clientAuthSlice.reducer);
