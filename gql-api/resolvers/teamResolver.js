//import { AuthenticationError } from "apollo-server-express";
import team from '../models/teamModel.js';

export default {
    Query: {
        teams: async (parent, args) => {
            return await team.find({ LeagueID: args.LeagueID })
        },
        team: async (parent, args) => {
            return await team.findById(args.id);
        }
    }
};