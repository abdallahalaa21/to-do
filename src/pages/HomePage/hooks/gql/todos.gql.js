import { gql } from '@apollo/client';

export default gql`
  query todos($where: TodoWhereInput, $after: String) {
    todosConnection(
      where: $where
      after: $after
      first: 3
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          completed
          dueDate
        }
        cursor
      }
    }
  }
`;
