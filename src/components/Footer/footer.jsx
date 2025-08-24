import React, { useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Chip,
  useTheme,
  Stack,
  Fade,
  Zoom,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Movie,
  Star,
  Favorite,
  LocalMovies,
  TheatersRounded,
  VideoLibrary,
  Brightness4,
  Brightness7,
  Instagram,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { red, blue } from '../../assets';
import { ColorModeContext } from '../utils/ToggleTheme';
import { selectGenreAndCategory } from '../../features/currentGenreAndCategory';

function Footer() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();

const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/MahyudeenShahid', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://linkedin.com/in/mahyudeen', label: 'LinkedIn' },
    { icon: <Instagram />, url: 'https://instagram.com/mahyudeen_jutt', label: 'Instagram' },
    { icon: <Email />, url: 'mailto:mahyudeenjutt@gmail.com', label: 'Email' },
];

  const quickLinks = [
    { label: 'Popular Movies', path: '/category/popular', value: 'popular', icon: <Star /> },
    { label: 'Top Rated', path: '/category/top_rated', value: 'top_rated', icon: <TheatersRounded /> },
    { label: 'Upcoming', path: '/category/upcoming', value: 'upcoming', icon: <VideoLibrary /> },
  ];

  const movieStats = [
    { label: 'Movies', count: '100K+', icon: <Movie /> },
    { label: 'Reviews', count: '50K+', icon: <Star /> },
    { label: 'Users', count: '10K+', icon: <Favorite /> },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' 
          ? 'rgba(18, 18, 18, 0.95)' 
          : 'rgba(245, 245, 245, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 6,
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.light}, ${theme.palette.error.dark})`
            : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
          animation: 'gradientShift 3s ease-in-out infinite',
        },
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid  size={{xs:12, md:4}}>
            <Fade in timeout={1000}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  component={Link}
                  to="/"
                >
                  <Box
                    component="img"
                    src={theme.palette.mode === 'dark' ? red : blue}
                    alt="Movie Nest"
                    sx={{
                      height: 80,
                      width: 'auto',
                      mr: 2,
                      filter: `drop-shadow(0 2px 8px ${
      theme.palette.mode === 'dark'
        ? theme.palette.error.light
        : theme.palette.primary.main
    })`,
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #ff6b6b, #ff8e8e)'
                        : 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textDecoration: 'underline',
                      textDecorationColor:theme.palette.mode === 'dark'?
                    theme.palette.error.light:
                    theme.palette.primary.main,
                    }}
                  >
                    Movie Nest
                  </Typography>
                </Box>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  Your ultimate companion for discovering amazing movies, exploring reviews, 
                  and building your personal watchlist. Dive into the world of cinema with us!
                </Typography>

                {/* Movie Stats */}
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {movieStats.map((stat, index) => (
                    <Zoom in timeout={1000 + index * 200} key={stat.label}>
                      <Chip
                        icon={stat.icon}
                        label={`${stat.count} ${stat.label}`}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 107, 107, 0.1)'
                            : 'rgba(25, 118, 210, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? theme.palette.error.light
                            : theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 107, 107, 0.2)'
                              : 'rgba(25, 118, 210, 0.2)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </Zoom>
                  ))}
                </Stack>
              </Box>
            </Fade>
          </Grid>

          {/* Quick Links */}
          <Grid  size={{xs:12, md:4}}>
            <Fade in timeout={1200}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: theme.palette.text.primary,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      background: theme.palette.mode === 'dark'
                        ? theme.palette.error.main
                        : theme.palette.primary.main,
                      borderRadius: '2px',
                    },
                  }}
                >
                  Quick Links
                </Typography>
                
                <Stack spacing={1}>
                  {quickLinks.map((link, index) => (
                    <Zoom in timeout={1200 + index * 100} key={link.label}>
                      <Box
                        component={Link}
                        to={link.path}
                        onClick={() => dispatch(selectGenreAndCategory(link.value))}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.text.secondary,
                          textDecoration: 'none',
                          py: 1,
                          px: 2,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: theme.palette.mode === 'dark'
                              ? theme.palette.error.light
                              : theme.palette.primary.main,
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 107, 107, 0.1)'
                              : 'rgba(25, 118, 210, 0.1)',
                            transform: 'translateX(8px)',
                          },
                        }}
                      >
                        <Box sx={{ mr: 1, display: 'flex' }}>{link.icon}</Box>
                        <Typography variant="body2">{link.label}</Typography>
                      </Box>
                    </Zoom>
                  ))}
                </Stack>
              </Box>
            </Fade>
          </Grid>

          {/* Social & Theme */}
          <Grid size= {{xs:12, md:4}}>
            <Fade in timeout={1400}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: theme.palette.text.primary,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      background: theme.palette.mode === 'dark'
                        ? theme.palette.error.main
                        : theme.palette.primary.main,
                      borderRadius: '2px',
                    },
                  }}
                >
                  Connect With Us
                </Typography>

                {/* Social Links */}
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  {socialLinks.map((social, index) => (
                    <Zoom in timeout={1400 + index * 100} key={social.label}>
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        sx={{
                          color: theme.palette.text.secondary,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: theme.palette.mode === 'dark'
                              ? theme.palette.error.light
                              : theme.palette.primary.main,
                            borderColor: theme.palette.mode === 'dark'
                              ? theme.palette.error.main
                              : theme.palette.primary.main,
                            transform: 'translateY(-3px) scale(1.1)',
                            boxShadow: theme.palette.mode === 'dark'
                              ? `0 6px 20px rgba(255, 107, 107, 0.3)`
                              : `0 6px 20px rgba(25, 118, 210, 0.3)`,
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </Zoom>
                  ))}
                </Stack>

                {/* Theme Toggle */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="body2" sx={{ mr: 2, flex: 1 }}>
                    Theme Mode
                  </Typography>
                  <IconButton
                    onClick={colorMode.toggleColorMode}
                    sx={{
                      color: theme.palette.mode === 'dark'
                        ? theme.palette.error.light
                        : theme.palette.primary.main,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'rotate(180deg) scale(1.2)',
                      },
                    }}
                  >
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* Divider */}
        <Fade in timeout={1600}>
          <Divider sx={{ my: 4, opacity: 0.6 }} />
        </Fade>

        {/* Footer Bottom */}
        <Fade in timeout={1800}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: { xs: 'center', sm: 'left' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'flex-start' },
                flexWrap: 'wrap',
                gap: 0.5,
              }}
            >
              Made with{' '}
              <Favorite
                sx={{
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
                  fontSize: '1.1rem',
                  animation: 'heartbeat 1.5s ease-in-out infinite',
                  '@keyframes heartbeat': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                  },
                }}
              />{' '}
              by{' '}
              <Typography
                component="a"
                href="https://mahyudeen.me"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.error.light
                    : theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    textDecoration: 'underline',
                    transform: 'scale(1.05)',
                    textShadow: theme.palette.mode === 'dark'
                      ? '0 0 8px rgba(255, 107, 107, 0.6)'
                      : '0 0 8px rgba(25, 118, 210, 0.6)',
                  },
                }}
              >
                Mahyudeen Shahid
              </Typography>{' '}
              for movie lovers
            </Typography>

            <Stack direction="row" spacing={2}>
              <Typography
                variant="body2"
                component={Link}
                to="/"
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.error.light
                      : theme.palette.primary.main,
                  },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                component={Link}
                to="/"
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.error.light
                      : theme.palette.primary.main,
                  },
                }}
              >
                Terms of Service
              </Typography>
            </Stack>
          </Box>
        </Fade>
      </Container>

      {/* Floating Animation Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          opacity: 0.1,
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
            '100%': { transform: 'translateY(0px)' },
          },
        }}
      >
        <Movie sx={{ fontSize: '4rem' }} />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          opacity: 0.1,
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      >
        <Star sx={{ fontSize: '3rem' }} />
      </Box>
    </Box>
  );
}

export default Footer;