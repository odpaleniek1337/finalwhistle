import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        teams(LeagueID: ID!): [Team]
        team(id: ID!): Team
    }

    type Team {
        id: ID
        Name: String
        Link: String
        Matches: Int
        Draws: Int
        Losses: Int
        Goals: String
        Points: Int
        NextMatch: String
        NextMatchHour: String
        Form: String
        League: League
    }
`;