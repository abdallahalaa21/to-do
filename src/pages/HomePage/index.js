import React from 'react';
import useGetTodos from './hooks/useGetTodos';

const HomePage = () => {
  const { toDos, loading, error } = useGetTodos();

  console.log({ toDos, loading, error });
  return <div>home</div>;
};

export default HomePage;
