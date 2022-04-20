'use strict';
import mongoose from 'mongoose';
import teamModel from './teamModel.js';

const Schema = mongoose.Schema;
const subscriptionModel = new Schema({
    Teams: [
        {
            type: Schema.Types.ObjectId,
            ref: teamModel,
            required: true
        }
    ]
});

export default mongoose.model('subscription', subscriptionModel);