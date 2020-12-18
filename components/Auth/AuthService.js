import gql from 'graphql-tag';

// const authQuery = gql`
//   {
//     logged_user @client {
//       id
//       name
//     }
//   }
// `;

const loginUser = (cache, user) => {
    const data = {
        logged_user: {
                __typename: 'LoggedUser',
                id: user.id,
                name: user.name
            }
        }

    cache.writeData({ data });
}

const logoutUser = cache => {
    cache.writeData({ logged_user: null });
}

export default {
    loginUser,
    logoutUser
}


// register / login

// logout

// get user 

