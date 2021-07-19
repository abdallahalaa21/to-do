import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <AppBar position="static">
    <Toolbar variant="regular">
      <Typography variant="h6" color="inherit">
        <NavLink
          to="/"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Home
        </NavLink>
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
