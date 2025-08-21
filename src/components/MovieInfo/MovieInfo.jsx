import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetMovieQuery, useGetRecommendationQuery } from '../../Services/TMBD';
import { Box, CircularProgress, Grid, Rating, Stack, Typography, Chip, useTheme, Button, ButtonGroup } from '@mui/material';
import genreIcons from '../../assets/icons'
import { useDispatch,  } from 'react-redux';
import { selectGenreAndCategory } from '../../features/currentGenreAndCategory';
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, Movie, PlusOneOutlined, PlusOneRounded, RemoveCircle, Theaters } from '@mui/icons-material';
import MovieList from '../MovieList/MovieList';

function MovieInfo() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isFavorite = false;
  const isWatchList = false;
  const {data :recommendations,isLoading:isrecommendationLoading}= useGetRecommendationQuery(id);

  console.log(recommendations);
  const addToFavorites  =()=>{
    console.log("Added to favorites");
  }
const addToWatchList  =()=>{
    console.log("Added to WatchList");
  }


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={'8rem'} />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant='h5'>No Movies Found</Typography>
        <Typography>Please search for a different movie.</Typography>
        <Link to="/">Go Back</Link>
      </Box>
    );
  }

  // Currency formatter
  const formatCurrency = (num) =>
    num && num > 0 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num) : 'N/A';

  return (
    <Grid container spacing={3} sx={{ my: 2 }}>
      {/* Poster */}
      <Grid item xs={12} lg={5} sx={{ display: 'flex', justifyContent: 'center', mx: 'auto' }}>
        <Box
          component="img"
          src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "/no-poster.png"}
          alt={data.title}
          sx={{
            width: '100%',
            borderRadius: '15px',
            boxShadow: '0.5em 1em 1em rgba(64,64,70,0.8)',
            height: { xs: 350, sm: 400, md: 500 },
            objectFit: 'cover'
          }}
        />
      </Grid>

      {/* Movie Details */}
      <Grid item xs={12} lg={7}  direction="column" spacing={2} sx={{ px: 2 ,
        justifyContent: 'center',
        alignItems: 'center',
        mx: { xs: 'auto' },   // ✅ center horizontally on md+
    textAlign: 'center',
      }}>
        {/* Title & Tagline */}
        <Typography variant="h3" textAlign="center" gutterBottom>
          {data?.title} {data.release_date && `(${data.release_date.split("-")[0]})`}
        </Typography>
        {data?.tagline ? (
          <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontStyle: "italic", opacity: 0.8 }}>
            {data?.tagline}
          </Typography>
        ) : (
          <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontStyle: "italic", opacity: 0.8 }}>
            No tagline available.
          </Typography>
        )}

        {/* Info Card */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: "background.paper"
          }}
        >
          <Stack spacing={2}>
            <InfoRow label="Release Date" value={data?.release_date || "N/A"} />
            <InfoRow
              label="Rating"
              value={
                <Box display="flex" alignItems="center">
                  <Rating readOnly precision={0.1} value={data?.vote_average / 2} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {data?.vote_average?.toFixed(1)}/10
                  </Typography>
                </Box>
              }
            />
            <InfoRow label="Runtime" value={data?.runtime ? `${data.runtime} minutes` : "N/A"} />
            <InfoRow label="Budget" value={formatCurrency(data?.budget)} />
            <InfoRow label="Revenue" value={formatCurrency(data?.revenue)} />
            <InfoRow label="Status" value={data?.status || "N/A"} />
            <InfoRow label="Language" value={data?.original_language?.toUpperCase() || "N/A"} />
          </Stack>
        </Box>

        {/* Genres */}
       {data?.genres?.length > 0 && (
  <Box sx={{ mt: 3, textAlign: 'center' }}>
    <Typography variant="h6" gutterBottom>
      Genres
    </Typography>
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      flexWrap="wrap"
    >
      {data.genres.map((genre) => (
        <Link
          key={genre.id}
          onClick={() => dispatch(selectGenreAndCategory(genre.id))}
          to={`/category/${genre.id}`} // ✅ Navigate to genre page
          style={{ textDecoration: 'none' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              px: 1,
              py: 0.5,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Box
              component="img"
              src={genreIcons[genre.name.toLowerCase()] || genreIcons.default}
              alt={genre.name}
              height={20}
              sx={{
                filter:
                  theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
              }}
            />
            <Typography variant="body2" color="textPrimary">
              {genre.name}
            </Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
  </Box>
)}




        {/* Production Companies */}
        {data?.production_companies?.length > 0 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Production</Typography>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              {data.production_companies.map((company) => (
                <Chip key={company.id} label={company.name} />
              ))}
            </Stack>
          </Box>
        )}
</Grid>
<Grid 
  container 
  direction="column" 
  alignItems="center" 
  justifyContent="center"
  mx={'auto'}
  spacing={4} 
  sx={{ mt: 3, textAlign: 'center' }}
>
  {/* Overview Section */}
  <Grid item xs={12}>
    <Typography variant="h4" gutterBottom>Overview:</Typography>
    <Typography 
      marginBottom="2rem" 
      variant="body1" 
      sx={{ maxWidth: { xs: '80%', sm: '600px' }, mx: 'auto' }}
    >
      {data?.overview || "No overview available."}
    </Typography>
  </Grid>

  {/* Top Cast Section */}
<Grid item xs={12}>
  <Typography variant="h4" gutterBottom>
    Top Cast:
  </Typography>
  <Grid
    container
    spacing={2}
    justifyContent="center"
  >
    {data?.credits?.cast.slice(0, 6).map((actor) => (
      <Grid
        item
        xs={6}
        sm={4}
        md={3}
        key={actor.id}
        textAlign="center"
      >
        <Box
          component="img"
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "/no-profile.png"
          }
          alt={actor.name}
          sx={{
            width: "150px",       // fixed width
            height: "200px",      // fixed height (portrait style)
            borderRadius: "10px",
            boxShadow: "0.5em 1em 1em rgba(64,64,70,0.5)",
            objectFit: "cover",   // crops image nicely
            mx: "auto",
            display: "block",
          }}
        />
        <Typography
          variant="body1"
          sx={{ mt: 1, whiteSpace: "normal" }}
        >
          {actor.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "normal" }}
        >
          {actor.character}
        </Typography>
      </Grid>
    ))}
  </Grid>
</Grid>


{/* {buttons} */}

<Grid 
  container 
  spacing={2} 
  justifyContent="center" 
  alignItems="center" 
  sx={{ mt: 3, textAlign: 'center' }}
>
  {/* Left Button Group */}
  <Grid item xs={12} sm={6} display="flex" justifyContent="center">
    <ButtonGroup
  size="small"
  variant="outlined"
  sx={{
    mt: 2,
    "& .MuiButton-root": {
      transition: "all 0.2s ease-in-out",
      "&:hover": (theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.error.light
            : theme.palette.primary.light,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.common.white
            : theme.palette.common.black,
        transform: "translateY(-2px)",
        boxShadow: 2,
      }),
    },
  }}
>

      <Button 
        target="_blank" 
        rel="noopener noreferrer" 
        href={data?.homepage}  
        endIcon={<Language />}
      >
        Website
      </Button>
      <Button 
        target="_blank" 
        rel="noopener noreferrer" 
        href={`https://www.imdb.com/title/${data?.imdb_id}`}  
        endIcon={<Movie />}
      >
        IMDB
      </Button>
      <Button 
        onClick={() => console.log("Trailer clicked")} 
        endIcon={<Theaters />}
      >
        Trailer
      </Button>
    </ButtonGroup>
  </Grid>

  {/* Right Button Group */}
  <Grid item xs={12} sm={6} display="flex" justifyContent="center">
    <ButtonGroup
  size="small"
  variant="outlined"
  sx={{
    mt: 2,
    "& .MuiButton-root": {
      transition: "all 0.2s ease-in-out",
      "&:hover": (theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.error.light
            : theme.palette.primary.light,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.common.white
            : theme.palette.common.black,
        transform: "translateY(-2px)",
        boxShadow: 2,
      }),
    },
  }}
