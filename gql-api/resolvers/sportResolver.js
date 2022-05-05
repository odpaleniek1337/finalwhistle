'use strict';
import sport from '../models/sportModel.js';
import { AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        sports: async (parent, args, {user}) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return await sport.find();
        }
    },
    League: {
        Sport: async (parent, args) => {
            return await sport.findById(parent.SportID);
        }
    },
    Mutation: {
        addSport: async (parent, args, {user}) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            const newSport = new sport({ ...args, });
            return newSport.save();
        }
    }
};