import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import createTodoGql from './gql/createTodo.gql';
import todosGql from './gql/todos.gql';

const useCreateTodo = () => {
  const [createTodoMutation, { loading }] =
    useMutation(createTodoGql);

  const createTodo = useCallback(
    ({ title, description, endDate }) => {
      createTodoMutation({
        variables: {
          title,
          description,
          dueDate: endDate
        },
        refetchQueries: [{ query: todosGql }],
        awaitRefetchQueries: true
      });
    },
    [createTodoMutation]
  );

  return { createTodo, loading };
};

export default useCreateTodo;
