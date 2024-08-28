import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { registerApi } from './services/registerApi';
import { usersApi } from './services/usersApi';
import { authReducer } from './features/authSlice';
import { userDataReducer } from './features/userDataSlice';// Import the new slice
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  auth: authReducer,
  userData: userDataReducer, // Add the userData reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'userData'], // Whitelist both slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      registerApi.middleware,
      usersApi.middleware
    ),
});

export const persistor = persistStore(store);
