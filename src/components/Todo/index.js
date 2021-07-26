import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles
} from '@material-ui/core';

import Modal from 'components/Modal';
import { ReactComponent as EditIcon } from 'images/edit.svg';
import AddNewTodoModal from 'components/AddNewTodo';

const useStyles = makeStyles({
  pointer: {
    cursor: 'pointer'
  }
});

const ToDoComponent = ({
  todo,
  updateComplete,
  updateTodo
}) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const classes = useStyles();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenEditModal = useCallback(() => {
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  return (
    <>
      <ListItem key={todo.id} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo?.completed}
            disableRipple
            inputProps={{ 'aria-labelledby': todo.id }}
            onChange={async () => {
              await updateComplete({
                id: todo.id,
                completed: !todo.completed
              });
            }}
          />
        </ListItemIcon>
        <ListItemText
          id={todo.id}
          primary={todo?.title}
          secondary={todo?.description}
          onClick={handleOpen}
          className={classes.pointer}
        />
        <Modal open={open} handleClose={handleClose}>
          <p>title: {todo.title}</p>
          <p>description: {todo.description}</p>
          <p>due date: {todo.dueDate}</p>
        </Modal>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={handleOpenEditModal}
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <AddNewTodoModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        todo={todo}
        updateTodo={updateTodo}
        edit
      />
    </>
  );
};

ToDoComponent.propTypes = {
  todo: PropTypes.object.isRequired,
  updateComplete: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default ToDoComponent;
