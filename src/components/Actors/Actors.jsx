import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorQuery,
} from '../../Services/TMBD';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
// import Grid from '@mui/material/Grid2'; // ✅ Grid2 for MUI v6
import { ArrowBack, Movie } from '@mui/icons-material';
import {Pagination ,MovieList} from '..';

function Actors() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setpage] = useState(1);


  const { data, error, isLoading } = useGetActorDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorQuery({ id, page });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>No Actor Found</Typography>
        <Typography>Please search for a different actor.</Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{
            mt: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': (theme) => ({
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.error.light
                  : theme.palette.primary.light,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.common.white
                  : theme.palette.common.black,
              transform: 'translateY(-2px)',
              boxShadow: 2,
            }),
          }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ my: 2 }}>
      {/* Actor Image */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }} sx={{ display: 'flex', justifyContent: 'center', mx: 'auto' }}>
        <Box
          component="img"
          src={data?.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : '/no-profile.png'}
          alt={data?.name}
          sx={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '15px',
            boxShadow: '0.5em 1em 1em rgba(64,64,70,0.8)',
            height: { xs: 350, sm: 400, md: 500 },
            objectFit: 'cover',
          }}
        />
      </Grid>

      {/* Actor Details */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }} sx={{ px: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h3" gutterBottom>{data?.name}</Typography>
        <Typography variant="h6" gutterBottom>
          Born: {data?.birthday ? new Date(data.birthday).toDateString() : 'N/A'}
        </Typography>
        {data?.place_of_birth && (
          <Typography variant="subtitle1" gutterBottom>
            Place of Birth: {data.place_of_birth}
          </Typography>
        )}
        {data?.known_for_department && (
          <Typography variant="subtitle2" gutterBottom>
            Known For: {data.known_for_department}
          </Typography>
        )}
        {data?.popularity && (
          <Typography variant="subtitle2" gutterBottom>
            Popularity: {Math.round(data.popularity)}
          </Typography>
        )}

        {/* Aliases */}
        {data?.also_known_as?.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={1} my={2}>
            {data.also_known_as.map((alias, idx) => (
              <Chip key={idx} label={alias} variant="outlined" />
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" align="justify" paragraph>
          {data?.biography || 'Sorry, no Biography yet...'}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} mt={2}>
          <Button
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
            endIcon={<Movie />}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': (theme) => ({
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.error.light
                    : theme.palette.primary.light,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.common.white
                    : theme.palette.common.black,
                transform: 'translateY(-2px)',
                boxShadow: 2,
              }),
            }}
          >
            IMDB
          </Button>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            color="primary"
            variant="contained"
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': (theme) => ({
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.error.light
                    : theme.palette.primary.light,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.common.white
                    : theme.palette.common.black,
                transform: 'translateY(-2px)',
                boxShadow: 2,
              }),
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Grid>

      {/* Movies Section */}
      <Grid size={{ xs: 12 }}>
        <Box mt="2rem">
          <Typography variant="h3" gutterBottom align="center">
            Movies from this Actor
          </Typography>
          {movies?.results?.length ? (
            <MovieList movies={movies.results} numberOfMovies={12} />
          ) : (
            <Typography variant="body1" align="center">No Movies of this actor available</Typography>
          )}
        </Box>
      </Grid>
      <Pagination currentPage={page} totalPage={movies?.total_page} setPage={setpage}/>
    </Grid>
  );
}

export default Actors;
