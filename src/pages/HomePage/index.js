import React from 'react';
import { Container, List } from '@material-ui/core';
import Todo from 'components/Todo';
import Spinner from 'components/Spinner';
import useGetTodos from './hooks/useGetTodos';

const HomePage = () => {
  const { toDos, loading, error } = useGetTodos();

  if (error) return 'something went wrong';

  return (
    <Container maxWidth="sm">
      {loading ? (
        <Spinner />
      ) : (
        <List>
          {toDos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default HomePage;
