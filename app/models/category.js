'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const categorySchema = Schema({
    name: String,
//    type: String,
});

module.exports = Mongoose.model('Category', categorySchema);