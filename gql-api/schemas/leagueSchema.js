import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        leagues: [League]
    }

    type League {
        id: ID
        Name: String
        LatestUpdate: Date
        SportID: ID
    }
`;