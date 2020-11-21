import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com',
  cache: new InMemoryCache(),
});

export default client;
