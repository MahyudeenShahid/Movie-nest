import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/Auth';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

function Profile() {
  const { user } = useSelector(userSelector);
  const favouriteMovies = [];
  const logOut = () => {
    // Logic for logging out the user
    localStorage.clear();
    window.location.href = '/'; // Redirect to home page after logout
  };
  // console.dir(user);
  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
        <Typography variant='h4' gutterBottom>My Profile</Typography>
        <Button  color='inherit' sx={{ ml: 2 }} onClick={logOut}>
          Logout &nbsp; <ExitToApp />
        </Button>
        </Box>
        {!favouriteMovies.length  ? (
          <Typography variant='h5'>No favourite movies added yet.
          <br />
          Add favorite and watchlist  some movies to see them here.
          </Typography>
        ) : (
            <Box>
              <Typography variant='h5'>Favourite Movies:</Typography>
            </Box>
          )}
      
    </Box>
  )
}

export default Profile