'use strict';
import mongoose from 'mongoose';
import leagueModel from './leagueModel.js';

const Schema = mongoose.Schema;

const teamModel = new Schema({
    Name: String,
    Link: String,
    Matches: Number,
    Wins: Number,
    Draws: Number,
    Losses: Number,
    Goals: String,
    Points: Number,
    NextMatch: String,//can merge it later to date or sth
    NextMatchHour: String,
    Form: String,//can add regexes or sth to those
    LeagueID: {
        type: Schema.Types.ObjectId,
        ref: leagueModel
    }
});

export default mongoose.model('team', teamModel);