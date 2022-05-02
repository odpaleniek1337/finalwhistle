'use strict';
import league from '../models/leagueModel.js';
import { AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        leagues: async (parent, args, {user}) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return await league.find({ SportID: args.sportID });
        }
    },
    Team: {
        League: async (parent, args) => {
            return await league.findById(parent.LeagueID);
        }
    }
};