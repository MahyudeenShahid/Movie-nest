import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import useTheme to access theme palette

// Placeholder image URL for when the movie image fails to load
const PLACEHOLDER_IMAGE = "https://placehold.co/1280x720/000000/FFFFFF?text=Image+Unavailable";

function FeaturedMovie({ movie }) {
  const theme = useTheme(); // Access the current theme object

  // If no movie prop is provided, render nothing
  if (!movie) {
    return null;
  }

  return (
    // Outer Box component acts as a Link to the movie's detail page
    <Box
      component={Link}
      to={`/movie/${movie.id}`} // Ensure the path is correct for your routing setup
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        // Fixed height for the featured card for consistent layout
        height: '490px',
        textDecoration: 'none', // Remove underline from the link
        width: '100%', // Ensure the entire clickable area expands
      }}
    >
      <Card
        sx={{
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Align content to the bottom
          position: 'relative', // Needed for absolute positioning of CardMedia
          borderRadius: '8px', // Rounded corners for the card
          overflow: 'hidden', // Ensures rounded corners apply to children
          // Added subtle box shadow using the primary color
          boxShadow: theme.palette.mode === 'dark'
            ? `0px 0px 8px 2px ${theme.palette.error.dark}` // Example: error color for dark mode
            : `0px 0px 8px 2px ${theme.palette.primary.main}`, // Primary color for light mode
          transition: 'all 0.3s ease-in-out', // Smooth transition for hover effect
          '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
            ? `0px 0px 12px 4px ${theme.palette.error.main}`// Slightly stronger shadow on hover
            : `0px 0px 12px 4px ${theme.palette.primary.dark}`,
            scale:1.01,
          },
          // If you had a dynamic theme (light/dark mode) and wanted to change
          // the shadow color based on the mode, you would typically use:
          // boxShadow: theme.palette.mode === 'dark'
          //   ? `0px 0px 8px 2px ${theme.palette.error.main}` // Example: error color for dark mode
          //   : `0px 0px 8px 2px ${theme.palette.primary.main}`, // Primary color for light mode
        }}
      >
        {/* CardMedia for the background image */}
        <CardMedia
          component="img" // Explicitly set component to img
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            // Dark overlay for better text readability
            backgroundColor: 'rgba(0,0,0,0.575)',
            backgroundBlendMode: 'darken', // Blend mode for the overlay
            objectFit: 'cover', // Cover the entire area without distortion
          }}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          alt={movie.title}
          // Fallback for image loading errors
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop if placeholder also fails
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />

        {/* Box to contain CardContent and apply padding */}
        <Box
          sx={{
            padding: '20px',
            position: 'relative', // Position relative to appear above CardMedia
            zIndex: 1, // Ensure content is above the image overlay
            display: 'flex',
            alignItems: 'flex-end', // Align content to the bottom within this Box
            height: '100%', // Take full height to align content to bottom
            width: '100%',
          }}
        >
          {/* CardContent for movie title and overview */}
          <CardContent
            sx={{
              color: '#fff', // White text for contrast
              width: { xs: '100%', sm: '80%', md: '50%' }, // Responsive width for content
              backgroundColor: 'rgba(0,0,0,0.4)', // Slightly darker background for content block
              padding: '16px', // Default MUI padding, can be adjusted
              borderRadius: '8px', // Rounded corners for the content box
              backdropFilter: 'blur(5px)', // Subtle blur effect for background
            }}
          >
            <Typography variant='h4' gutterBottom sx={{
                fontWeight: 'bold', // Make title stand out
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } // Responsive font size
            }}>{movie?.title}</Typography>
            <Typography variant='body1' sx={{
                display: '-webkit-box', // For multi-line ellipsis
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: { xs: 3, sm: 4, md: 5 }, // Limit lines for overview
                fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
