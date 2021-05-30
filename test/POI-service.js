"use strict";

const axios = require("axios");
//const baseUrl = "http://localhost:3000";

class POIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }

  async createPOI(newPOI) {
    try {
      const response = await axios.post(this.baseUrl + "/api/pois", newPOI);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOnePOI(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/pois/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getPOI(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async deleteAllPOIs() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/pois");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPOIs() {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  //Faves here
  async createFave(newFave) {
    try {
      const response = await axios.post(this.baseUrl + "/api/favourites", newFave);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneFave(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/favourites/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getFave(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/favourites/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async deleteAllFaves() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/favourites");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getFaves() {
    try {
      const response = await axios.get(this.baseUrl + "/api/favourites");
      return response.data;
    } catch (e) {
      return null;
    }
  }

}

module.exports = POIService;