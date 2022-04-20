import sport from '../models/sportModel.js';

export default {
    Query: {
        sports: async (parent, args) => {
            return await sport.find();
        }
    },
    League: {
        Sport: async (parent, args) => {
            return await sport.findById(parent.SportID);
        }
    }   
}