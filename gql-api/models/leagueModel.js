'use strict';
import mongoose from "mongoose";
import sportModel from './sportModel.js';

const Schema = mongoose.Schema;

const leagueModel = new Schema({
    Name: String,
    LatestUpdate: Date,
    SportID: {
        type: Schema.Types.ObjectId,
        ref: sportModel,
        required: true
    }
});

export default mongoose.model('league', leagueModel);