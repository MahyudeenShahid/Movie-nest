import React from 'react'
import {CssBaseline} from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { Movies, MovieInfo, Actors, Profile,NavBar } from './components'



function App() {

  return (
    <>
    <CssBaseline />
    <NavBar />
    <Routes>

      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/" element={<Movies />} />
      <Route path="/actors" element={<Actors /> } />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
    {/* <h1>Hello World</h1> */}
    </>
  )
}

export default App
