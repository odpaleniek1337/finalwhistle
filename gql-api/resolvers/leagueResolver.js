import league from '../models/leagueModel.js';

export default {
    Query: {
        leagues: async (parent, args) => {
            return await league.find();
        }
    },
    Team: {
        League: async (parent, args) => {
            return await league.findById(parent.LeagueID);
        }
    }
};