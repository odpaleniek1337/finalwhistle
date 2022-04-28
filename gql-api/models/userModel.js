'use strict';
import mongoose from 'mongoose';
import subscriptionModel from './subscriptionModel.js';

const Schema = mongoose.Schema;

const userModel = new Schema({
    Username: { type: String, unique: true, required: true },
    Password: { type: String, required: true },
    SubscriptionID: {
        type: Schema.Types.ObjectId,
        ref: subscriptionModel
    }
});

export default mongoose.model('User', userModel, 'User');