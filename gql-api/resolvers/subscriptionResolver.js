import subscription from "../models/subscriptionModel.js";

export default {
    User: {
        Subscription: async (parent, args) => {
            return await subscription.findById(parent.SubscriptionID);
        }
    }
};