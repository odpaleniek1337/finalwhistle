import Subscription from "../models/subscriptionModel.js";

export default {
    User: {
        subscription: async (parent, args) => {
            return await Subscription.findById(parent.SubscriptionID);
        }
    }
};