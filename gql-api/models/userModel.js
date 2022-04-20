'use strict';
import mongoose from 'mongoose';
import subscriptionModel from './subscriptionModel.js';

const Schema = mongoose.Schema;

const userModel = new Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true},
    SubscriptionID: {
        type: Schema.Types.ObjectId,
        ref: subscriptionModel,
        required: true
    }
});

export default mongoose.model('user', userModel);