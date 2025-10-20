import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/slices/authSlice';
import hotelReducer from './store/slices/hotelSlice';
import bookingReducer from './store/slices/bookingSlice';
import uiReducer from './store/slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
    bookings: bookingReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

