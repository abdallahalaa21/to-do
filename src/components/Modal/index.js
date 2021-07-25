import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Modal as MaterialModal
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%,-50%)'
  }
}));

const Modal = ({ children, open, handleClose }) => {
  const classes = useStyles();
  return (
    <MaterialModal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>{children}</div>
    </MaterialModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;
