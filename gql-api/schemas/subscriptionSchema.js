import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        getSubscription(id: ID!): Subscription
    }
    
    extend type Mutation {
        updateSubscription(id: ID!, Teams: [TeamInput]!): Subscription
        deleteSubscription(id: ID!): Subscription
    }

    type Subscription {
        id: ID
        Teams: [Team]
    }

    input TeamInput {
        id: ID
        Name: String
    }
`;
