import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const modifiedRelayStylePagination = (...args) => ({
  ...relayStylePagination(...args),
  read: (...readArgs) => {
    const existing = readArgs[0];
    const original = relayStylePagination(...args).read;

    if (!existing || !original) {
      return undefined;
    }
    return original(...readArgs);
  },
  merge: (...mergeArgs) => {
    const existing = mergeArgs[0];
    const incoming = mergeArgs[1];
    const { args: newArgs } = mergeArgs[2];
    if (!newArgs?.after) {
      return incoming;
    }
    const existingClone = { ...existing };
    existingClone.pageInfo = incoming.pageInfo;
    existingClone.edges = existingClone.edges.concat(
      incoming.edges
    );
    return existingClone;
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        todosConnection: modifiedRelayStylePagination()
      }
    }
  }
});

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
