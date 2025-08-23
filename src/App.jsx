import React, { useRef } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Movies, MovieInfo, Actors, Profile, NavBar } from './components';
import useAlan from './components/Alan';

function App() {
  const alanBtnContainer = useRef();
  
  // Pass ref into hook so Alan button attaches to it
  useAlan(alanBtnContainer);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box sx={{ mt: { sm: '100px', xs: '131px' }, ml: { sm: '240px' } }}>
        <Routes>
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/" element={<Movies />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/category/:genreIdOrCategoryName" element={<Movies />} />
        </Routes>
      </Box>
      <div ref={alanBtnContainer} /> {/* Alan AI button mounts here */}
    </>
  );
}

export default App;
