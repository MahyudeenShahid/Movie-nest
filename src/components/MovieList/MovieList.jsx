import { Grid } from '@mui/material';
import React from 'react';
import {Movie} from '..';

function MovieList({ movies }) {
  return (
    <Grid 
      container 
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
       
        overflow: 'auto',
        mt: 2, // margin-top
        px: 2, // padding x
        // responsive
        justifyContent: { xs: 'center', sm: 'space-between' },
      }}
    >
      {movies && movies.map((movie , index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </Grid>
  );
}

export default MovieList;
