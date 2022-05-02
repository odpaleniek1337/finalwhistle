import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        updateSubscription(id: ID!, Teams: [TeamInput]!): Subscription
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
