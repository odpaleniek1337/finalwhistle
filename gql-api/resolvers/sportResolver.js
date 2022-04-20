import Sport from '../models/sportModel.js';

export default {
    Query: {
        sports: async (parent, args) => {
            return await Sport.find();
        }
    },
    League: {
        sport: async (parent, args) => {
            return await Sport.findById(parent.SportID);
        }
    }   
}