import React from 'react'
import {Movie }from '..';
import { Box, Typography } from '@mui/material';

function RatedCard( {title , data}) {
  return (
    <Box>
        <Typography variant='h4' gutterBottom>
            {title}
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'}>
            {data.map((item) => (
                <Movie key={item.id} {...item} />
            ))}
        </Box>
    </Box>
  )
}

export default RatedCard