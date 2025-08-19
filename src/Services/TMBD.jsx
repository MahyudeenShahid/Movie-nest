import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_TMDB_API_KEY; 
const page=1

// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1

export const tmbdApi= createApi({
  reducerPath: 'tmbdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => `/movie/popular?page=${page}&api_key=${apiKey}`,
    }),
  }),
})

export const { 
    useGetMoviesQuery,
} = tmbdApi
