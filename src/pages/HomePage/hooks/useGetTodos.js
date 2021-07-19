import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import todosGql from './gql/todos.gql';

const useGetTodos = () => {
  const { data, loading, error } = useQuery(todosGql);

  const toDos = useMemo(() => data?.todos || [], [data]);

  return { toDos, loading, error };
};

export default useGetTodos;
