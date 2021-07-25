import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import todosInputs from 'helpers/todoInputsConstant';
import createTodoGql from './gql/createTodo.gql';
import todosGql from './gql/todos.gql';

const useCreateTodo = filter => {
  const [createTodoMutation, { loading }] =
    useMutation(createTodoGql);

  const createTodo = useCallback(
    ({ title, description, endDate }) =>
      createTodoMutation({
        variables: {
          title,
          description,
          dueDate: endDate
        },
        refetchQueries: [
          {
            query: todosGql,
            variables: todosInputs[filter]
          }
        ],
        awaitRefetchQueries: true
      }),
    [createTodoMutation, filter]
  );

  return { createTodo, loading };
};

export default useCreateTodo;
