import React, { useCallback, useState } from 'react';
import {
  Button,
  Container,
  List,
  makeStyles,
  MenuItem,
  Select
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
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  select: { marginLeft: '10px' }
});

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const classes = useStyles();

  const { toDos, loading, error } = useGetTodos(filter);
  const { createTodo } = useCreateTodo(filter);
  const { updateComplete } = useUpdateTodoStatus(filter);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleChange = useCallback(event => {
    setFilter(event.target.value);
  }, []);

  if (error) return 'something went wrong';
  return (
    <Container maxWidth="sm">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={classes.flex}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              onChange={handleChange}
              className={classes.select}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">
                inCompleted
              </MenuItem>
              <MenuItem value="completed">
                completed
              </MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen()}
              className={classes.btn}
            >
              Add new
            </Button>
          </div>
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
        filter={filter}
      />
    </Container>
  );
};

export default HomePage;
