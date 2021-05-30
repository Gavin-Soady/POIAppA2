"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const FavouritesSchema = new Schema({

  name: String,
  county: String,
  long: Number,
  lat: Number,
  cat: String,
  adder: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  poi: {
    type: Schema.Types.ObjectId,
    ref: "poi",
  },
});

module.exports = Mongoose.model("Favourites",FavouritesSchema);
