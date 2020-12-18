import { createHttpLink } from 'apollo-link-http'
import Cookies from 'js-cookie'
import gql from 'graphql-tag';
import axios from 'axios';

// when 'interface' and 'union' types are in the schema (https://graphql-code-generator.com/docs/plugins/fragment-matcher)
// IntrospectionFragmentMatcher should be used, see https://github.com/nuxt-community/apollo-module/issues/120#issuecomment-482189378
import { InMemoryCache } from 'apollo-cache-inmemory';

// todo: setup some cache storage?

const typeDefs = gql`
  type LoggedUser {
    id: ID!
    name: String!
  }

  type Mutation {
    login(id: ID, name: String): LoggedUser
    logout: Boolean
  }
`;

import authQuery from '~/components/Auth/authQuery';

const resolvers = {
  Mutation: {
    login: (_, { id, name }, { cache }) => {
      const data = {
          logged_user: {
              __typename: 'LoggedUser',
              id,
              name
          }
      }

      cache.writeData({ data });
      return data;
    },

    logout: (_, _a, { cache }) => {
      const data = {
        logged_user: {
           __typename: 'LoggedUser',
           id: 0,
           name: 'no user'
        }
      }
      cache.writeData({ data });
      console.log(data);

      return true;
    }
  }
};

export default function() {
  return {
    defaultHttpLink: false,

    link: createHttpLink({
      credentials: 'include',

      uri: process.env.APP_URL,

      fetch: (uri, options) => {
        // Laravel Sanctum authentication
        options.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')

        return fetch(uri, options)
      },
    }),

    typeDefs,
    resolvers,
    cache: new InMemoryCache(),

    onCacheInit: async cache => {
      if (process.client) {
        // This initial request sets the XSRF-TOKEN to cookies to be later used to authenticate the graphql requests 
        // via Laravel Sanctum https://laravel.com/docs/8.x/sanctum#spa-authentication

        // It is a proxy request to .env's GRAPHQL_TARGET url.
        // The documentation's proposed url is /sanctum/csrf-cookie, but it seems the proxy module can't handle empty 204 responses,
        // that's why the request is to an empty graphql endpoint (but it could be whatever else)
        if (!Cookies.get('XSRF-TOKEN')) {
          axios.defaults.withCredentials = true;
          await axios.get('/api');
          console.log(`hooray, xsrf token retrieved and stored to cookies: ${Cookies.get('XSRF-TOKEN')}`);
        } else {
          console.log(`xsrf token from cookies: ${Cookies.get('XSRF-TOKEN')}`);
        }

        // todo: should we do asynchronously an user auth here????
        const res = await axios.get('/api?query={me{id,name}}')
        const me = res.data.data.me;

        const data = {
          logged_user: {
            __typename: 'LoggedUser',
            ...me
          }
        }
        cache.writeData({ data });
        console.log(data);

      } else {
        // SSR is totally happy with graphql requests without the XSRF-TOKEN
        // todo: find out WHY this actually works
      }
    },
  }
}