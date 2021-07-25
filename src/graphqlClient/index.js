import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});

export default client;
