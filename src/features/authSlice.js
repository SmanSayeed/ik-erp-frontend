import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      console.log('Credentials set: sss', state.user, state.token, state.role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'], // Ensure both `user` and `token` are persisted
};

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
