'use strict';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { login } from '../utils/auth.js';
import { AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        user: async (parent, args, {user}) => {
            console.log('userResolver', user);
            if (!user) {
                throw AuthenticationError();
            }
            return User.findById(args.id);
        },
        login: async (parent, args, {req}) => {
            req.body = args;
            return await login(req);            
        },
    },
    Mutation: {
        registerUser: async (parent, args) => {
            try {
                const hash = await bcrypt.hash(args.password, 12);
                const userWithHash = {
                    ...args,
                    password: hash,
                };
                //create new Subscription
                const newUser = new User(userWithHash);
                const result = await newUser.save();
                return result;
            } catch (err) {
                throw new Error(err);
            }
        },
    }
}