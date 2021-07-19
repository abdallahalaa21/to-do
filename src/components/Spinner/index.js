import {
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center'
  }
});

const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={200} />
    </div>
  );
};

export default Spinner;
