'use strict';
import mongoose from 'mongoose';
import teamModel from './teamModel.js';

const Schema = mongoose.Schema;
const subscriptionModel = new Schema({
    Teams: [
        {
            type: Schema.Types.ObjectId,
            ref: teamModel
        }
    ]
});

export default mongoose.model('Subscription', subscriptionModel, 'Subscription');