import { useTheme } from '@mui/material/styles'; // ✅ useTheme from MUI not emotion
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'; // ✅ MUI Box for sx
import blueLogo from '../../assets/blue.png';
import redLogo from '../../assets/red.png';

function SideBar() {
  const theme = useTheme();
  const categories =[
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
    
  ]

  const demoCategories = [
    {label:'Comedy',
      value:'comedy',
    },
    {
      label: 'Drama',
      value: 'drama',
    },
    {
      label: 'Action',
      value: 'action',
    },
    {
      label: 'Horror',
      value: 'horror',
    },
    {
      label: 'Thriller',
      value: 'thriller',
    },

  ]

  return (
    <>
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 0',
        textDecoration: 'none',
        transform: { xs: 'translateY(0%)', sm: 'translateY(-20%)' } ,
        position:'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <Box
        component="img"
        src={theme.palette.mode === 'dark' ? redLogo : blueLogo}
        alt="Logo"
        sx={{
          width: '70%',
        }}
      />
    </Box>
    <Divider />
      <List>
        <ListSubheader sx={{textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>Genres</ListSubheader>

        {demoCategories.map(({ label, value }) => (
          <Box
            key={value}
            component={Link}
            to={`/category/${value}`}
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
            }}
          >
            <ListItem button onClick={() => console.log(`Navigating to ${label}`)}>
              {/* <ListItemIcon>
                <Box
                  component="img"
                  src={redLogo}
                  alt=""
                  height={30}
                  sx={{
                    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                  }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Box>
        ))}
      </List>
    <Divider />
      <List>
        <ListSubheader sx={{textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>Categories</ListSubheader>

        {categories.map(({ label, value }) => (
          <Box
            key={value}
            component={Link}
            to={`/category/${value}`}
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
            }}
          >
            <ListItem button onClick={() => console.log(`Navigating to ${label}`)}>
              {/* <ListItemIcon>
                <Box
                  component="img"
                  src={redLogo}
                  alt=""
                  height={30}
                  sx={{
                    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                  }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Box>
        ))}
      </List>
    </>
  );
}

export default SideBar;
