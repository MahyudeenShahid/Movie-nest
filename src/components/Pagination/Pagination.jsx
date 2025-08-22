import { Button, Typography, Box, useTheme } from '@mui/material'
import React from 'react'

function Pagination({ currentPage, setPage, totalPage }) {
  const theme = useTheme();

  const prevPage = () => {
    if (currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  if (totalPage === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 4,
      }}
    >
      {/* Prev Button */}
      <Button
        variant="contained"
        onClick={prevPage}
        disabled={currentPage === 1}
        sx={{
          px: 3,
          py: 1,
          fontWeight: 'bold',
          borderRadius: 2,
          textTransform: 'none',
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.05)',
          },
          '&:disabled': {
            backgroundColor: theme.palette.action.disabled,
            color: theme.palette.text.disabled,
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        Prev
      </Button>

      {/* Current Page */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          minWidth: '40px',
          textAlign: 'center',
        }}
      >
        {currentPage}
      </Typography>

      {/* Next Button */}
      <Button
        variant="contained"
        onClick={nextPage}
        disabled={currentPage === totalPage}
        sx={{
          px: 3,
          py: 1,
          fontWeight: 'bold',
          borderRadius: 2,
          textTransform: 'none',
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.05)',
          },
          '&:disabled': {
            backgroundColor: theme.palette.action.disabled,
            color: theme.palette.text.disabled,
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        Next
      </Button>
    </Box>
  );
}

export default Pagination;
