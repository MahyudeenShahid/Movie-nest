import { Grid, Grow, Typography, Box, Rating, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Movie({ movie, index }) {
    
  return (
    <Grid 
      key={movie.id || index} 
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} 
      sx={{ p: 2 }}
    >
      <Grow in timeout={(index + 1) * 250}>
        {/* Wrap Link with Box to allow sx */}
        <Box
          component={Link}
          to={`/movie/${movie.id}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            '&:hover': {
                
              cursor: 'pointer',
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          {/* Wrap img in Box to allow sx */}
          <Box
            component="img"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500'
            }
            alt={movie.title}
            sx={{
              borderRadius: '20px',
              height: '300px',
              mb: 1,
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: 230,
              textAlign: 'center',
            }}
          >
            {movie.title}
          </Typography>
          <Tooltip   title={`${movie.vote_average.toFixed(1)}/10`}  disableTouchListener>
  <div>
    <Rating 
      readOnly 
      value={movie.vote_average / 2} 
      precision={0.1} 
    />
  </div>
</Tooltip>

        </Box>
      </Grow>
    </Grid>
  );
}

export default Movie;
