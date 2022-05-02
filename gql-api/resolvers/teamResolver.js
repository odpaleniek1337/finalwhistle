'use strict';
import { AuthenticationError } from "apollo-server-express";
import team from '../models/teamModel.js';

export default {
    Query: {
        teams: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return await team.find({ LeagueID: args.leagueID })
        },
        team: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return await team.findById(args.id);
        }
    }
};