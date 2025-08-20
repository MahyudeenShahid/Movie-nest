import { Grid, Grow, Typography, Box, Rating, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Movie({ movie, index }) {
  const theme = useTheme();

  return (
    <Grid
      key={movie.id || index}
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}   // ✅ keep Grid v2 API
      sx={{ p: 2 }}
    >
      <Grow in timeout={(index + 1) * 250}>
        <Box
          component={Link}
          to={`/movie/${movie.id}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            borderRadius: 3,
            boxShadow: 3,
            overflow: 'hidden',
            // ✅ just adding padding + small gap
            p: 2,
            gap: 1,
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.primary.light      // blue in light
                : theme.palette.error.dark,         // red in dark
            transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
              backgroundColor:
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.error.main,
            },
          }}
        >
          {/* Poster */}
          <Box
            component="img"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500'
            }
            alt={movie.title}
            sx={{
              height: 300,
              width: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: 4,
            }}
          />

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              color: 'common.white',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '90%',
              width: 230,
              textAlign: 'center',
              mb: 0.5,
            }}
          >
            {movie.title}
          </Typography>

          {/* Rating */}
          <Tooltip title={`${movie.vote_average.toFixed(1)}/10`} disableTouchListener>
            <Box>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </Box>
          </Tooltip>
        </Box>
      </Grow>
    </Grid>
  );
}

export default Movie;
