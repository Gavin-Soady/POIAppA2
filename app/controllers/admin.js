"use strict";
const User = require("../models/user");
const POI = require("../models/poi");
const Category = require('../models/category');
const CurrentWeather = require('../utils/getCurrentWeather');
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

const Admin = {
  index: {
    auth: false,
    handler: async function (request, h) {
      let pois = await POI.find().populate("adder").lean();
      pois = await CurrentWeather.addPoiWeather(pois);
      let users = await User.find().lean();
      console.log(users);
      return h.view("adminDashboard", {
        title: "Admin",
        pois: pois,
        users: users
      });
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      try {
        const user = User.findById(request.params._id);
        console.log("deleting user account: " + user);
        await user.deleteOne();
        return h.redirect("/adminDashboard");
      } catch
        (err) {
        return h.view('/', {errors: [{message: err.message}]});
      }
    },
  },
  showUpdateUser: {
    handler: async function (request, h) {
    try {
        const id = request.params._id;
        const user = await User.findById(id).lean();
        return h.view("userSettings", { title: "POI Settings", user: user });
  } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
          }
      },
},
  updateUser: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("adminDashboard", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const userEdit = request.payload;
        const id = request.params._id;
        const user = await User.findById(id);
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        user.password = userEdit.password;
        await user.save();
        return h.redirect("/adminDashboard");
      } catch (err) {
        return h.view("adminDashboard", { errors: [{ message: err.message }] });
      }
    },
  },
  adminShowUpdatePOI: {
    handler: async function(request, h) {
      try {
        const id = request.params._id;
        const poi = await POI.findById(id).lean();
        const categories = await Category.find().lean().sort('name');
        return h.view("admin-update-poi", { title: "Edit Poi", poi: poi, categories: categories});
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  adminUpdatePOI: {

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
        return h.redirect('/adminDashboard');
      } catch (err)
      {
        return h.view('home', {errors: [{message: err.message}]});
      }
    },
  },

  adminDeletePOI: {
    handler: async function (request, h) {
    try {
    const poi = POI.findById(request.params._id);
    console.log("Removing pointofinterest: " + poi);
    await poi.deleteOne();
    return h.redirect("/adminDashboard");
  } catch
(err) {
  return h.view('home', {errors: [{message: err.message}]});
}
},
},
};

module.exports = Admin;
