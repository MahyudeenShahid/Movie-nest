import React from 'react';
import { Movie } from '..';
import { Box, Typography, Grid } from '@mui/material'; // 👈 Notice Grid2

function RatedCard({ title, data }) {
  return (
    <Box sx={{ my: 4 }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        {title}
      </Typography>

      {/* Movies Grid */}
      <Grid container spacing={2} justifyContent={{ xs: 'center', md: 'space-around' }}
       size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            display="flex"
            
          >
            {data?.results?.map((movie, index) => (
              
                
              
            <Movie key={movie.id || index} movie={movie} index={index} />
          
        ))}
      </Grid>
    </Box>
  );
}

export default RatedCard;
