import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import todosInputs from 'helpers/todoInputsConstant';
import todosGql from './gql/todos.gql';

const useGetTodos = filter => {
  const { data, loading, error } = useQuery(todosGql, {
    variables: todosInputs[filter]
  });

  const toDos = useMemo(() => data?.todos || [], [data]);

  return { toDos, loading, error };
};

export default useGetTodos;
