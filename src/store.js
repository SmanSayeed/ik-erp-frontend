import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { registerApi } from './services/registerApi';
import { usersApi } from './services/usersApi';
import { passwordApi } from './services/passwordApi';
import { authReducer } from './features/authSlice';
import { userDataReducer } from './features/userDataSlice';// Import the new slice
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { clientsApi } from './services/clientsApi';
import { clientAuthReducer } from './features/clientAuthSlice';
import { clientDataReducer } from './features/clientDataSlice';
import { adminManagesClientsApi } from './services/adminManagesClientsApi';
import { deviceApi } from './services/deviceApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [passwordApi.reducerPath]: passwordApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [adminManagesClientsApi.reducerPath]: adminManagesClientsApi.reducer,
  [deviceApi.reducerPath]: deviceApi.reducer,
  auth: authReducer,
  clientAuth:clientAuthReducer,
  userData: userDataReducer, 
  clientData: clientDataReducer, 
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'userData','clientData','clientAuth'], // Whitelist both slices
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
      usersApi.middleware,
      passwordApi.middleware,
      clientsApi.middleware,
      deviceApi.middleware,
      adminManagesClientsApi.middleware
    ),
});

export const persistor = persistStore(store);
