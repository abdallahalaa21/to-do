const { gql } = require('@apollo/client');

export default gql`
  query todos {
    todos {
      id
      title
    }
  }
`;
