import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlices from './user/userSlices';
import driverSlices from './driver/driverSlices';
import parentSlices from './parent/parentSlices';
import authRecoverySlice from './auth/authRecoverySlice';

const reducers = combineReducers({
  userSlices,
  driverSlices,
  parentSlices,
  authRecoverySlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userSlices'],
  //   blackList: ['poSlice', 'common'],
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
