import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        updateSubscription(id: ID!, token: String!, Teams: [TeamInput]!): Subscription
    }

    type Subscription {
        id: ID
        Teams: [TeamIDOnly]
    }

    input TeamInput {
        id: ID
    }
`;
