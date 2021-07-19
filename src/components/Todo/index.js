import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const ToDoComponent = ({ todo }) => (
  <ListItem key={todo.id} dense>
    <ListItemIcon>
      <Checkbox
        edge="start"
        checked={todo?.completed}
        disableRipple
        inputProps={{ 'aria-labelledby': todo.id }}
      />
    </ListItemIcon>
    <ListItemText
      id={todo.id}
      primary={todo?.title}
      secondary={todo?.description}
    />
  </ListItem>
);

ToDoComponent.propTypes = {
  todo: PropTypes.object.isRequired
};

export default ToDoComponent;
