import { gql } from '@apollo/client';

export default gql`
  mutation addTodo(
    $title: String!
    $description: String
    $dueDate: Date
  ) {
    createTodo(
      data: {
        title: $title
        description: $description
        dueDate: $dueDate
        completed: false
      }
    ) {
      id
    }
  }
`;
