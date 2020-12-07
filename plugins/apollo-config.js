import { createHttpLink } from 'apollo-link-http'
import Cookies from 'js-cookie'
import gql from 'graphql-tag';

// when 'interface' and 'union' types are in the schema (https://graphql-code-generator.com/docs/plugins/fragment-matcher)
// IntrospectionFragmentMatcher should be used, see https://github.com/nuxt-community/apollo-module/issues/120#issuecomment-482189378
import { InMemoryCache } from 'apollo-cache-inmemory';

// todo: setup some cache?

const typeDefs = gql`
  type LoggedUser {
    id: ID!
    name: String!
  }
`;

export default function() {
  return {
    defaultHttpLink: false,

    link: createHttpLink({
      credentials: 'include',

      uri: process.env.APP_URL,

      fetch: (uri, options) => {
        // preparing for the new Laravel Sanctum authentication
        const xsrf = Cookies.get('XSRF-TOKEN')

        if (xsrf) {
          options.headers['X-XSRF-TOKEN'] = xsrf
        }

        return fetch(uri, options)
      },
    }),

    typeDefs,
    resolvers: {},
    cache: new InMemoryCache(),

    // todo: do auth in here????

    // onCacheInit: cache => {
    //   const data = {
    //     logged_user: {
    //       __typename: 'LoggedUser',
    //       id: 1,
    //       name: 'Mira'
    //     }
    //   }
    //   cache.writeData({ data })
    // },
  }
}