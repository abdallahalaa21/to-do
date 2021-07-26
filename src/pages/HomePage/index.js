import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  Button,
  Container,
  List,
  makeStyles,
  MenuItem,
  Select
} from '@material-ui/core';
import Todo from 'components/Todo';
import AddNewTodoModal from 'components/AddNewTodo';
import todosInputs from 'helpers/todoInputsConstant';
import useGetTodos from './hooks/useGetTodos';
import useCreateTodo from './hooks/useCreateTodo';
import useUpdateTodoStatus from './hooks/useUpdateTodoStatus';
import useUpdateTodo from './hooks/useUpdateTodo';

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
  const contentRef = useRef(null);

  const {
    toDos,
    loading,
    error,
    hasNextPage,
    fetchMore,
    endCursor
  } = useGetTodos(filter);
  const { createTodo } = useCreateTodo(filter);
  const { updateComplete } = useUpdateTodoStatus(filter);
  const { updateTodo } = useUpdateTodo(filter);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleChange = useCallback(event => {
    setFilter(event.target.value);
  }, []);

  const isBottom = useCallback(ref => {
    if (!ref.current) {
      return false;
    }
    return (
      ref.current.getBoundingClientRect().bottom <=
      window.innerHeight
    );
  }, []);

  const loadMore = useCallback(async () => {
    await fetchMore({
      variables: {
        ...todosInputs[filter],
        after: endCursor
      }
    });
  }, [endCursor, fetchMore, filter]);

  const loadMoreData = useCallback(() => {
    if (!loading && hasNextPage && isBottom(contentRef)) {
      loadMore();
    }
  }, [hasNextPage, isBottom, loadMore, loading]);

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  useEffect(() => {
    const onScroll = () => {
      loadMoreData();
    };
    document.addEventListener('scroll', onScroll);
    return () =>
      document.removeEventListener('scroll', onScroll);
  }, [loadMoreData]);

  if (error) return 'something went wrong';
  return (
    <Container maxWidth="sm" className={classes.container}>
      <div className={classes.flex}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          onChange={handleChange}
          className={classes.select}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">inCompleted</MenuItem>
          <MenuItem value="completed">completed</MenuItem>
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
      <List ref={contentRef}>
        {toDos.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
            updateComplete={updateComplete}
            updateTodo={updateTodo}
          />
        ))}
      </List>

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
