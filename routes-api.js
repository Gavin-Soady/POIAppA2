const Users = require("./app/api/users");
const POIs = require("./app/api/pois");

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

];
