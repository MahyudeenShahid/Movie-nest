import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import {store} from './app/store'

const theme = createTheme({});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
        </ThemeProvider>
    </StyledEngineProvider>
    </Provider>
  </StrictMode>,
)

