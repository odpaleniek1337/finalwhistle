'use strict';
import { AuthenticationError } from "apollo-server-express";
import subscription from "../models/subscriptionModel.js";
import team from "../models/teamModel.js";

export default {
    Query: {
        getSubscription: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
           return await subscription.findById(args.id);
        }
    },
    User: {
        Subscription: async (parent, args) => {
            return await subscription.findById(parent.SubscriptionID);
        }
    },
    Mutation: {
        updateSubscription: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not authenticated!');
            }
            //throw new AuthenticationError('You are not authorized to perform such thing!');
            const subscriptionDB = await subscription.findById(args.id);
            const Teams = []
            for (const teamIter of args.Teams) {
                const oneTeam = await team.findById(teamIter.id);
                Teams.push(oneTeam)
            }
            subscriptionDB.Teams = Teams;
            return await subscription.findOneAndUpdate({ _id: args.id }, subscriptionDB, { new: true })
        }
    }
};