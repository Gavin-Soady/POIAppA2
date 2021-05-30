"use strict";

const Fave = require("../models/favourites");
const Boom = require("@hapi/boom");
const utils = require('./utils.js');

const POIs = {

  find: {
    auth: false,
    handler: async function (request, h) {
      const faves = await Fave.find();
      return faves;
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const fave = await Fave.findOne({ _id: request.params.id });
        if (!fave) {
          return Boom.notFound("No POI with this id");
        }
        return fave;
      } catch (err) {
        return Boom.notFound("No POI with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const newFave = new Fave(request.payload);
      console.log(request.payload);
      const fave = await newFave.save();
      if (fave) {
        return h.response(fave).code(201);
      }
      return Boom.badImplementation("error creating POI");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Fave.deleteMany({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const fave = await Fave.deleteOne({ _id: request.params.id });
      if (fave) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = POIs;