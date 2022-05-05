'use strict';
import { AuthenticationError } from 'apollo-server-express';
import team from '../models/teamModel.js';

export default {
    Query: {
        teams: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return await team.find({ LeagueID: args.leagueID });
        },
        team: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return await team.findById(args.id);
        }
    },
    Subscription: {
        Teams: async (parent, args) => {
            const Teams = [];
            for (const teamIter of parent.Teams) {
                Teams.push(teamIter._id);
            }
            return await team.find({ _id: {$in: Teams}});
        }
    },
    Mutation: {
        deleteTeam: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return await team.findOneAndDelete({ _id: args.id});
        }
    }
};