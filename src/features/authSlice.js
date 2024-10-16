import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Auth slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, client: null, seller: null, token: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user || state.user;
      state.client = action.payload.client || state.client;
      state.seller = action.payload.seller || state.seller;
      state.token = action.payload.token || state.token;
      state.role = action.payload.role || state.role;
      console.log('Credentials set:', state.user, state.token, state.role, state.seller);

      // Clear state if token is null or undefined
      if (!state.token) {
        console.log('Token is null, clearing persisted state.');
        state.user = null;
        state.client = null;
        state.seller = null;
        state.token = null;
        state.role = null;
        storage.removeItem('persist:auth');  // Clear persisted auth state
      }
    },
    logout: (state) => {
      state.user = null;
      state.client = null;
      state.seller = null;
      state.token = null;
      state.role = null;
      console.log('User logged out, clearing persisted state.');
      storage.removeItem('persist:auth');  // Clear persisted auth state on logout
    },
  },
});

// Persist config for auth slice
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'client', 'seller'],  // Whitelist only necessary fields
};

// Export actions and reducer
export const { setCredentials, logout } = authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
