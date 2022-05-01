import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        leagues(sportID: ID!): [League]
    }

    type League {
        id: ID
        Name: String
        LatestUpdate: String
        Sport: Sport
    }
`;