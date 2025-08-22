import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovie } from '../../features/currentGenreAndCategory';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const keyHandle = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <Box
      sx={{
        display: { sm: 'flex' },
        alignItems: { sm: 'center' },
        justifyContent: { sm: 'center' },
        width: { sm: '100%' },
      }}
    >
      <TextField
  variant="standard"
  placeholder="Search..."
  fullWidth={false} // remove full width
  onKeyDown={keyHandle}
  onChange={(e) => setQuery(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
  sx={{
    maxWidth: '400px', // will shrink on small screens
    width: '100%',     // flexible until maxWidth
    color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'inherit'),
    filter: (theme) => (theme.palette.mode === 'light' ? 'invert(1)' : 'none'),
    mt: { sm: '-10px' },
    mb: { sm: '10px' },
  }}
/>

    </Box>
  );
}

export default Search;
