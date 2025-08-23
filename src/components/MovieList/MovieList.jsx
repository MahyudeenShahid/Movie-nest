import { Grid } from '@mui/material';
import React from 'react';
import {Movie} from '..';

function MovieList({ movies , numberOfMovies ,excludeFirst }) {
  const start = excludeFirst?1:0;
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
      {Array.isArray(movies) &&

  movies.slice(start, numberOfMovies).map((movie, index) => (
    <Movie key={movie.id || index} movie={movie} index={index} />
  ))}

    </Grid>
  );
}

export default MovieList;
