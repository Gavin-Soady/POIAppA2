const Users = require("./app/api/users");
const POIs = require("./app/api/pois");
const Faves = require("./app/api/favourites");

module.exports = [

  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },

  { method: "POST", path: "/api/pois", config: POIs.create },
  { method: "DELETE", path: "/api/pois/{id}", config: POIs.deleteOne },
  { method: "GET", path: "/api/pois/{id}", config: POIs.findOne },
  { method: "DELETE", path: "/api/pois", config: POIs.deleteAll },
  { method: "GET", path: "/api/pois", config: POIs.find },

  { method: "POST", path: "/api/favourites", config: Faves.create },
  { method: "DELETE", path: "/api/favourites/{id}", config: Faves.deleteOne },
  { method: "GET", path: "/api/favourites/{id}", config: Faves.findOne },
  { method: "DELETE", path: "/api/favourites", config: Faves.deleteAll },
  { method: "GET", path: "/api/favourites", config: Faves.find },

];
