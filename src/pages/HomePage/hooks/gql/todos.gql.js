import { gql } from '@apollo/client';

export default gql`
  query todos {
    todos {
      id
      title
      description
      completed
    }
  }
`;
