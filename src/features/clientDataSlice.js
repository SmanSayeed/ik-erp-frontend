import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const clientDataSlice = createSlice({
  name: 'clientData',
  initialState: { profile: null }, // Add more fields as needed
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

const persistConfig = {
  key: 'clientData',
  storage,
  whitelist: ['profile'], // Adjust as necessary
};

export const { setProfile, clearProfile } = clientDataSlice.actions;
export const clientDataReducer = persistReducer(persistConfig, clientDataSlice.reducer);
