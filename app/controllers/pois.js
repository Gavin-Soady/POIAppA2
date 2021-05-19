"use strict";
const POI = require("../models/poi");
const User = require("../models/user");
const Joi = require("@hapi/joi");
const Category = require('../models/category');
const CurrentWeather = require('../utils/getCurrentWeather');
//const uuid = require('uuid');

const POIS = {
  home: {
    handler: async function(request, h) {
      const categories = await Category.find().lean().sort('name');
      return h.view("home", { title: "Add a place of interest", categories: categories });
    }
  },
  report: {
    handler: async function(request, h) {
      let pois = await POI.find().populate("adder").lean();
      pois = await CurrentWeather.addPoiWeather(pois);
      return h.view("report", {
        title: "Places Added",
        pois: pois
      });
    }
  },
  add: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newPoi = new POI({
          //id: uuid.v1(),
          name: data.name,
          county: data.county,
          long: data.long,
          lat: data.lat,
          cat: data.cat,
          adder: user._id
        });
        await newPoi.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }

    }
  },
  deletepoi: {
    handler: async function (request, h) {
      try {
        const poi = POI.findById(request.params._id);
        console.log("Removing pointofinterest: " + poi);
        await poi.deleteOne();
        return h.redirect("/report");
      } catch
        (err) {
        return h.view('home', {errors: [{message: err.message}]});
      }
    },
  },
  showUpdatePOI: {
    handler: async function(request, h) {
      try {
        const id = request.params._id;
        const poi = await POI.findById(id).lean();
        const categories = await Category.find().lean().sort('name');
        return h.view("update-poi", { title: "Edit Poi", poi: poi, categories: categories});
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  updatePOI: {

    handler: async function (request, h)
    {
      console.log("yes you got to UpdatePOI");
      try
      {
        const poiEdit = request.payload;
        const poi = await POI.findById(request.params._id);
        console.log(poi);
        poi.name = poiEdit.name;
        poi.county = poiEdit.county;
        poi.lat = poiEdit.lat;
        poi.long = poiEdit.long;
        poi.cat = poiEdit.cat;
        await poi.save();
        return h.redirect('/report');
      } catch (err)
      {
        return h.view('home', {errors: [{message: err.message}]});
      }
    },
  },
};

module.exports = POIS;
