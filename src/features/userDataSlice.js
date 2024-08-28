import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userDataSlice = createSlice({
  name: 'userData',
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
  key: 'userData',
  storage,
  whitelist: ['profile'], // Adjust as necessary
};

export const { setProfile, clearProfile } = userDataSlice.actions;
export const userDataReducer = persistReducer(persistConfig, userDataSlice.reducer);
