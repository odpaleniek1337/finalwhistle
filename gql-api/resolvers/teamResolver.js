//import { AuthenticationError } from "apollo-server-express";
import team from '../models/teamModel.js';

export default {
    Query: {
        Teams: async (parent, args) => {
            return await team.find({ LeagueID: args.LeagueID })
        },
        Team: async (parent, args) => {
            if (args.id) {
                return await team.findById(args.id);
            }
            if (args.Name) {
                return await team.find({ Name: args.Name })
            }
        }
    }
};