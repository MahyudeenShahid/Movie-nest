import React, { useEffect, useState } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material'
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { SideBar,Search } from '..'
import { white } from '../../assets'
import { fetchToken, createSessionId,movieApi } from '../../components/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUser,userSelector } from '../../features/Auth'

function NavBar() {
  const theme = useTheme();
  const { user, isAuthenticated, sessionId } = useSelector(userSelector);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  console.log(user, isAuthenticated, sessionId);
  const drawerWidth = 240;

const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const token = localStorage.getItem('tmdb_token');
  const sessionIdFromStorage = localStorage.getItem('Session_id');
  useEffect( () => {
    const logInUser = async () => {
      if(token){
        if(sessionIdFromStorage){
          // User is authenticated
          const {data: userData} = await movieApi.get(`/account?session_id=${sessionIdFromStorage}`);
          dispatch(setUser(userData));
        } else {
        // User is not authenticated
        const sessionId = await createSessionId();
         const {data: userData} = await movieApi.get(`/account?session_id=${sessionId}`);
         dispatch(setUser(userData));
      }
    }
  }
  logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            height: '85px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: { sm: `${drawerWidth}px`, xs: '0px' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ outline: 'none', mr: 2, display: { sm: 'none', xs: 'inline-flex' } }}
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          )}

          {/* Logo only on mobile */}
          {isMobile && (
            <Box sx={{ flexGrow: 0 }}>
              <Box
                component="img"
                src={white}
                alt="Logo"
                sx={{
                  height: 90,
                  width: 'auto',
                  ml: 1,
                  cursor: 'pointer',
                }}
              />
            </Box>
          )}


          {/* Theme toggle button */}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => { }}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Search placeholder */}
          {!isMobile && <Search />}

          {/* Authentication */}
          {!isAuthenticated ? (
            <Button color="inherit" onClick={fetchToken}>
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to={`/profile/${user.id}`}
              onClick={() => { }}
            >
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt="Profile Picture"
                src="https://imgs.search.brave.com/3ZVdx4nUTfjXtUcgz8979gkd1TntpbKgan9m7mC9gHU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC85/OS85NC9tYWxlLXBy/b2ZpbGUtaWNvbi1w/bGFjZWhvbGRlci12/ZWN0b3ItMjM4ODk5/OTQuanBn"
              />
            </Button>
          )}

        </Toolbar>
        {isMobile && <Search />}
      </AppBar>

      {/* Drawer Section */}
      <Box component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { width: drawerWidth },
            }}
          >
            <SideBar setMobileOpen={setMobileOpen} />
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            open
            sx={{
              '& .MuiDrawer-paper': { width: drawerWidth },
            }}
          >
            <SideBar setMobileOpen={setMobileOpen} />
          </Drawer>
        )}
      </Box>
    </>
  );
}

export default NavBar
