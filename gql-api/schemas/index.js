import { gql } from 'apollo-server-express';
import userSchema from './userSchema.js';
import sportSchema from './sportSchema.js';
import leagueSchema from './leagueSchema.js';
import subscriptionSchema from './subscriptionSchema.js';
import teamSchema from './teamSchema.js';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

export default [
    linkSchema,
    sportSchema,
    leagueSchema,
    subscriptionSchema,
    teamSchema,
    userSchema
];