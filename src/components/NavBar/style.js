
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  
title:{
  color: theme.palette.primary,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  width: '230px',
  textAlign: 'center',
  marginTop: '10px',
  marginBottom: '0',
  [theme.breakpoints.up('xs')]: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}


  
}));

export default useStyles;
