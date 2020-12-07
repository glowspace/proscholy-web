import gql from 'graphql-tag';

export default gql`
  {
    logged_user @client {
      id
      name
    }
  }
`;
