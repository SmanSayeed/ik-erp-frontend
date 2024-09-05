import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null,client:null,seller:null, token: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user || state.user;
      state.client = action.payload.client || state.client;
      state.seller = action.payload.seller || state.seller;
      state.token = action.payload.token || state.token;
      state.role = action.payload.role || state.role;
      console.log('Credentials set: sss', state.user, state.token, state.role);
    },
    logout: (state) => {
      state.user = null;
      state.client = null;
      state.seller = null;
      state.token = null;
      state.role = null;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user','token','client','seller'], // Ensure both `user` and `token` are persisted
};

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
