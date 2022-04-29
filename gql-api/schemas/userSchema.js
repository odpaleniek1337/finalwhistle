import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
  }
  
  extend type Mutation {
    login(
      Username: String!, 
      Password: String!
      ): User
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