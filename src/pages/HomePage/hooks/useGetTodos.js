import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import todosInputs from 'helpers/todoInputsConstant';
import todosGql from './gql/todos.gql';

const useGetTodos = filter => {
  const { data, loading, error, fetchMore } = useQuery(
    todosGql,
    {
      variables: { ...todosInputs[filter], after: null }
    }
  );

  const todoData = useMemo(() => {
    const toDos = data?.todosConnection?.edges?.map(
      ({ node }) => node
    );

    return {
      toDos: toDos || [],
      hasNextPage:
        data?.todosConnection?.pageInfo?.hasNextPage,
      endCursor: data?.todosConnection?.pageInfo?.endCursor
    };
  }, [data]);

  return { ...todoData, loading, error, fetchMore };
};

export default useGetTodos;
