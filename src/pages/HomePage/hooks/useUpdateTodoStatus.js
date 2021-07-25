import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import todosInputs from 'helpers/todoInputsConstant';
import updateTodoStatusGql from './gql/updateTodoStatus.gql';
import todosGql from './gql/todos.gql';

const useUpdateTodoStatus = filter => {
  const [updateTodoStatusMutation, { loading }] =
    useMutation(updateTodoStatusGql);

  const updateComplete = useCallback(
    ({ completed, id }) =>
      updateTodoStatusMutation({
        variables: {
          completed,
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
    [filter, updateTodoStatusMutation]
  );

  return { updateComplete, loading };
};

export default useUpdateTodoStatus;
