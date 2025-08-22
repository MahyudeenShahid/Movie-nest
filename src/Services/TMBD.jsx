import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_TMDB_API_KEY; 


// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
 
export const tmbdApi= createApi({
  reducerPath: 'tmbdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //get genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${apiKey}`,
    }),
    //get movies
    getMovies: builder.query({
      query: ({genreIdOrCategoryName, page , searchQuery}) => {
        if (searchQuery) {
          return `/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
        }
        if (genreIdOrCategoryName && !isNaN(genreIdOrCategoryName)) {
          // If genreIdOrCategoryName is a number, treat it as a genre ID
          return `/discover/movie?api_key=${apiKey}&with_genres=${genreIdOrCategoryName}&page=${page}`;
        }
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          // If genreIdOrCategoryName is a string, treat it as a category name
          return `/movie/${genreIdOrCategoryName}?api_key=${apiKey}&page=${page}`;
        }
        return `/movie/popular?page=${page}&api_key=${apiKey}`;
      }
    }),
    //get movie details
    getMovie:builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,images,credits&api_key=${apiKey}`,
    }),

    // get user specific list 

  getRecommendation: builder.query({
    query: (movie_id) => `/movie/${movie_id}/recommendations?api_key=${apiKey}`,
  }),

  getActorDetails: builder.query({
  query: (id) => `/person/${id}?api_key=${apiKey}`,
}),

  // get movie by Actor id
  getMoviesByActor: builder.query({
  query: ({ id, page }) =>
    `/discover/movie?with_cast=${id}&api_key=${apiKey}&page=${page}`,
}),
//get list of favorite and watchlisted

getList: builder.query({
  query: ({ user, listName, page }) =>
    `/account/${user?.id}/${listName}/movies?api_key=${apiKey}&session_id=${localStorage.getItem('Session_id')}&page=${page}`,
}),



}),
})

export const { 
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationQuery,
    useGetActorDetailsQuery,
    useGetMoviesByActorQuery,
    useGetListQuery,
} = tmbdApi
