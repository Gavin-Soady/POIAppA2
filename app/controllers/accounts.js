"use strict";
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Accounts = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Ireland" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup", { title: "Sign up to Add ad View POI in Ireland"});
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required().regex(/^[A-Z][a-z]{2,}$/),
        //Will allow hyphen and apostrophe
        lastName: Joi.string().required().regex(/^[A-Z][-'a-zA-Z]{2,}$/),
        email: Joi.string().email().required(),
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        password: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("signup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        const hash = await bcrypt.hash(payload.password, saltRounds);
        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: hash,
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/report");
      } catch (err) {
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login", { title: "Login to POI"  });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("login", {
            title: "login error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        await user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/report");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  showSettings: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        return h.view("my-settings", { title: "POI Settings", user: user });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().required().regex(/^[A-Z][a-z]{2,}$/),
        //Will allow hyphen and apostrophe
        lastName: Joi.string().required().regex(/^[A-Z][-'a-zA-Z]{2,}$/),
        email: Joi.string().email().required(),
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        password: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("my-settings", {
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
        const id = request.auth.credentials.id;
        const hash = await bcrypt.hash(userEdit.password, saltRounds);
        const user = await User.findById(id);
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        user.password = hash;
        await user.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  deleteaccount: {
    handler: async function (request, h) {
    try {
    const user = User.findById(request.params._id);
    console.log("deleting user account: " + user);
    await user.deleteOne();
    return h.redirect("/");
  } catch
  (err) {
    return h.view('/', {errors: [{message: err.message}]});
        }
     },
  },
};

module.exports = Accounts;
