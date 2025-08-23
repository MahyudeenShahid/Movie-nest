import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/Auth';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../Services/TMBD';
import {RatedCard }from '..';

function Profile() {
  const { user } = useSelector(userSelector);

  const logOut = () => {
    // Logic for logging out the user
    localStorage.clear();
    window.location.href = '/'; // Redirect to home page after logout
  };
  // console.dir(user);
  const { data: favoriteMovies ,refetch : refetchFavorite} = useGetListQuery({ user, listName: 'favorite', page: 1 });
  const { data: watchlistMovies ,refetch : refetchWatchlist} = useGetListQuery({ user, listName: 'watchlist', page: 1 });

  useEffect(() => {
    refetchFavorite();
    refetchWatchlist();
    
  }, []);
  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
        <Typography variant='h4' gutterBottom>My Profile</Typography>
        <Button  color='inherit' sx={{ ml: 2 }} onClick={logOut}>
          Logout &nbsp; <ExitToApp />
        </Button>
        </Box>
        {!favoriteMovies?.results?.length  && !watchlistMovies?.results?.length ? (
          <Typography variant='h5'>No favourite movies added yet.
          <br />
          Add favorite and watchlist  some movies to see them here.
          </Typography>
        ) : (
          <Box>
            <RatedCard title={' Favorite Movies'} data={favoriteMovies}/>
            <RatedCard title={'WatchList Movies'} data={watchlistMovies}/>
            </Box>
          )}
      
    </Box>
  )
}

export default Profile