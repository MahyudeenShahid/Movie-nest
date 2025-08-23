import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {  StyledEngineProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import {store} from './app/store'
import ToggleTheme from './components/utils/ToggleTheme.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <StyledEngineProvider injectFirst>
        <ToggleTheme>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </ToggleTheme>
    </StyledEngineProvider>
    </Provider>
  </StrictMode>,
)

