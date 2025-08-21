import React from 'react'
import {Box, CssBaseline} from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { Movies, MovieInfo, Actors, Profile,NavBar } from './components'



function App() {

  return (
    <>
    
    <CssBaseline />
    <NavBar />
    <Box sx={{ mt: { sm: '100px' , xs : '120px' }, ml: { sm: '240px' } }}>
    <Routes>

      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/" element={<Movies />} />
      <Route path="/actors" element={<Actors /> } />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/category/:genreIdOrCategoryName" element={<Movies />} />
    </Routes>
    {/* <h1>Hello World</h1> */}
    </Box>
    </>
  )
}

export default App
