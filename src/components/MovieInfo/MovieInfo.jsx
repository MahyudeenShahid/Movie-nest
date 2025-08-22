import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationQuery } from '../../Services/TMBD';
import { Box, CircularProgress, Grid, Rating, Stack, Typography, Chip, useTheme, Button, ButtonGroup, Modal } from '@mui/material';
import genreIcons from '../../assets/icons'
import { useDispatch, useSelector, } from 'react-redux';
import { selectGenreAndCategory } from '../../features/currentGenreAndCategory';
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, Movie, PlusOneRounded, RemoveCircle, Theaters } from '@mui/icons-material';
import { MovieList } from '..';
import axios from 'axios';
import { userSelector } from '../../features/Auth';

function MovieInfo() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchList, setisWatchList] = useState(false);

  const { data: recommendations, isLoading: isrecommendationLoading } = useGetRecommendationQuery(id);
  const [open, setOpen] = useState(false);
  const { user } = useSelector(userSelector)
  console.log(user);
const { data: favoriteMovies } = useGetListQuery({ user, listName: 'favorite', page: 1 });
const { data: watchlistMovies } = useGetListQuery({ user, listName: 'watchlist', page: 1 });
console.dir(favoriteMovies);
console.dir(watchlistMovies);
useEffect(() => {
  if (favoriteMovies?.results) {
    setIsFavorite(!! favoriteMovies?.results.find(movie => movie?.id === data?.id));
  }
}, [favoriteMovies, data]);

useEffect(() => {
  if (watchlistMovies?.results) {
    setisWatchList(!! watchlistMovies?.results.find(movie => movie?.id === data?.id));
  }
}, [watchlistMovies, data]);

  // console.dir(recommendations);
  const addToFavorites = async () => {
  try {
    const response = await axios.post(
      `https://api.tmdb.org/3/account/${user?.id}/favorite`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isFavorite,
      },
      {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          session_id: localStorage.getItem("Session_id"),
        },
      }
    );

    // TMDB response has status_code and status_message
    if (response.data.status_code === 1 || response.data.status_code === 12 || response.data.status_code === 13) {
      console.log("✅ Success:", response.data.status_message);
      setIsFavorite((prev) => !prev);
    } else {
      console.warn("⚠️ Unexpected response:", response.data);
    }
  } catch (error) {
    console.error("❌ Error adding to favorites:", error.response?.data || error);
  }
};

  const addToWatchList = async () => {
  try {
    const response = await axios.post(
      `https://api.tmdb.org/3/account/${user?.id}/watchlist`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isWatchList,
      },
      {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          session_id: localStorage.getItem("Session_id"),
        },
      }
    );

    if ([1, 12, 13].includes(response.data.status_code)) {
      console.log("✅ Watchlist success:", response.data.status_message);
      setisWatchList((prev) => !prev);
    } else {
      console.warn("⚠️ Watchlist unexpected:", response.data);
    }
  } catch (error) {
    console.error("❌ Watchlist error:", error.response?.data || error);
  }
};


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
      <Grid item xs={12} lg={7} direction="column" spacing={2} sx={{
        px: 2,
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
          <Grid container spacing={2} justifyContent="center">
            {data?.credits?.cast.slice(0, 6).map((actor) => (
              <Grid
                size={{ xs: 6, sm: 4, md: 3 }}
                key={actor.id}
                textAlign="center"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/actors/${actor.id}`)} // 👈 go to actor page
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
                    width: "150px",
                    height: "200px",
                    borderRadius: "10px",
                    boxShadow: "0.5em 1em 1em rgba(64,64,70,0.5)",
                    objectFit: "cover",
                    mx: "auto",
                    display: "block",
                  }}
                />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
                onClick={() => setOpen(true)}
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
          <>
            <MovieList movies={recommendations.results} numberOfMovies={12} />

          </>
        ) : (
          <Typography variant="body1" align="center">
            No recommendations available
          </Typography>
        )}
      </Box>

      {/* {console.dir(data?.videos.results)} */}


      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.videos.results.length > 0 ? (
          <Box
            sx={{
              width: { xs: "90%", sm: "50%" },
              height: { xs: "50vh", sm: "60vh" }, // responsive height
            }}
          >
            <iframe
              frameBorder="0"
              title="trailer"
              src={`https://www.youtube.com/embed/${data?.videos.results[0].key}?autoplay=1`}
              allow="autoplay; encrypted-media"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px", // optional, rounded corners
              }}
            />
          </Box>
        ) : (
          <Typography variant="body1" align="center">
            No videos available
          </Typography>
        )}
      </Modal>


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
