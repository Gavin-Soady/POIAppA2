"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const uuid = require('uuid');

const POISchema = new Schema({
  //id: Number,
  name: String,
  county: String,
  long: Number,
  lat: Number,
  cat: String,
  adder: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("POI",POISchema);
