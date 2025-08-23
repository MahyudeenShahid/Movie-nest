import React, { createContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Context
export const ColorModeContext = createContext();

function ToggleTheme({ children }) {
  // Load from localStorage or system preference
  const getInitialMode = () => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) return savedMode;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Create theme with extras
  const theme = useMemo(() => 
    createTheme({
      palette: { mode },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        button: { textTransform: 'none' },
      },
      shape: { borderRadius: 12 },
    }), 
  [mode]);

  // Memoize context value
  const contextValue = useMemo(() => ({
    mode,
    setMode,
    toggleColorMode,
  }), [mode]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline ensures bg/text follows theme */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleTheme;