>

      <Button 
        onClick={addToFavorites} 
        endIcon={!isFavorite ? <FavoriteBorderOutlined /> : <Favorite />}
      >
        {isFavorite ? 'UnFavorite' : 'Favorites'}
      </Button>
      <Button 
        onClick={addToWatchList} 
        endIcon={isWatchList ? <RemoveCircle /> : <PlusOneRounded />}
      >
        WatchList
      </Button>
      <Button 
        endIcon={<ArrowBack />} 
        component={Link} 
        to="/" 
      >
        Back
      </Button>
    </ButtonGroup>
  </Grid>
</Grid>



</Grid>

<Box 
  marginTop="3rem" 
  width="100%" 
  sx={{ 
    overflowX: 'hidden', // ✅ Prevent horizontal scroll
    px: 2 // ✅ Add safe horizontal padding
  }}
>
  <Typography 
    variant="h3" 
    align="center" 
    sx={{ 
      wordBreak: 'break-word', // ✅ Prevent text overflow
      whiteSpace: 'normal' 
    }}
  >
    You may also like
  </Typography>

  {/* {recommended movies } */}
  {recommendations ? (
    <MovieList movies={recommendations.results} numberOfMovies={12} />
  ) : (
    <Typography variant="body1" align="center">
      No recommendations available
    </Typography>
  )}
</Box>

      
    </Grid>
  )
}

function InfoRow({ label, value }) {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row", sm: "column" }} // stack on mobile, row on md+
      justifyContent={{ xs: "flex-start", md: "space-between" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      sx={{ mb: 1 }}
    >
      <Typography
        variant="h6"
        sx={{ flexShrink: 0, mb: { xs: 0.5, md: 0 } }}
      >
        {label}:
      </Typography>

      <Box
        sx={{
          textAlign: { xs: "left", md: "right" },
          flexGrow: 1,
          ml: { md: 2 },
          wordBreak: "break-word",
          whiteSpace: "normal", // ensures wrapping instead of overflow
        }}
      >
        {typeof value === "string" ? (
          <Typography variant="body1">{value}</Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  );
}

export default MovieInfo;
