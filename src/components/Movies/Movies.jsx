import React from 'react'
import {  useGetMoviesQuery } from '../../Services/TMBD';
import {MovieList} from '..';
import { Box, CircularProgress } from '@mui/material';

function Movies() {
  const { data,error,isFetching } = useGetMoviesQuery();

  if (isFetching){
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress size={'4rem'} />
    </Box>
  };
  if (!data.results.length){ 
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant='h5'>No Movies Found</Typography>
      <br />
      <br />
      Please Search for a different movie or something else.
    </Box>
  };

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant='h5'>Error fetching movies</Typography>
      <br />
      <br />
      Please try again later.
    </Box>
  }

  console.log('Movies component loaded');
  console.dir(data);
  return (
    <>
    <Box sx={{ mt: '85px', ml: { sm: '240px' } }}>
  <div>Movies</div>
    <MovieList movies={data?.results || []} />
</Box>
    
    </>
  )
}

export default Movies