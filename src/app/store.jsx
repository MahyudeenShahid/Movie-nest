import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../Services/TMBD';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [tmbdApi.reducerPath]: tmbdApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmbdApi.middleware),
  
})
 