import { gql } from '@apollo/client';

export default gql`
  mutation updateTodoData(
    $id: ID
    $title: String
    $dueDate: Date
    $description: String
  ) {
    updateTodo(
      where: { id: $id }
      data: {
        title: $title
        dueDate: $dueDate
        description: $description
      }
    ) {
      id
    }
  }
`;
