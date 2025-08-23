import { useTheme } from '@mui/material/styles'; // ✅ useTheme from MUI not emotion
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'; // ✅ MUI Box for sx
import {red,blue} from '../../assets';
import { useGetGenresQuery } from '../../Services/TMBD';
import genreIcons from '../../assets/icons'
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreAndCategory } from '../../features/currentGenreAndCategory';
function SideBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreAndCategory);

  
  const categories =[
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
    
  ]
  const { data, isFetching } = useGetGenresQuery();
  

  

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
        src={theme.palette.mode === 'dark' ? red : blue}
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
        }}>Categories</ListSubheader>

        {categories.map(({ label, value }) => (
          <Box
            key={value}
            component={Link}
            to={`/category/${value}`}
            // to={`/`}
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
            }}
          >
            <ListItemButton onClick={() => dispatch(selectGenreAndCategory(value))}>
              <ListItemIcon>
                <Box
                  component="img"
                  src={genreIcons[label.toLowerCase()] || genreIcons.default}
                  alt=""
                  height={30}
                  sx={{
                    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Box>
        ))}
      </List>
    <Divider />
  
      <List>
        <ListSubheader sx={{textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>Genres</ListSubheader>


{console.log('data in sidebar')}
{console.dir(data.genres)}
        {isFetching?(<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress  />
            </Box>)
        :
        (data.genres.map(({ name, id }) => (
          <Box
            key={id}
            component={Link}
            to={`/category/${id}`}
            // to={`/`}
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
            }}
          >
            <ListItemButton onClick={() => dispatch(selectGenreAndCategory(id))}>
              <ListItemIcon>
                <Box
                  component="img"
                  src={genreIcons[name.toLowerCase()] || genreIcons.default}
                  alt=""
                  height={30}
                  sx={{
                    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </Box>
        )))}
      </List>
    
    </>
  );
}

export default SideBar;
