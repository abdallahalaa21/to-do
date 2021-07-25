import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import todosInputs from 'helpers/todoInputsConstant';

import todosGql from './gql/todos.gql';
import updateTodoDataGql from './gql/updateTodoData.gql';

const useUpdateTodo = filter => {
  const [updateTodoMutation, { loading }] = useMutation(
    updateTodoDataGql
  );

  const updateTodo = useCallback(
    ({ title, description, dueDate, id }) =>
      updateTodoMutation({
        variables: {
          title,
          description,
          dueDate,
          id
        },
        refetchQueries: [
          {
            query: todosGql,
            variables: todosInputs[filter]
          }
        ],
        awaitRefetchQueries: true
      }),
    [updateTodoMutation, filter]
  );

  return { updateTodo, loading };
};

export default useUpdateTodo;
