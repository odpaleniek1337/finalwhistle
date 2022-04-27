'use strict';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Subscription from '../models/subscriptionModel.js'
import jwt from 'jsonwebtoken';
import { login } from '../utils/auth.js';
import { AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        user: async (parent, args, {user}) => {
            if (!user) {
                throw new AuthenticationError();
            }
            return User.findById(args.id);
        },
        login: async (parent, args, {req}) => {
            console.log(args, {req});
            req.body = args;
            return await login(req);            
        },
    },
    Mutation: {
        registerUser: async (parent, args) => {
            try {
                const hash = await bcrypt.hash(args.Password, 12);
                console.log(args);
                const newSubscription = new Subscription({ Teams: []})
                const resultSubscription = await newSubscription.save();
                const userWithHash = {
                    ...args,
                    Password: hash,
                    SubscriptionID: resultSubscription.id
                };
                const newUser = new User(userWithHash);
                const newUserObj = newUser.toObject();
                const token = jwt.sign(newUserObj, process.env.JWT_SECRET, { expiresIn: "12h" });
                newUser.Token = token;
                return await newUser.save();
            } catch (err) {
                throw new Error(err);
            }
        },
    }
}