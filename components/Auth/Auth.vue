<template>
    <div>
        <!-- {{ logged_user ? logged_user.name : 'no user' }}

        <p @click="logoutUser">Logout</p> -->

        <ApolloQuery
            :query="authQuery"
        >
            <template slot-scope="{ result: { data: { logged_user } } }">
                <p>{{ logged_user.name }}</p>
            </template>
        </ApolloQuery>  
    </div>
</template>

<script>
import gql from 'graphql-tag';

// import userQuery from '~/plugins/authQuery';

import authQuery from './authQuery';
import { auth } from 'firebase';

const logoutMutation = gql`
  mutation {
    logout @client
  }
`;

const loginMutation = gql`
  mutation($id: ID!, $name: String) {
    login(id: $id, name: $name) @client
  }
`;


export default {
    name: 'Auth',

    data() {
        return {
            authQuery: authQuery
        }
    },

    // apollo: {
    //     logged_user: {
    //         query: authQuery,
    //         prefetch: false,
    //         pollInterval: 100,
    //         result(res) {
    //             if (res.data && res.data.logged_user) {
    //                 console.log('stop polling');
    //                 this.$apollo.queries.logged_user.stop()
    //             }
    //         }
    //     }
    // },

    methods: {
        async logoutUser() {
            this.$apollo.mutate({
                mutation: logoutMutation
            });

            // this.logged_user = res.data.logged_user; // null
        },

        async loginUser(user) {
            this.$apollo.mutate({
                mutation: loginMutation,
                variables: { ...user }
            });

            // this.logged_user = res.data.logged_user;
        },
    }
};
</script>
