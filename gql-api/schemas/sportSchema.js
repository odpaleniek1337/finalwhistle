import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        sports: [Sport]
    }

    extend type Mutation {
        addSport(Name: String!): Sport
    }
    
    type Sport {
        id: ID
        Name: String
    }
`;
