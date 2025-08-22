import React, { useState } from 'react'
import {  useGetMoviesQuery } from '../../Services/TMBD';
import {MovieList ,Pagination} from '..';
import { Box, CircularProgress, Typography, useMediaQuery} from '@mui/material';
import { selectGenreAndCategory } from '../../features/currentGenreAndCategory';
import { useSelector } from 'react-redux';
// import Pagination from '../Pagination/Pagination';

function Movies() {
  const [page, setPage] = useState(1);
  
  const lg =useMediaQuery(( theme)=>theme.breakpoints.only('lg'));
  const pageNumbers= lg? 16 : 18


    const { genreIdOrCategoryName,searchQuery } = useSelector((state) => state.currentGenreAndCategory);
  

  const { data,error,isFetching } = useGetMoviesQuery({genreIdOrCategoryName,page,searchQuery});
  // console.dir(data);

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

  // console.log('Movies component loaded');
  
  return (
    <>
    
  <div>Movies</div>
    <MovieList movies={data?.results || []}  numberOfMovies ={pageNumbers}/>

    <Pagination currentPage={page} setPage={setPage} totalPage={data.total_pages} />

    </>
  )
}

export default Movies