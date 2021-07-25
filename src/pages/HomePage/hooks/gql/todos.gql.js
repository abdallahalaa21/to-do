import { gql } from '@apollo/client';

export default gql`
  query todos($where: TodoWhereInput) {
    todos(where: $where) {
      id
      title
      description
      completed
      dueDate
    }
  }
`;
