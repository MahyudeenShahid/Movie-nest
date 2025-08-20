import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../Services/TMBD';
import genreAndCategoryReducer from '../features/currentGenreAndCategory';
import userReducer from '../features/Auth';


export const store = configureStore({
  reducer: {
    // Add your reducers here
    [tmbdApi.reducerPath]: tmbdApi.reducer,
    currentGenreAndCategory: genreAndCategoryReducer,
    user: userReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmbdApi.middleware),
  
})
 