
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  
searchContainer:{
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  input:{
    color: theme.palette.mode==='light'&& 'black',
    filter: theme.palette.mode==='light'&& 'invert(1)',
    [theme.breakpoints.up('sm')]: {
    marginTop:'-10px',
    marginBottom: '10px',
  },
  }


}


  
}));

export default useStyles;
