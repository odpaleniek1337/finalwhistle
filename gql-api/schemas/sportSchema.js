import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        sports: [Sport]
    }

    type Sport {
        id: ID
        Name: String
    }
`;
