import React, { useCallback, useState } from 'react';
import {
  Button,
  Container,
  List,
  makeStyles
} from '@material-ui/core';
import Todo from 'components/Todo';
import Spinner from 'components/Spinner';
import AddNewTodoModal from 'components/AddNewTodo';
import useGetTodos from './hooks/useGetTodos';
import useCreateTodo from './hooks/useCreateTodo';
import useUpdateTodoStatus from './hooks/useUpdateTodoStatus';

const useStyles = makeStyles({
  btn: {
    marginTop: '20px'
  }
});

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { toDos, loading, error } = useGetTodos();
  const { createTodo } = useCreateTodo();
  const { updateComplete } = useUpdateTodoStatus();
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (error) return 'something went wrong';
  return (
    <Container maxWidth="sm">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
            className={classes.btn}
          >
            Add new
          </Button>
          <List>
            {toDos.map(todo => (
              <Todo
                todo={todo}
                key={todo.id}
                updateComplete={updateComplete}
              />
            ))}
          </List>
        </>
      )}
      <AddNewTodoModal
        open={open}
        handleClose={handleClose}
        createTodo={createTodo}
      />
    </Container>
  );
};

export default HomePage;
