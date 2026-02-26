import authReducer from '../AuthReducer';
import api from './api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import walletReducer from '../WalletReducer';
import kycReducer from '../KYCReducer';
import { persistReducer, persistStore } from 'redux-persist';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { kycApi } from '../KYCApiReducer';

const reducers = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
  kyc: kycReducer,
  [api.reducerPath]: api.reducer,
  [kycApi.reducerPath]: kycApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'wallet', 'kyc'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat(kycApi.middleware),
  devTools: false,
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;
