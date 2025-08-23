import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovie } from '../../features/currentGenreAndCategory';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const keyHandle = (event) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        mt: { xs: 0, sm: 2 },
        mb: { xs: 1, sm: 2 },
      }}
    >
     <TextField
  variant="outlined"
  placeholder="Search for movies..."
  value={query}
  onKeyDown={keyHandle}
  onChange={(e) => setQuery(e.target.value)}
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>
      ),
    },
  }}
  sx={{
    width: { xs: "80%", sm: "70%", md: "400px" },
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.background.paper,
    borderRadius: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      height: { xs: 38, sm: 45 }, // ✅ Shorter height on mobile
      "& .MuiOutlinedInput-input": {
        padding: { xs: "8px 14px", sm: "12px 14px" }, // Adjust input padding
      },
    },
  }}
/>

    </Box>
  );
}

export default Search;
