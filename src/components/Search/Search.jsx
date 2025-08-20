import { TextField, InputAdornment } from '@mui/material';
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
    <div
      sx={{
        display: { sm: 'flex' }, // applies from 'sm' breakpoint
        alignItems: { sm: 'center' },
        justifyContent: { sm: 'center' },
        width: { sm: '100%' },
      }}
    >
      <TextField
        variant="standard"
        placeholder="Search..."
        fullWidth
        onKeyDown={keyHandle}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'inherit'),
            filter: (theme) => (theme.palette.mode === 'light' ? 'invert(1)' : 'none'),
            mt: { sm: '-10px' },
            mb: { sm: '10px' },
          },
        }}
      />
    </div>
  );
}

export default Search;
