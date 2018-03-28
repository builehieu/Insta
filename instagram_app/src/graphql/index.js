import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const link = new HttpLink({
    uri: 'http://192.168.1.13:4000/graphiql',
});

export const client = new ApolloClient({
    link,
    cache,
}); 