import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    login(Username: String!, Password: String!): User
  }
  
  extend type Mutation {
    registerUser(
      Username: String!,
      Password: String!,
    ): User
  }
  
  type User {
    id: ID
    Username: String
    Subscription: Subscription,
    Token: String
  }
`;