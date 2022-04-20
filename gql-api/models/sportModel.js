'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportModel = new Schema({
    Name: String
});

export default mongoose.model('sport', sportModel);