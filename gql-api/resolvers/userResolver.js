'use strict';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Subscription from '../models/subscriptionModel.js'
import jwt from 'jsonwebtoken';
import { login } from '../utils/auth.js';
import { ApolloError, AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        user: async (parent, args, {user}) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            return User.findById(args.id);
        },
    },
    Mutation: {
        login: async (parent, args, {req, res}) => {
            try {
                req.body = args;
                const user = await login(req);
                console.log('user', user);
                return user;  
            } catch (e) {
                console.log(e);
                throw new AuthenticationError('Invalid credentials provided!');
            }
        },
        registerUser: async (parent, args) => {
            try {
                const hash = await bcrypt.hash(args.Password, 12);
                const newSubscription = new Subscription({ Teams: []})
                const resultSubscription = await newSubscription.save();
                const userWithHash = {
                    ...args,
                    Password: hash,
                    SubscriptionID: resultSubscription.id
                };
                const newUser = new User(userWithHash);
                const newUserObj = newUser.toObject();
                const token = jwt.sign(newUserObj, process.env.JWT_SECRET);
                newUser.Token = token;
                return await newUser.save();
            } catch (err) {
                console.log(err);
                if (err.name === 'MongoServerError' && err.code === 11000) {
                    throw new ApolloError('User with that name already exists!')
                }
                throw new Error(err);
            }
        },
    }
}