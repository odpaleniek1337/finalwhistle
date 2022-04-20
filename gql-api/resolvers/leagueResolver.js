import League from '../models/leagueModel.js';

export default {
    Query: {
        leagues: async (parent, args) => {
            return await League.find();
        }
    },
    Team: {
        league: async (parent, args) => {
            return await League.findById(parent.LeagueID);
        }
    }
};