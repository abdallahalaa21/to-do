import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import updateTodoStatusGql from './gql/updateTodoStatus.gql';
import todosGql from './gql/todos.gql';

const useUpdateTodoStatus = () => {
  const [updateTodoStatusMutation, { loading }] =
    useMutation(updateTodoStatusGql);

  const updateComplete = useCallback(
    ({ completed, id }) => {
      updateTodoStatusMutation({
        variables: {
          completed,
          id
        },
        refetchQueries: [{ query: todosGql }],
        awaitRefetchQueries: true
      });
    },
    [updateTodoStatusMutation]
  );

  return { updateComplete, loading };
};

export default useUpdateTodoStatus;
