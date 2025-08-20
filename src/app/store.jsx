import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../Services/TMBD';
import genreAndCategoryReducer from '../features/currentGenreAndCategory';


export const store = configureStore({
  reducer: {
    // Add your reducers here
    [tmbdApi.reducerPath]: tmbdApi.reducer,
    currentGenreAndCategory: genreAndCategoryReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmbdApi.middleware),
  
})
 