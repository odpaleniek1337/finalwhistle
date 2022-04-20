import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user: User
    login(username: String!, password: String!): User
  }
  
  extend type Mutation {
    registerUser(
      username: String!,
      password: String!
    ): User
  }
  
  type User {
    id: ID
    Username: String,
    Subscription: Subscription
    Token: String
  }
`;