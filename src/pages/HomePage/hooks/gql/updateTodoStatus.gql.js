import { gql } from '@apollo/client';

export default gql`
  mutation updateTodoStatus($id: ID, $completed: Boolean) {
    updateTodo(
      where: { id: $id }
      data: { completed: $completed }
    ) {
      id
    }
  }
`;
