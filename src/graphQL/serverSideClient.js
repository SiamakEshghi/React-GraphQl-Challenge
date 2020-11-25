import 'cross-fetch/polyfill';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const client = (req) =>
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://graphbrainz.herokuapp.com',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

export default client;
