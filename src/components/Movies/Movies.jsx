import React, { useState, useEffect } from 'react'
import { useGetMoviesQuery } from '../../Services/TMBD';
import { MovieList, Pagination , FeaturedMovie} from '..';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { selectGenreAndCategory } from '../../features/currentGenreAndCategory';
import { useSelector } from 'react-redux';

function Movies() {
  const [page, setPage] = useState(1);
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const pageNumbers = lg ? 17 : 19;

  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreAndCategory
  );

  // ✅ Reset page when category or search query changes
  useEffect(() => {
    setPage(1);
  }, [genreIdOrCategoryName, searchQuery]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [page, genreIdOrCategoryName, searchQuery]);

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={'4rem'} />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant='h5'>No Movies Found</Typography>
        <br />
        <br />
        Please Search for a different movie or something else.
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant='h5'>Error fetching movies</Typography>
        <br />
        <br />
        Please try again later.
      </Box>
    );
  }

  return (
    <>
    <FeaturedMovie movie={data?.results[0]} />
      <MovieList
        movies={data?.results || []}
        numberOfMovies={pageNumbers}
        excludeFirst
      />

      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPage={data.total_pages}
      />
    </>
  );
}

export default Movies;
